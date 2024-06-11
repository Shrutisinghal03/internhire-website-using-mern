import ErrorHandler from "../middlewares/error.js";
import applicant from "../models/applicationSchema.js";
import jobuser from "../models/userSchema.js";
import {upload} from "../middlewares/multerConfig.js";
import cloudinary from 'cloudinary'; 
import jobpost from "../models/jobSchema.js";

export const employgetAllapplicant=async(req,res,next)=>{ 
    const id=req.user._id; 
    const role=req.user.role; 
    if(role=="jobseeker"){
        return next(new ErrorHandler("Job seeker is not allowed to accesss this resource"))
    }
    try {

        const applications=await applicant.find({'employerID.user': id}); 
        if(!applications){
            return next(new ErrorHandler(" owww owwww No one apply for this post !!!!",200)); 
     
        }
        res.status(200).json(applications); 
    } catch (error) {
      console.log(error);
        return next (new ErrorHandler(error,404)); 
    }
  
}
export const getuserappliedapplication=async(req,res,next)=>{
    const id=req.user._id; 
    const role=req.user.role; 
    if(role=="Employee"){
        return next(new ErrorHandler("Employee is not allowed to accesss this resource"))
    }
    try {

        var appliedfor=await applicant.find({'applicantID.user': id}); 
        if(!appliedfor){
            return next(new ErrorHandler(" owww owwww you are not applied to any post !!!!",200)); 
     
        }

        (async () => {
          await Promise.all(appliedfor.map(async (e) => {
              const jobdata = await jobpost.findById(e.jobId);
              e.name = jobdata.title; // Directly modify the original object
              e.Address = jobdata.location + ", " + jobdata.city; 
              e.Contact = jobdata.fixedSalary || (jobdata.SalaryFrom + "-" + jobdata.SalaryTo); 
              e.email = jobdata.JobType; 
          }));
      
          // Debugging logs to ensure properties are being set correctly
          // console.log(appliedfor[0]); // Should log the modified object with new properties
         // Logs the Jobtype
      
          // Ensure this part is inside the async function to wait for modifications
          res.status(200).json(appliedfor);
      })();
      
     
      //  // Corrected findById usage
     //   console.log("loo job ka data leloo", appliedforjob);
      
    } catch (error) {
      console.log(error);
        return next (new ErrorHandler(error,404)); 
    }
  
}
export const jobseekerDeleteApplication=async(req,res,next)=>{
    const id=req.params.id; 
    const role=req.user.role; 

    if(role=="Employee"){
        return next(new ErrorHandler("Employee is not allowed to Delete this resource"))
    }
    try {

        const appliedfor=await applicant.findByIdAndDelete({_id: id}); 
        if(!appliedfor){
            return next(new ErrorHandler(" owww owwww Your are not  apply for this post !!!!",200)); 
     
        }
        res.status(200).json(appliedfor); 
    } catch (error) {
        return next (new ErrorHandler(error,404)); 
    }
}
// export const postApplication = async (req, res, next) => {
//     const { role } = req.user;
//     console.log(req.files); 
//     if (role == "Employer") {
//       return next(
//         new ErrorHandler("Employer not allowed to access this resource.", 400)
//       );
//     }
//     if (!req.files ||!req.files.resume) {
//       return next(new ErrorHandler("Resume File Required!", 400));
//     }
  
//     const { resume } = req.files;
//     const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
//     if (!allowedFormats.includes(resume.mimetype)) {
//       return next(
//         new ErrorHandler("Invalid file type. Please upload a PNG file.", 400)
//       );
//     }
//     const cloudinaryResponse = await cloudinary.uploader.upload(
//       resume.tempFilePath
//     );
  
//     if (!cloudinaryResponse || cloudinaryResponse.error) {
//       console.error(
//         "Cloudinary Error:",
//         cloudinaryResponse.error || "Unknown Cloudinary error"
//       );
//       return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
//     }
//     const { name, email, coverLetter, phone, address, jobId} = req.body;
//     const applicantID = {
//       user: req.user._id,
//       role: "Job Seeker",
//     };
//     if (!jobId) {
//       return next(new ErrorHandler("Job not found!", 404));
//     }
//     const jobDetails = await jobuser.findById(jobId);
//     if (!jobDetails) {
//       return next(new ErrorHandler("Job not found!", 404));
//     }
  
//     const employerID = {
//       user: jobDetails.postedBy,
//       role: "Employer",
//     };
//     if (
//       !name ||
//       !email ||
//       !coverLetter ||
//       !phone ||
//       !address ||
//       !applicantID ||
//       !employerID ||
//       !resume
//     ) {
//       return next(new ErrorHandler("Please fill all fields.", 400));
//     }
//     const application = await new applicant({
//       name,
//       email,
//       coverLetter,
//       phone,
//       address,
//       applicantID,
//       employerID,
//       resume: {
//         public_id: cloudinaryResponse.public_id,
//         url: cloudinaryResponse.secure_url,
//       },
//     });
//     res.status(200).json({
//       success: true,
//       message: "Application Submitted!",
//       application,
//     });
//   };


export const postApplication = async (req, res, next) => { 
 // const jobId=req.params.id; 

  upload(req, res, async (err) => {
    if (err) {
      return next(new ErrorHandler(err.message, 400));
    }

    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource.", 400)
      );
    }

    if (!req.file) {
      return next(new ErrorHandler("Resume File Required!", 400));
    }

    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);
      if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
          "Cloudinary Error:",
          cloudinaryResponse.error || "Unknown Cloudinary error"
        );
        return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
      }
      console.log("user ki bodyy",req.body); 
      const { name, email, coverLetter, Contact, Address, jobId } = req.body;
      const applicantID = {
        user: req.user._id,
        role: "Jobseeker",
      };

      if (!jobId) {
        return next(new ErrorHandler("Job not found!", 404));
      }

      const jobDetails = await jobpost.findById(jobId);
      if (!jobDetails) {
        return next(new ErrorHandler("Job not found!", 404));
      }

      const employerID = {
        user: jobDetails.Postedby,
        role: "Employee",
      };

      if (!name || !email || !coverLetter || !Contact || !Address || !jobId) {
        return next(new ErrorHandler("Please fill all fields.", 400));
      }

      const application = await new applicant({
        name,
        email,
        coverLetter,
       Contact,
        Address,
        applicantID,
        employerID,
        resume: {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.secure_url,
        },
        jobId
      }).save(); 
      res.status(200).json({
        success: true,
        message: "Application Submitted!",
        application,
      });
    } catch (error) {
      return next(new ErrorHandler(`from heree ${error.message}`, 500));
    }
  });
};

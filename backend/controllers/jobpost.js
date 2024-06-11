import { join } from "path";
import ErrorHandler from "../middlewares/error.js";
import jobpost from "../models/jobSchema.js ";
import jobuser from "../models/userSchema.js";

export const addpost=async(req,res,next)=>{
    const {role }=req.user; 
    
    if(role=="Jobseeker"){
        return next(new ErrorHandler("Job Seeker is not allowed to post Job",400))
     
    }
    const postedby= req.user._id;  
   
 const {
    title,
    description,
    fixedSalary,
    location,
    city,
    country,
    SalaryFrom,
    SalaryTo,
    JobType,
     Expierience,
     expired, 
     Postedon,
     Postedby} =req.body; 
     if (!title || !description ||  !location || !city || !country || ((!SalaryFrom  || !SalaryTo  )&& !fixedSalary)  || !JobType || !Expierience ) {
     
      return next(new ErrorHandler("Please provide all required fields", 400));
    }
 
 try {
    const post=new jobpost({
        title,description,fixedSalary,location,
        city,country,SalaryFrom,SalaryTo,JobType,
         Expierience,expired, Postedon,Postedby:postedby
    })
    await post.save(); 
    return next(new ErrorHandler("post Added Successfully !!!",201)); 
 } catch (error) {
    return next(new ErrorHandler(error,401)); 
 }
}

export const getmyjobs=async(req,res,next)=>{
    const id=req.user._id; 
    const role=req.user.role; 
    if(role=="Jobseeker"){
        return next(new ErrorHandler("Job Seeker is not allowed to post Job",400))
    }
    try {
        const job= await jobpost.find({Postedby:id});
        if (!job) {
          return next(new ErrorHandler("You have not posted any job",404));
        }
         
        res.send(job);
      } catch (error) {
     return next ( new ErrorHandler(`Error in finding your post : ${error.message}`,404));
      }
}


 export const Updatepost= async (req, res,next) => {
    const ID = req.params.id;
    const NewData= req.body;

    
   try {
      const updatedjob = await jobpost.findByIdAndUpdate(ID, NewData, { new: true });
      if (!updatedjob) {
        return next(new ErrorHandler("Item not exist",404));
      }
       
      res.status(200).json({msg:"Job Updated Successfully !!!"});
    } catch (error) {
   return next ( new ErrorHandler(`Error in updating item: ${error.message}`,404));
    }
  }

  export const Deletepost=async(req,res,next)=>{
    const ID = req.params.id;
    try {
        const job= await jobpost.findByIdAndDelete(ID);
        if (!job) 
            return next(new ErrorHandler("Item not exist",404));
        res.status(200).json({msg :"JOB POST DELETED SUCCESSFULLY 1!!"});
      } catch (error) {
        return next ( new ErrorHandler(`Error in Deleting item: ${error.message}`,404));
      }
  }
  export const getalljobs=async(req,res,next)=>{
    try {
        const jobs=await jobpost.find({expired:false}); 
        if(!jobs){
            return next(new ErrorHandler("No jobs are available for now !!",301));
        }
        console.log(jobs);
                res.status(200)
        .send(jobs)
    } catch (error) {
        return next ( new ErrorHandler(`Error in getting item: ${error.message}`,404));
    }
   
  }
  export const getjob=async(req,res,next)=>{
     const id=req.params.id; 
     console.log(id); 
     try {
      const jobdetails= await jobpost.findOne({_id:id}); 
      if(!jobdetails){
        return next ( new ErrorHandler(`Error in getting Details: ${error.message}`,404));
      } 
      res.status(202).send(jobdetails); 
      
     } catch (error) {
      return next ( new ErrorHandler(`Error in getting Details: ${error.message}`,404));
     }
  }
import mongoose from "mongoose";
import validator from "validator";
const applicantSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true , "please provide your name !!!"],
        minlength:[ 3 ,"name nust contain 3 letters"],
        maxlength:[30 ,"name should not exceed than 30 characters "]
    },
   email:{
        type:String,
      
        required:[true , "please provide your email !!! "],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email address!'
        }
    },
    Contact:{
        type:Number,
        required:[true , "please provide your phone number !!! "]
    },
    Address:{
        type:String,
        required:[true , "please provide your  Address !!! "]
    },
    coverLetter:{
         type:String,
        required:[true , "please provide your cover letter !!!"],
        minlength:[ 10 ,"cover letter nust contain 10 letters"],
        maxlength:[100 ,"cover letter should not exceed than 100 characters "]
    },
    resume:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    applicantID:{
        user:{
            type : mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        role:{
            type:String,
            enum:["Jobseeker"],
            required:true
        }
    },
    employerID:{
        user:{
            type : mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        role:{
            type:String,
            enum:["Employee"],
            required:true
        }
    },
        jobId:{
            type : mongoose.Schema.Types.ObjectId,
            ref:"jobpost",
            required:true  
        }
    
},{ timestamps:true});
const applicant=mongoose.model('applicant',applicantSchema); 
export default applicant; 
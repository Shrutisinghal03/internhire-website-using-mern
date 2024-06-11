import mongoose from "mongoose";
const jobSchema= new mongoose.Schema({
    title:{
        type:String,
        required:[true , "please provide your title !!!"],
        minlength:[ 10 ,"title nust contain 3 letters"],
        maxlength:[50 ,"title should not exceed than 30 characters "]
    },
  description:{
        type:String,
        required:[true , "please provide your  description !!! "],
        minlength:[ 20 ,"title nust contain 3 letters"],
        maxlength:[400 ,"title should not exceed than 30 characters "]
    },
    fixedSalary:{
        type:Number,
    },
    location:{
        type:String,
        required:[true , "please provide your  location !!! "]
    },
   city:{
        type:String,
        required:[true , "please provide your city !!! "]
    },
    country:{
        type:String,
        required:[true , "please provide your  country !!! "]
    },
    SalaryFrom:{
        type:Number,
       
    },
    SalaryTo:{
        type:Number,
        
    },
    JobType:{
        type:String,
        enum :["full-time", "part-time"]
    },
    Expierience:{
        type:Number,
        required:true
    },
    expired:{
        type:Boolean,
        default:false,
    },
    Postedon:{
        type:Date,
        default:Date.now()
    },
   Postedby:{
    type : mongoose.Schema.ObjectId,
    ref:"User",
    required:true,
   }
},{ timestamps:true});
const jobpost=mongoose.model('jobpost',jobSchema); 
export default jobpost; 
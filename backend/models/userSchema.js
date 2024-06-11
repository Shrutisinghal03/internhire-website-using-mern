import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true , "please provide your name !!!"],
        minlength:[ 3 ,"name nust contain 3 letters"],
        maxlength:[30 ,"name should not exceed than 30 characters "]
    },
   email:{
        type:String,
        required:[true , "please provide your email !!! "],
        unique:true,
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
    password:{
        type:String,
        required:[true , "please provide your  password !!! "],
        minlength:[ 3 ,"password nust contain 3 letters"],
        maxlength:[30 ,"password should not exceed than 30 characters "],
       
    },
    role:{
        type:String,
        enum:["Jobseeker","Employee"]
    }
},{ timestamps:true});
userSchema.pre("save",async function(next){  
    if(this.isModified('password'|| this.isNew)){
        this.password=await bcrypt.hash(this.password,10);  
      
    }
 
next()
}); 
userSchema.methods.comparepassword= function (enteredPassword){
    return  bcrypt.compare(enteredPassword,this.password); 
}
userSchema.methods.generateJwtToken = function() {
    return jwt.sign(
        { id: this._id },
        process.env.JwtSecretKey,
        { expiresIn: process.env.jwtExpire }
    );
};


const jobuser=mongoose.model('jobuser',userSchema); 
export default jobuser; 
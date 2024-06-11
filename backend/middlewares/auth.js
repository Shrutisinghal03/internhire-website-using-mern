import  jwt  from "jsonwebtoken";
import ErrorHandler from "./error.js";
import jobuser from "../models/userSchema.js";
const authuser=async(req,res,next)=>{
   
   const {token}=req.cookies;
    if(!token)
        return next(new ErrorHandler("User Not Exist ", 400));

   const decoded=jwt.verify(token,process.env.JwtSecretKey); 
 const fetchUser= await jobuser.findById(decoded.id); 

 if(!fetchUser)
    return next(new ErrorHandler("User Not Exist ", 400));
 req.user=fetchUser; 
 //console.log(req.user); 
   next(); 
}
export default authuser; 
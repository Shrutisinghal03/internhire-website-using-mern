import jobuser from "../models/userSchema.js"
// import authuser from "../middlewares/auth.js";
import ErrorHandler from "../middlewares/error.js";
import { sendtoken } from "../utils/basicfxn.js";

export const Register = async (req, res, next) => {
    const { name, email, password, role, Contact, Address } = req.body;

    try {
        // Check if user already exists
        const existingUser = await jobuser.findOne({ email });
        if (existingUser) {
            return next(new ErrorHandler("User already exists!", 400));
        }

        // Create a new user
        const newUser = new jobuser({
            name,
            email,
            password,
            role,
            Contact,
            Address
        });

        // Save the user to the database
        const response = await newUser.save();
        sendtoken(response, 200, res, "User successfully registered!");

    } catch (error) {
        next(error);
    }
};

export const login = async (req, res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    const role=req.body.role; 


    try {
        const userm =  await jobuser.findOne({email}); 
        
    if(!userm)
        return next(new ErrorHandler("User Does nort Existt ", 400));
    const decode=await userm.comparepassword(password);  
    if (!decode)
        return next(new ErrorHandler("Incorrect Password !!! ", 400));
if (role!==userm.role){
    return next(new ErrorHandler("Incorrect Role !!! ", 400));
}
    sendtoken(userm,200,res,"user LOgged Inn Successfully !!!!!");
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
    

}
export const logout=async(req,res,next)=>{
    try {
        res
        .status(201).
        cookie("token","",{
            httpOnly:true,
            expires:new Date(Date.now()) })
        .json({
            message:"User Logged Out Successfully"
        })
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
  
}  
      export const getuser=async(req,res,next)=>{
        const user=req.user; 
        res.status(200).send(user); 
      }


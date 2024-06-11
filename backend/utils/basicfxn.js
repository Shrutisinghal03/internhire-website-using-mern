export const sendtoken=async(user,statusCode,res,message)=>{
    const token=user.generateJwtToken();
      const options={
        expires:new Date(Date.now()+5*24*60*60*1000),
        httpOnly:true
      }
      res.status(200).cookie("token",token,options).json({
        success:true,
        user,
        message,
   token
      }); 
}

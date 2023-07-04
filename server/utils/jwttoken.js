//creating token and saving in cookie
const sendtoken=(user,statusCode,res)=>{
    const token= user.getJWTToken();

    const option={
        expire:new Date(Date.now()+7*24*60*60*1000),
        httpOnly:true,
    }
   
    res.status(statusCode).cookie("token",token,option).json({
        success:true,
        user,
        token
    })
};

module.exports=sendtoken


const ErrorHandler=require("../utils/errorhandler")

module.exports=(err,req,res,next)=>{

    err.statusCode=err.statusCode ||500;
    err.message= err.message || "internal server error"

    //Wrong mongodb ID error

    if (err.name==="CastErro") {

        const message=`resource not found invalid :${err.path}`
        err=new ErrorHandler(message,400);
    }
     //Mongoose duplicate key error

     if (err.code===11000) {

        const message=`duplicate ${Object.keys(err.keyValue)} Entered`;

        err =new ErrorHandler(message,400)
        
    }
    if (err.name==="jsonWebTokenError") {

        const message=`jsonWeb Token is invalid, please try again`
        err=new ErrorHandler(message,400);
    }
    if (err.name==="TokenExpiredError") {

        const message=`jsonWeb Token is expired, please try again`
        err=new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    })


   
}
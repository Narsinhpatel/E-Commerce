
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncerror = require("./catchAsyncerror");
const User=require("../model/usermodel");
var jwt = require('jsonwebtoken');
const SECRET_KEY="PATELNARSINHRAMESHBHAI";
exports.isAuthenticatedUser=catchAsyncerror(async(req,res,next)=>{

    const {token}=req.cookies;

    if(!token){
        return next(new ErrorHandler("Please Login To access this Resource",401))
    }

    const decodedData= jwt.verify(token,SECRET_KEY);
     
    req.user=await User.findById(decodedData.id);

    next()
})

exports.authorizedUser=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){

           return next(new ErrorHandler(`Role:${req.user.role} is not allowed to access this resource`,403)) 
        }

        next()
    }
}
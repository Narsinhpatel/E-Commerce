const ErrorHandler = require("../utils/errorhandler");
const catchAsyncerror = require("../middleware/catchAsyncerror");
const User=require("../model/usermodel");
const sendtoken = require("../utils/jwttoken");
const cloudinary=require('cloudinary')


//register User

exports.RegisterUser=catchAsyncerror(async(req,res,next)=>{

    const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale"
    })
    const {name,email,password}=req.body;


    const user=await User.create({name,email,password,avatar:{
        public_id:myCloud.public_id,
        url:myCloud.secure_url, 
    }})


  sendtoken(user,201,res)
})


//Login  User

exports.LoginUser=catchAsyncerror(async(req,res,next)=>{
    const {email,password}=req.body;

    if(!email||!password){
        return next(new ErrorHandler("Please Enter Email & Password",400))
    }

    const user=await User.findOne({email:email}).select("+password");

  

    if(!user){
        return next(new ErrorHandler(" Invalid Email or Password",401))
    }
   

    const isPasswordMatched= await user.comparePassword(password);

   
    
    if(!isPasswordMatched){
        return next(new ErrorHandler(" Invalid Email or Password",401))
    }

sendtoken(user,200,res)

})


//log out 

exports.logout=catchAsyncerror(async(req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })


    res.status(200).json({
        success:true,
        message:"Logout Successfull"
    })
})

//forgot password



//get User Details

exports.getUserDetails=catchAsyncerror(async(req,res,next)=>{

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user,
    })

})


//Update PassWord 

exports.updatePassword=catchAsyncerror(async(req,res,next)=>{

    const user= await User.findById(req.user.id).select("+password");

    const isPasswordMatched= await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){

        return next(new ErrorHandler("Old Password is incorrect"),400);
    }

    if (req.body.newPassword!==req.body.confirmPassword) {

        return next(new ErrorHandler("confirm password does not match"),400)
        
    }

    user.password=req.body.newPassword;

    await user.save();

    sendtoken(user,200,res);

})

//update profile

exports.updateProfile=catchAsyncerror(async(req,res,next)=>{

   
     const newUserData={
        name:req.body.name,
        email:req.body.email,
     }


   if (req.body.avatar!=="") {
    const user=await User.findById(req.user.id);

    const imageId=user.avatar.public_id
    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale"
    })

    newUserData.avatar={
        public_id:myCloud.public_id,
        url:myCloud.secure_url
    }
   }

     const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
     })

     res.status(200).json({
        success:true,
        user
     })

   
})
 


  //get All User --Admin

  exports.getAllUser=catchAsyncerror(async(req,res,next)=>{

    const users=await User.find();

    res.status(200).json({
        success:true,
        users
    })
 })

 //get single user Details

 exports.getSingleUser=catchAsyncerror(async(req,res,next)=>{

    const user=await User.findById(req.params.id);

    if(!user){
        next(new ErrorHandler(`User Does not exist with id: ${req.params.id}`))
    }

    res.status(200).json({
        success:true,
        user
    })
 })

 //Update User Role
 exports.updateRole=catchAsyncerror(async(req,res,next)=>{

   
    const newUserData={
       name:req.body.name,
       email:req.body.email,
       role:req.body.role,
    }

    

    const user=await User.findByIdAndUpdate(req.params.id,newUserData,{
       new:true,
       runValidators:true,
       useFindAndModify:false,
    })
    if(!user){
        next(new ErrorHandler(`User Does not exist with id: ${req.params.id}`))
    }

    res.status(200).json({
       success:true,
       user
    })

  
})

///delete User 
exports.deleteUser=catchAsyncerror(async(req,res,next)=>{
    const user=await User.findById(req.params.id)

    //we will remove cloudinary later

    if(!user){
        next(new ErrorHandler(`User Does not exist with id: ${req.params.id}`))
    }

    await user.deleteOne()

    res.status(200).json({
        success:true,
        user
     })
})

//create New review/update review



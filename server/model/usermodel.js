const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcrypt');
const crypto=require('crypto');
var jwt = require('jsonwebtoken');
const SECRET_KEY="PATELNARSINHRAMESHBHAI";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter your name']
    },
    email:{
 
        type:String,
        required:[true,'Enter Your Email Address'],
        unique:true,
       
        validate:[validator.isEmail,'Enter Valid Email ']
    },
    password:{

        type:String,
        required:[true,'Enter Password'],
        minLength:[4,'[password should  be greater than 4 charcter'],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },  url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
  createdAt:{
    type:Date,
    default:Date.now
  },

    resetpasswordtoken:String,
    resetpasswordexpire:Date,

});


userSchema.pre("save",async function(){
    if (!this.isModified("password")) {
        next();
    }

    this.password=await bcrypt.hash(this.password,10)

})

userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},SECRET_KEY,{
        expiresIn:"5d",
    })
}

userSchema.methods.comparePassword= async function(enteredpassword){

 
    return  bcrypt.compare(enteredpassword,this.password)
}
//Generating Password resetToken



module.exports=mongoose.model("User",userSchema);


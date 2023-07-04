const mongoose=require('mongoose');

const dotenv=require('dotenv');
dotenv.config({path:"server/config/config.env"});
mongoose.set('strictQuery', true);


mongoose.connect("mongodb+srv://narsinh1901:Qv_2hkRY!H9D_Wp@cluster0.tcjeskf.mongodb.net/Ecommerce?retryWrites=true&w=majority").then(()=>{

console.log('connection Successfull with database')
}).catch((err)=>{
    console.log(err)
    })
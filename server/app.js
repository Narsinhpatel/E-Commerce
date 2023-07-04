 const express=require('express');
 const errormiddleware=require("./middleware/error")
 const cookieparser=require('cookie-parser')
 const bodyParser=require('body-parser')
 const fileUpload=require('express-fileupload')
 const app=express()


 app.use(express.json())
 app.use(cookieparser())
 app.use(bodyParser.urlencoded({extended:true}));
 app.use(fileUpload());



 //route imports
const product=require("./routes/productRoute");
const user=require("./routes/userRoute")
const order=require("./routes/orderRoute")
const payment=require("./routes/paymentRoute")
app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)
app.use("/api/v1",payment)
  //middleware for error

  app.use(errormiddleware)


 module.exports=app
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncerror = require("../middleware/catchAsyncerror");

const stripe=require('stripe')("sk_test_51NKKDJSIC3VhsjCmV6cB2RzPjtj92HfvLNcH8El0buExB6OJBrZ7CTqrimuagZdXJe3rLzIm8dwO6JJxTX97bjfc00vnmGaWv1");

exports.processPayment=catchAsyncerror(async(req,res,next)=>{
    const myPayments=await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:"inr",
        metadata:{
            company:"Ecommerce"
        }
    })
    res.status(200).json({success:true,client_secret:myPayments.client_secret})
})
exports.sendStripeApiKey=catchAsyncerror(async(req,res,next)=>{
  
    res.status(200).json("pk_test_51NKKDJSIC3VhsjCmxLb0r0nExjLPUNcJRRIYEDnisha58AZ4Vtcp0UzX6tSYtWjDUDfg5533OoVcu0ywVsYvTjYV00Lc03QVQ6")
})
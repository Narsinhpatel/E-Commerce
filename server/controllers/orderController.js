const Order=require("../model/ordermodel");
const Product=require("../model/productmodel");
const ApiFeature = require("../utils/ApiFeatures");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncerror = require("../middleware/catchAsyncerror");
 


//create  new error
exports.newOrder=catchAsyncerror(async(req,res,next)=>{

    const {shippingInfo,orderItems,paymentInfo,itemPrice,taxPrice,shippingPrice,totalPrice}=req.body;


     const order=await Order.create({shippingInfo,orderItems,paymentInfo,itemPrice,taxPrice,shippingPrice,totalPrice,paidAt:Date.now(),user:req.user._id})


     res.status(200).json({
        success:true,
        order 
     })
})


//Get single order Details

exports.getSingleOrder=catchAsyncerror(async(req,res,next)=>{

    const order=await Order.findById(req.params.id).populate("user","name email")

    if (!order) {

        return next(new ErrorHandler("Order not fount with this Id",404));
        
    }

    res.status(200).json({
        success:true,
        order,
    })
})

//get logged in user order

exports.myOrder=catchAsyncerror(async(req,res,next)=>{

    const orders=await Order.find({user:req.user._id})


    res.status(200).json({
        success:true,
        orders,
    })
})

//get all order --admin
exports.getAllOrder=catchAsyncerror(async(req,res,next)=>{

    const orders=await Order.find();

    let totalamount=0;

    orders.forEach(order=>{
        totalamount+=order.totalPrice;
    })


    res.status(200).json({
        success:true,
        totalamount,
        orders,
    })
})

//update order status--admin

exports.updateOrder=catchAsyncerror(async(req,res,next)=>{

    const order=await Order.findById(req.params.id);

    if (!order) {

        return next(new ErrorHandler("Order not fount with this Id",404));
        
    }

    if (order.orderStatus==="Delivered") {

        return next(new ErrorHandler("You have delivered this order",400))
        
    }

    order.orderItems.forEach(async(order)=>{

        await updateStock(order.product,order.quantity)
    });

    order.orderStatus=req.body.status;

    if (req.body.status==="Delivered") {
        order.deliverdAt=Date.now();
        
    }


    await order.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
       
        order,
    })
})

async function updateStock(id,quantity){
    const product=await Product.findById(id);

    product.stock-=quantity;    

    await product.save({validateBeforeSave:false})
}


//delete Order --Admin

exports.deleteOrder=catchAsyncerror(async(req,res,next)=>{

    const order=await Order.findById(req.params.id);
    if (!order) {

        return next(new ErrorHandler("Order not fount with this Id",404));
        
    }


   order.deleteOne();

    res.status(200).json({
        success:true,
        
        order,
    })
})
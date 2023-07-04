
const Product=require("../model/productmodel");
const ApiFeature = require("../utils/ApiFeatures");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncerror = require("../middleware/catchAsyncerror");
 




//create product -Admin

exports.createProduct=catchAsyncerror(async(req,res)=>{

    req.body.user=req.user.id;

    let product= await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
 
}
)

//get All product
exports.getAllproduct=catchAsyncerror(async(req,res,next)=>{

  
    let resultPerPage=6;

    let productCount=await Product.countDocuments();

    const apifeature=new ApiFeature(Product.find(),req.query).search().filter();

    let products= await apifeature.query;

    let filteredProductsCount=products.length;
    apifeature.pagination(resultPerPage);
     products= await apifeature.query.clone();
    

    res.status(200).json({
        success:true,
        products,
        productCount,
        resultPerPage,
        filteredProductsCount,
    })
});

//Get Product Details

exports.getProductDetails=catchAsyncerror(async(req,res,next)=>{

    let product=await Product.findById(req.params.id);
    if(!product){
      return next(new ErrorHandler("product not found",404))

    }
    res.status(200).json({
        success:true,
        product,
       
    })
   
})

//update Product -Admin

exports.updateProduct=catchAsyncerror(async(req,res,next)=>{

    let product= await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("product not found",404))

    }

    product= await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        product
    })
   


})

//Delete Product

exports.deleteProduct=catchAsyncerror(async(req,res,next)=>{

    let product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("product not found",404))

    }
    await Product.deleteOne()

    res.status(200).json({
        success:true,
        massage:"Product delete"
    })
});


exports.createProductReview=catchAsyncerror(async(req,res,next)=>{

    const{rating,comment,productId}=req.body;
    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    }

    const product=await Product.findById(productId);
    const isReviewed=product.reviews.find((rev)=>rev.user.toString()===req.user._id.toString())
    if(isReviewed){

        product.reviews.forEach(rev=>{
            if((rev)=>rev.user.toString()===req.user._id)
                rev.rating=rating, rev.comment=comment;
        })

    }else{
        product.reviews.push(review);
        product.numOfReviews=product.reviews.length;
    }

    let avg=0;
    product.reviews.forEach(rev=>{
        avg+=rev.rating;
})
    product.ratings=avg/product.reviews.length; 

    await product.save({validateBeforeSave:false});

    res.status(200).json({
        sucess:true,
    })
})


//Get Product all Reviews

exports.getProductReviews=catchAsyncerror(async(req,res,next)=>{

    const product= await Product.findById(req.query.id);

    if(!product){
        return next( new ErrorHandler("Product not Found",404))
    }

    res.status(200).json({
        success:true,
        reviews:product.reviews,
    })

})

//delete reviews

exports.deleteReviews=catchAsyncerror(async(req,res,next)=>{

    const product= await Product.findById(req.query.productId);

    if(!product){
        return next(ErrorHandler("Product not Found",404))
    }

    const reviews=product.reviews.filter((rev)=>rev._id.toString()!==req.query.id.toString())

    let avg=0;
    reviews.forEach(rev=>{
        avg+=rev.rating;
})
    const ratings=avg/reviews.length; 
    const numOfReviews=reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,ratings,
        numOfReviews 
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })


    res.status(200).json({
        success:true,
        
    })

})




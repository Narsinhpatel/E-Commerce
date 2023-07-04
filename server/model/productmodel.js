const mongoose=require('mongoose');


const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter product name'],
        trim:true
    },
    description:{
        type:String,
        required:[true,'please enter product Description'] 
    },
    price:{
        type:Number,
        required:[true,'please enter product price'],
        maxLength:[8,'price cannot exceed 3 characters']
    },
    ratings:{
        type:Number,
        default:0
    },
    image:[{
        public_id:{
            type:String,
            required:true
        },  url:{
            type:String,
            required:true
        }
    }
],
    category:{
        type:String,
        required:[true,'please enter category'],
    },
    stock:{
        type:Number,
        required:[true,'please enter product price'],
        maxLength:[4,'stock cannot exceed 4 characters'],
        default:1
    },
    numOfReviews:{

        type:Number,
        default:0,
        
    },
     reviews:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true,
             },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String
            }
        }
     ],

     user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
     },
     createdat:{
        type:Date,
        default:Date.now
     }

})




module.exports=mongoose.model("product",productSchema)
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter product name"],
        trim:true,
        maxlength:[100,"product name cannot exceed 100 characters"]
    },
    price:{
        type:Number,
        required:true,
        default:0.0
    },
    description:{
        type:String,
        required:[true,"please enter product description"]
    },
    ratings:{
        type:String,
        default:0
    },
    images:[
        {
            image:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"please enter product category"],
        enum:{
            values:[
                'Electronics',
                'Mobile Phones',
                'Laptops',
                'Accesssories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message:"please select correct category"
        }
    },
    seller:{
        type:String,
        required:[true,"please enter product seller"]
    },
    stock:{
        type:Number,
        required:[true,"please enter product stock"],
        maxlength:[20,"product stock cannot exceed 20"]
    },
    numofReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:mongoose.Schema.Types.ObjectId,
            rating:{
                type:String,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId
    }
    ,
    createdAt:{
        type:Date,
        default:Date.now()
    }
})


let schema = mongoose.model('Product', productSchema)

module.exports = schema;
import mongoose from "mongoose"
const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    
    companyName:{
        type:String,
        required:true
        
    },
    TopImage:{
        type:String,
        required:true
    },
    BackImage:{
        type:String,
        required:true
    },
    FrontImage:{
        type:String,
        required:true
    },
    BottomImage:{
        type:String,
        required:true
    },
    

})
 export const Product=mongoose.model("Product",productSchema)


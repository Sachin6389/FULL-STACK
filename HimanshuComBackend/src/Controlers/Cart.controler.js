import { asyncHandler } from "../utiles/AscynHandler.js"
import { ApiError } from "../utiles/ApiError.js"
import { Apiresponse } from "../utiles/ApiResponse.js"
import { User } from "../Models/user.Models.js"
import {Product} from '../Models/Product.Models.js'
import mongoose from "mongoose"



const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  let { productId, quantity } = req.body;
  
  

  if (Array.isArray(productId)) productId = productId[0];
  if (Array.isArray(quantity)) quantity = quantity[0];

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new ApiError(400, "Invalid product ID");
  }

  quantity = Number(quantity); // 🔥 IMPORTANT
  
  

  if (!quantity || isNaN(quantity) || quantity <= 0) {
    throw new ApiError(400, "Quantity must be greater than 0");
  }
  try {
     const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  const date = new Date();


  const updatedUser = await User.findByIdAndUpdate(
    userId,
   {
      $set: {
        [`cartData.${productId}.date`]: date
      },
      $inc: {
        [`cartData.${productId}.quantity`]: quantity
      }
    },
    { new: true, upsert: true }
  );

  return res.status(200).json(
    new Apiresponse(
      200,
      updatedUser.cartData,
      "Product added to cart successfully"
    )
  );
    
  } catch (error) {
    const status = error.statusCode || 500;
    return res
      .status(status)
      .json(new Apiresponse(status, null, error.message || "Something went wrong at adding to cart"));
    
  }

 
});





const updateCart= asyncHandler(async(res,req)=>{
    try {
        const user = req.user;
    const userId = user._id;

    let cart = user.cart 
    

    const { productId, quantity } = req.body;
    if (!productId || quantity===undefined) {
        return res.status(400).json(new Apiresponse(400, null, "Product ID and quantity are required"));
    } 
    // If quantity is 0, remove the product from cart
       cart[productId].date = date;
      cart[productId] = quantity  ;
      

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { cart },
      { new: true }
    );

    return res.status(200).json(
      new Apiresponse(200, updatedUser.cart, "Cart updated successfully")
    );
  } catch (error) {
    const status = error.statusCode || 500;
    return res
      .status(status)
      .json(new Apiresponse(status, null, error.message || "Something went wrong at updating cart"));
  }
    
    
})
const getUserCart= asyncHandler(async(req,res)=>{
    try {
        const user = req.user;
        const userId = user._id;

        const userData = await User.findById(userId);

        if (!userData) {
            return res.status(404).json(new Apiresponse(404, null, "User not found"));
        }

        return res.status(200).json(
            new Apiresponse(200, userData.cartData, "User cart retrieved successfully")
        );
    } catch (error) {
        const status = error.statusCode || 500;
        return res
          .status(status)
          .json(new Apiresponse(status, null, error.message || "Something went wrong at fetching user cart"));
    }
})
export  {
    addToCart,updateCart,getUserCart
}
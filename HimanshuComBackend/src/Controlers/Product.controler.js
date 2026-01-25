import { asyncHandler } from "../utiles/AscynHandler.js";
import { ApiError } from "../utiles/ApiError.js";
import { UploudOnCloundinary ,destroyoncloundinary} from "../utiles/cloundinary.js";
import { Apiresponse } from "../utiles/ApiResponse.js";
import   { Product }  from "../Models/Product.Models.js";
import mongoose from "mongoose";


const addProduct = asyncHandler(async (req, res) => {
  const { name, description, price, companyName } = req.body;
  try {
    if (
    [name, description, price, companyName].some(
      (field) => field?.trim() === ""
    )
  ) {
    return res .status(400).json(new Apiresponse(400, "All fields are required"))
  }
  const exitsProduct = await Product.findOne({name});
  if (exitsProduct) {
    return res.status(400).json( new Apiresponse(400, "Product is already exist"));
  }
  
  const topLocalPath = req.files?.top?.[0]?.path;

  if (!topLocalPath) {
    return res.status(400).json(new Apiresponse(400, "TopImage file is required"))
  }
  const TopImage = await UploudOnCloundinary(topLocalPath);

  if (!TopImage) {
    return res.status(400) .json(new Apiresponse(400, "TopImage file is not uploading"));
  }
  const BottomLocalPath = req.files?.bottom?.[0]?.path;

  if (!BottomLocalPath) {
    return res .status(400).json(new Apiresponse(400, "BottomImage file is required"));
  }
  const BottomImage = await UploudOnCloundinary(BottomLocalPath);

  if (!BottomImage) {
    return res .status(400).json(new Apiresponse(400, "BottomImage file is not uploading"));
  }
  const Frontlocalpath = req.files?.front?.[0]?.path;

  if (!Frontlocalpath) {
     return res .status(400).json(new Apiresponse(400, "FrontImage file is required"));
  }
  const FrontImage = await UploudOnCloundinary(Frontlocalpath);

  if (!FrontImage) {
     return res .status(400).json(new Apiresponse(400, "FrontImage file is not uploading"));
  }
  const backLocalPath = req.files?.back?.[0]?.path;

  if (!backLocalPath) {
     return res .status(400).json(new Apiresponse(400, "BackImage file is required"));
  }
  const BackImage = await UploudOnCloundinary(backLocalPath);

  if (!BackImage) {
     return res .status(400).json(new Apiresponse(400, "BackImage file is not uploading"));
  }
  const productCreate = await Product.create({
    name: name,
    description,
    price: Number(price),
    companyName,
    TopImage: TopImage.url,
    BottomImage: BottomImage.url,
    FrontImage: FrontImage.url,
    BackImage: BackImage.url,
  });
  if (!productCreate) {
     return res .status(400).json(new Apiresponse(400, "Something went wrong when creating  product"));
  }
  return res
    .status(200)
    .json(new Apiresponse(200, productCreate, "Succesfull upload a product"));

    
  } catch (error) {
     const status = error.statusCode || 500;
        return res
          .status(status)
          .json(new Apiresponse(status, null, error.message || "Something went wrong at uploading product"));
    }
  
})
  

const listOfProducts = asyncHandler(async (req, res) => {
  try {
    const product= await Product.find({})
    if(!product){
        return res.status(500).json(new Apiresponse(500,"Something went wrong when fatch all product details"))
    }
    return res.status(200)
    .json(new Apiresponse(200,product,"succesfull get deatial of all product"))
  } catch (error) {
     const status = error.statusCode || 500;
        return res
          .status(status)
          .json(new Apiresponse(status, null, error.message || "Something went wrong at fetching user cart"));
    
  }
    
});
const removeProduct = asyncHandler(async (req, res) => {
  try {
    const {productId} = req.params;

  if (!mongoose.isValidObjectId(productId)) {
    return res.status(400).json( new Apiresponse(400, "Invalide productId"));
  }
  const deletesProduct = await Product.findByIdAndDelete(productId);
  const topImage = deletesProduct.TopImage
  const BottomImages = deletesProduct.BottomImage;
  const frontIamge = deletesProduct.FrontImage;
  const backImage = deletesProduct.BackImage;
  const topImageurl = topImage.split("/").pop().split(".")[0];
  const botomImageurl = BottomImages.split("/").pop().split(".")[0];
  const frontImageurl = frontIamge.split("/").pop().split(".")[0];
  const backImageurl = backImage.split("/").pop().split(".")[0];
  await destroyoncloundinary(topImageurl);
  await destroyoncloundinary(botomImageurl);
  await destroyoncloundinary(frontImageurl);
  await destroyoncloundinary(backImageurl);
  return res
    .status(200)
    .json(new Apiresponse(200, deletesProduct, "succesfull delete product "))
  } catch (error) {
     const status = error.statusCode || 500;
        return res
          .status(status)
          .json(new Apiresponse(status, null, error.message || "Something went wrong at removing product"));
  }
  
  
});
const UpdateProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, companyName } = req.body;
  if (
    [name, description, price, companyName].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  } // check for params id 
  const { productId } = req.body
  
  if (!mongoose.isValidObjectId(productId)) {
    throw new ApiError(400, "Invalide ProductId");
  }
  const oldProduct = await Product.findById(productId);
  const topImage = oldProduct.TopImage;
  const BottomImages = oldProduct.BottomImage;
  const frontIamge = oldProduct.FrontImage;
  const backImage = oldProduct.BackImage;
  const topImageurl = topImage.split("/").pop().split(".")[0];
  const botomImageurl = BottomImages.split("/").pop().split(".")[0];
  const frontImageurl = frontIamge.split("/").pop().split(".")[0];
  const backImageurl = backImage.split("/").pop().split(".")[0];
  await destroyoncloundinary(topImageurl);
  await destroyoncloundinary(botomImageurl);
  await destroyoncloundinary(frontImageurl);
  await destroyoncloundinary(backImageurl);
  

  const topLocalPath = req.files?.top[0]?.path;

  if (!topLocalPath) {
    throw new ApiError(400, "TopImage file is required");
  }
  const TopImage = await UploudOnCloundinary(topLocalPath);

  if (!TopImage) {
    throw new ApiError(400, "TopImage file is required");
  }
  
  const BottomLocalPath = req.files?.bottom[0]?.path;

  if (!BottomLocalPath) {
    throw new ApiError(400, "BottomImage file is required");
  }
  const BottomImage = await UploudOnCloundinary(BottomLocalPath);

  if (!BottomImage) {
    throw new ApiError(400, "BottomImage file is required");
  }
  const Frontlocalpath = req.files?.front[0]?.path;

  if (!Frontlocalpath) {
    throw new ApiError(400, "FrontImage file is required");
  }
  const FrontImage = await UploudOnCloundinary(Frontlocalpath);

  if (!FrontImage) {
    throw new ApiError(400, "frontImage file is required");
  }
  const backLocalPath = req.files?.back[0]?.path;

  if (!backLocalPath) {
    throw new ApiError(400, "BackImage file is required");
  }
  const BackImage = await UploudOnCloundinary(backLocalPath);

  if (!BackImage) {
    throw new ApiError(400, "TopImage file is required");
  }
  const updateProductDetails=await Product.findByIdAndUpdate(
    productId,
     {
        name,
        description,
        price:Number(price),
        companyName,
        TopImage:TopImage.url,
        BottomImage:BackImage.url,
        FrontImage:FrontImage.url,
        BackImage:BackImage.url

    },
    {
        new:true
    }
  )
  if (!updateProductDetails) {
    throw new ApiError(500,"Something went wrong when update the product details")
    
  }
  return res .status(200)
  .json(new Apiresponse(200,updateProductDetails,"Succesfull update product details"))
  } catch (error) {
    const status = error.statusCode || 500;
        return res
          .status(status)
          .json(new Apiresponse(status, null, error.message || "Something went wrong at updating products"));
  }
  
});
const singleProduct = asyncHandler(async (req, res) => {
  try {
    const {productId}=req.body
    const product= await Product.findById(productId)
    return res.status(200)
    .json(new Apiresponse(200,product,"succesfull get product details"))
  } catch (error) {
    const status = error.statusCode || 500;
        return res
          .status(status)
          .json(new Apiresponse(status, null, error.message || "Something went wrong at fetching product"));
  }
    
});

export { addProduct, listOfProducts, removeProduct, singleProduct,UpdateProduct };

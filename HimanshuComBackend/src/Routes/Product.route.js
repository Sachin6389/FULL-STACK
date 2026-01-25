import{Router}  from 'express'
import{addProduct,listOfProducts,removeProduct,singleProduct,UpdateProduct} from "../Controlers/Product.controler.js"
import { upload } from '../MiddleWare/Multer.js'
import {adminAuth} from '../MiddleWare/admin.auth.js'
const routerofProduct= Router()
routerofProduct.route("/products").get(listOfProducts)
routerofProduct.route("/add").post(adminAuth,upload.fields([
        {
        name:"top",
        maxCount:1
    },
      {
        name:"bottom",
        maxCount:1
    },
      {
        name:"front",
        maxCount:1
    },
      {
        name:"back",
        maxCount:1
    },
        
    ]),addProduct)
routerofProduct.route("/:productId").delete(adminAuth,removeProduct)
routerofProduct.route("/product/productId").get(singleProduct)
routerofProduct.route("/update").post(upload.fields([
        {
        name:"top",
        maxCount:1
    },
      {
        name:"bottom",
        maxCount:1
    },
      {
        name:"front",
        maxCount:1
    },
      {
        name:"back",
        maxCount:1
    },
        
    ]),UpdateProduct)
   
export default routerofProduct
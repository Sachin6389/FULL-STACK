import express from 'express'
import cookeiParser from 'cookie-parser'
import cors from  'cors'



const app = express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({extended:true,limit:"10mb"}));
app.use(express.static("Public"));
app.use(cookeiParser());

import userRouter from './Routes/user.route.js'
import routerofProduct from './Routes/Product.route.js'
import cartrouter from './Routes/Cart.route.js'
import orderRouter from './Routes/Order.route.js'
app.use("/api/v1/users", userRouter)
app.use("/api/v1/Product",routerofProduct)
app.use("/api/v1/Cart", cartrouter)
app.use("/api/v1/Order", orderRouter)

export default app
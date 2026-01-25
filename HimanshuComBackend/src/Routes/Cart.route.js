import{Router}  from 'express'
import {addToCart,updateCart, getUserCart}from "../Controlers/Cart.controler.js"
import { verifyjwt } from '../MiddleWare/auth.middleware.js'
const cartrouter=Router()
cartrouter.get('/get',verifyjwt,getUserCart)
cartrouter.post('/add',verifyjwt,addToCart)
cartrouter.post('/update',verifyjwt,updateCart)
export default cartrouter

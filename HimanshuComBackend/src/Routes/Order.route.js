import { Router } from "express";
import {adminAuth} from '../MiddleWare/admin.auth.js'
import { verifyjwt } from "../MiddleWare/auth.middleware.js";
import { Cashondelivery,Rezorpay,stripepayment ,getOrders,getuserorder,updatestatus ,verifystripe,updateorderrecord} from '../Controlers/Orders.controler.js'
const orderRouter = Router();
orderRouter.post('/cashondelivery',verifyjwt, Cashondelivery);
orderRouter.post('/rezorpay', verifyjwt, Rezorpay);
orderRouter.post('/stripe', verifyjwt, stripepayment );
orderRouter.get('/getorders', adminAuth, getOrders);
orderRouter.post('/getuserorder', verifyjwt, getuserorder);
orderRouter.post('/updatestatus', adminAuth, updatestatus)
orderRouter.post('/verifystripe',verifyjwt,verifystripe)
orderRouter.post('/deleteOrder',adminAuth,updateorderrecord)
export default orderRouter;
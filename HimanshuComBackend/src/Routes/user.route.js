import{Router}  from 'express'
import { registerUser } from '../Controlers/User.controler.js'
import {upload } from '../MiddleWare/Multer.js'
import { LogoutUser,adminPanel } from '../Controlers/User.controler.js'
import { loginuser } from '../Controlers/User.controler.js'
import { verifyjwt } from '../MiddleWare/auth.middleware.js'
import{refreshAccessToken,
   changePassword,
   
   updatedAccountDetail,
   updatedAvatarImage,} 
   from '../Controlers/User.controler.js'
   

   
const router= Router()
router.route("/register").post(
    upload.fields([
        {
        name:"avatar",
        maxCount:1
    },
        
    ]),
    registerUser
)
router.route("/Login").post(loginuser)
router.route("/AdminLogin").post(adminPanel)
router.route("/Logout").post(verifyjwt,LogoutUser)
router.route("/refresh_token").post(refreshAccessToken)
router.route("/changed-password").post(verifyjwt,changePassword)

router.route("/updated-account").patch(verifyjwt,updatedAccountDetail)
router.route("/avatar").patch(verifyjwt,upload.single("avatar"),updatedAvatarImage)

export default router
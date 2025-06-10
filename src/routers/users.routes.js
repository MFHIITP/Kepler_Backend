import {Router} from 'express'
import { signupaction } from '../controllers/signup.controller.js';
import { otpVerify } from '../controllers/verifyOTP.controller.js';
import allusers from '../controllers/allusers.controller.js';
import  deletefunc  from '../controllers/deleteuser.controller.js';
import updatefunc from '../controllers/update.controller.js';
import { authsignupaction } from '../controllers/authsignup.controller.js';
const router = Router();

// const func = (req, res, next)=>{
//     console.log("Middleware");
//     next();
// }

router.route("/signup").post(signupaction);
router.route("/verifyOTP").post(otpVerify)
router.route("/admins").get(async(req, res, next)=>{
    const users = await allusers();
    res.status(200).json({
        data: users,
    })
});
router.route("/deleteuser").post(deletefunc)
router.route("/update").post(updatefunc)
router.route("/usernumber").get(async(req, res, next)=>{
    const users = await allusers()
    res.status(200).json({
        number: users.length
    })
})
router.route('/authsignup').post(authsignupaction)
export default router;
import {Router} from 'express'
import { signupaction } from '../controllers/signup.controller.js';
import { otpVerify } from '../controllers/verifyOTP.controller.js';
import allusers from '../controllers/allusers.controller.js';
import  deletefunc  from '../controllers/deleteuser.controller.js';
import updatefunc from '../controllers/update.controller.js';
import { authsignupaction } from '../controllers/authsignup.controller.js';
import sendUsers from '../controllers/sendUsers.controller.js';
import userInformation from '../controllers/moreuserInformation.controller.js';
import removeCourse from '../controllers/removeCourse.controller.js';
const router = Router();

router.route("/signup").post(signupaction);
router.route("/verifyOTP").post(otpVerify)
router.route("/deleteuser").post(deletefunc)
router.route("/update").post(updatefunc)
router.route('/authsignup').post(authsignupaction)
router.route('/moreInformation').post(userInformation)
router.route('/removeCourse').post(removeCourse);

router.route("/usernumber").get(async(req, res)=>{
    const users = await allusers()
    res.status(200).json({
        number: users.length
    })
})
router.route("/admins").post(sendUsers);
export default router;
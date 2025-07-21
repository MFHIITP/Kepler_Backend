import { Request, Response } from "express";
import { otpStore } from "../index.js"
import { sendRegistrationEmail } from "../utils/mailsend.utils.js";
import dotenv from 'dotenv'
dotenv.config()

const otpVerify = async(req: Request, res: Response)=>{
    const data = otpStore[0].data; 
    if(req.body.otp == otpStore[0].otp && Date.now() < otpStore[0].expiresAt){
        delete otpStore[0];
        await data.save();
        await sendRegistrationEmail(
            process.env.GMAIL_USER,
            data.email,
            "Kepler",
            "<div>Welcome to Kepler 22B. Wish you a very happy time at Kepler 22B.</div><br><div>Regards,</div><div>Farshid Hossain</div><div>Co-Founder</div>"
        )
        res.status(200).send("OK")
    }
    else{
        delete otpStore[0];
        res.status(400).send("NOT OK")
    }
}

export {otpVerify}
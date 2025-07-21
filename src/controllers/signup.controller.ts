import crypto from 'crypto'
import { collection } from '../models/collection.model.js';
import { sendRegistrationEmail } from '../utils/mailsend.utils.js';
import { otpStore } from '../index.js';
import dotenv from 'dotenv'
import { Request, Response } from 'express';
dotenv.config()

const generateReferralCode = (email: string) => {
  const secret = 'your-secure-secret-key'; // Replace with your own secret key
  const hash = crypto
    .createHmac('sha256', secret)
    .update(email)
    .digest('hex');

  return hash.substring(0, 8).toUpperCase(); // Return first 8 characters in uppercase
};

const signupaction = async (req: Request, res: Response) => {
  console.log(req.body.name + " came here");
  let message = "";
  const data = new collection(req.body);
  data.refercode = generateReferralCode(data.email)
  data.isvalid = 1
  data.usenumber = 5
  const mail = await collection.find({ email: req.body.email });
  if (mail.length == 0) {
    const otp = crypto.randomInt(100000, 999999).toString();
    otpStore[0] = {
      otp: otp,
      expiresAt: Date.now() + 300000,
      data: data 
    }
    await sendRegistrationEmail(
      process.env.GMAIL_USER,
      req.body.email,
      "Kepler -- OTP Verification",
      `Your One Time Password is ${otp}`
    )
    res.status(200).send("OK");
  } else {
    res.status(400).send("Not OK");
  }
};

export { signupaction };

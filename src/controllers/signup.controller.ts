import crypto from 'crypto'
import { collection } from '../models/collection.model.js';
import { sendRegistrationEmail } from '../utils/mailsend.utils.js';
import { redis } from '../index.js';
import dotenv from 'dotenv'
import { Request, Response } from 'express';
dotenv.config()

const generateReferralCode = (email: string) => {
  const secret = process.env.HASH_SECRET!; 
  const hash = crypto
    .createHmac('sha256', secret)
    .update(email)
    .digest('hex');

  return hash.substring(0, 8).toUpperCase(); // Return first 8 characters in uppercase
};

const signupaction = async (req: Request, res: Response) => {
  console.log(req.body.name + " came here");
  const data = req.body;
  data.refercode = generateReferralCode(data.email)
  data.isvalid = 1
  data.usenumber = 5
  const mail = await collection.find({ email: req.body.email });
  if (mail.length == 0) {
    const otp = crypto.randomInt(100000, 999999).toString();
    await redis.set(`otp${req.body.email}`, otp, 'EX', 300);
    await redis.set(`userDetails${req.body.email}`, JSON.stringify(data), 'EX', 300);
    await sendRegistrationEmail(
      process.env.GMAIL_USER ?? "",
      req.body.email,
      "Kepler -- OTP Verification",
      `Your One Time Password is ${otp}`
    )
    res.status(200).send("OK");
  } else {
    res.status(400).send("Already Registered");
  }
};

export { signupaction };

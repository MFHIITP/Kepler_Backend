import crypto from 'crypto'
import { collection } from '../models/collection.model.js';
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

const authsignupaction = async (req: Request, res: Response) => {
  console.log(req.body.name + " came here");
  let message = "";
  const data = new collection(req.body);
  data.refercode = generateReferralCode(data.email)
  data.isvalid = 1
  data.usenumber = 5
  const mail = await collection.find({ email: req.body.email });
  if (mail.length == 0) {
    await data.save();
    res.status(200).send("OK");
  } else {
    res.status(400).send("Not OK");
  }
};

export { authsignupaction };

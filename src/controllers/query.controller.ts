import { Request, Response } from "express";
import { sendRegistrationEmail } from "../utils/mailsend.utils.js";

const SendQuery = async (req: Request, res: Response) => {
  await sendRegistrationEmail(req.body.email, "kepler.xxiib.cygnus@gmail.com", req.body.subject, `${req.body.name} <br> ${req.body.message}`);
  res.status(200).send("Sent");
};

export {SendQuery}
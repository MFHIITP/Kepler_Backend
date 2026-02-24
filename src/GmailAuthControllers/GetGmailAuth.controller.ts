import { Request, Response } from "express";
import { OAuth2Client } from "../index.js";

const getGmailAuthCode = async(req: Request, res: Response) => {
    const SCOPES = ['https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/userinfo.email', 'openid'];
    const authURL = OAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: "consent"
    })
    res.send(`<a href = "${authURL}" target = "_blank">${authURL}</a>`);
}

export default getGmailAuthCode;
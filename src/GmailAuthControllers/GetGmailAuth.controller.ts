import { Request, Response } from "express";
import { OAuth2Client } from "../index";

const getGmailAuthCode = async(req: Request, res: Response) => {
    const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
    const authURL = OAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    })
    res.send(`<a href = "${authURL}" target = "_blank">${authURL}</a>`);
}

export default getGmailAuthCode;
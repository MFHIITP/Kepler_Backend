import { Request, Response } from "express";
import { OAuth2Client_GoogleGroups } from "../index.js";

const getGoogleGroupAuthCode = async(req: Request, res: Response) => {
    const scopes = [
        "https://www.googleapis.com/auth/admin.directory.group",
        "https://www.googleapis.com/auth/admin.directory.group.member",
        "https://www.googleapis.com/auth/drive.readonly",
        "https://www.googleapis.com/auth/spreadsheets.readonly"
    ];
    const authURL = OAuth2Client_GoogleGroups.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: scopes
    });
    res.send(`<a href = "${authURL}" target = "_blank">${authURL}</a>`);
}

export default getGoogleGroupAuthCode;
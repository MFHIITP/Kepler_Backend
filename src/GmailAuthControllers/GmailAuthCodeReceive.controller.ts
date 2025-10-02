import { Request, Response } from "express";
import { OAuth2Client } from "../index";

const gmailAuthTokenReceiver = async(req: Request, res: Response) => {
    const code = req.query.code
    if(!code){
        res.send("No code received");
        return;
    }
    try {
        const { tokens } = await OAuth2Client.getToken(code);
        console.log("Tokens received ", tokens);
        res.send(`
            <h3>Tokens Received</h3>
            <p>Access Token: ${tokens.access_token}</p>
            <p>Refresh Token: ${tokens.refresh_token}</p>
        `);
    }
    catch(err) {
        console.log(err);
        res.send("Error receiving tokens");
    }
}

export default gmailAuthTokenReceiver;
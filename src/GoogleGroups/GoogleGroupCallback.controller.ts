import { Request, Response } from "express";
import { OAuth2Client_GoogleGroups } from "../index.js";
import { google } from "googleapis";

const getGoogleGroupRefreshToken = async(req: Request, res: Response) => {
    const { code } = req.query;
    if(!code){
        res.send("No Code Found");
        return;
    }

    const { tokens } = await OAuth2Client_GoogleGroups.getToken(code);
    
    OAuth2Client_GoogleGroups.setCredentials(tokens);

    const oauth2 = google.oauth2({
        auth: OAuth2Client_GoogleGroups,
        version: "v2"
    });

    // const userInfo = await oauth2.userinfo.get();

    // if(userInfo.data.email != "hossainfarshid@gmail.com" && userInfo.data.email != "kepler.xxiib.cygnus@gmail.com" && userInfo.data.email != "kepler@keplercodes.com" && userInfo.data.email != "farshidhossain@keplercodes.com"){
    //     res.status(401).json({
    //         message: "UnAuthorized"
    //     })
    //     return;
    // }

    console.log("Tokens received ", tokens);
    res.send(`
        <h3>Tokens Received</h3>
        <p>Access Token: ${tokens.access_token}</p>
        <p>Refresh Token: ${tokens.refresh_token}</p>
    `);
}

export default getGoogleGroupRefreshToken;
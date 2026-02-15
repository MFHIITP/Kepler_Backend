import { Request, Response } from "express";
import { adminSecretCodes, executive_emails } from "../../local_dbs.js";

const checkAdminAccess = (req: Request, res: Response) => {
    const {email, secretCode} = req.body;
    if(!executive_emails.includes(email)){
        res.status(403).json({
            message: "Unauthorized Access"
        });
        return;
    }
    const adminJSON = adminSecretCodes.find(admin => admin.email == email);
    const adminSecretCode = adminJSON?.secretCode;
    if(adminSecretCode != secretCode){
        res.status(403).json({
            message: "Unauthorized Access"
        });
        return;
    }
    res.status(200).json({
        message: "Admin access granted"
    })
}
export default checkAdminAccess;
import { Request, Response } from "express";
import { adminSecretCodes, executive_emails } from "../../local_dbs.js";
import { collection } from "../../models/collection.model.js";

const checkAdminAccess = async (req: Request, res: Response) => {
    let {email, secretCode, referCode} = req.body;

    if(!email){
        const user = await collection.findOne({refercode: referCode});
        if(user){
            email = user.email;
        }
    }

    if(!executive_emails.includes(email)){
        res.status(402).json({
            message: "Unauthorized Access"
        });
        return;
    }
    const adminJSON = adminSecretCodes.find(admin => admin.email == email);
    const adminSecretCode = adminJSON?.secretCode;
    if(adminSecretCode != secretCode){
        res.status(402).json({
            message: "Unauthorized Access"
        });
        return;
    }
    res.status(200).json({
        message: "Admin access granted"
    })
}
export default checkAdminAccess;
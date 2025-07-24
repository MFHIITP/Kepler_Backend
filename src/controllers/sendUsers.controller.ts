import { Request, RequestHandler, Response } from "express";
import { executive_emails } from "../local_dbs";
import { collection } from "../models/collection.model";

const sendUsers: RequestHandler = async(req: Request, res: Response) => {
    const email = req.body.email;
    if(!executive_emails.includes(email)){
        res.status(403).send("Not an admin. InEligible to access this feature")
        return;
    }
    const allUsers = await collection.find().sort({name: 1});
    res.status(200).json({allUsers})
}
export default sendUsers;
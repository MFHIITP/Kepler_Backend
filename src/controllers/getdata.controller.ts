import { Request, Response } from "express";
import talkcollection from "../models/talkcollection.model.js"

const getdata = async(req: Request, res: Response) => {
    const groupName = req.body.groupName;
    if(groupName == null){
        res.status(403).send("Invalid Group Name")
        return;
    }
    const data = await talkcollection.find({group_name: groupName}).sort({_id: 1});
    res.status(200).json(data);
}
export {getdata}
import { Request, Response } from "express";
import talkcollection from "../models/talkcollection.model.js"

const getdata = async(req: Request, res: Response) => {
    const groupNumber = req.body.groupNumber;
    const groupName = req.body.groupName;
    if(groupNumber == -1){
        return res.status(202).json({
            message: "Invalid group number"
        })
    }
    const data = await talkcollection.find({groupName: groupName, group_id: groupNumber});
    res.status(200).json(data);
}
export {getdata}
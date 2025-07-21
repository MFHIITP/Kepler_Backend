import { collection } from "../../models/collection.model.js";
import { executive_names } from "../../local_dbs.js";
import { Request, Response } from "express";

const participant_list = async(req: Request, res: Response)=>{
    const data = await collection.find({visible_groups: req.body.groupname})
    const newdata = data.map((item)=>(item.name))
    executive_names.forEach((name)=>{
        if(!newdata.includes(name)){
            newdata.unshift(name)
        }
    })
    res.status(200).json({
        participant_list: newdata
    })
}

export default participant_list;
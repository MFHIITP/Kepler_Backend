import { Request, Response } from 'express';
import { grouplist } from '../../local_dbs.js';

const addnumber = async(req: Request, res: Response)=>{
    const newid = req.body.id_num;
    const newname = req.body.name;
    const existing_item = grouplist.find((num)=>num.name == newname)
    if(existing_item) { 
        existing_item.visibility = 'none'
    }
    else{
        grouplist.push({
            id: newid,
            name: newname
        })
    }
    res.status(200).send("Done")
}

export default addnumber
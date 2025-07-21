import { Request, Response } from 'express';
import { grouplist } from '../../local_dbs.js';

const removenumber = async(req: Request, res: Response)=>{
    var removedata = req.body.id_num;
    const index = grouplist.findIndex(item => item.id == removedata)
    grouplist[index].visibility = 'hidden'
    res.status(200).send("Done")
}

export default removenumber
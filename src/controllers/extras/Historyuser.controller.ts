import { Request, Response } from "express";
import historyschema from "../../models/History.model.js";

const historyuser = async(req: Request, res: Response)=>{
    const data = await historyschema.find({});
    res.status(200).send(data);
}
export default historyuser;
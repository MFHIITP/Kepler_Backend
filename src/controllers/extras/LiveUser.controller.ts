import { Request, Response } from "express";
import tokenschema from "../../models/Token.model.js";

const liveuser = async(req: Request, res: Response)=>{
    const data = await tokenschema.find({});
    res.status(200).send(data)
}
export default liveuser
import { Request, Response } from "express";
import { collection } from "../models/collection.model.js";

const deletefunc = async(req: Request, res: Response)=>{
    console.log(req.body.id)
    await collection.deleteOne({email: req.body.id});
    res.status(200).send("Deleted");
}

export default deletefunc;

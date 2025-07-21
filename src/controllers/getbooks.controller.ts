import { Request, Response } from "express";
import librarycollection from "../models/library.model.js";

const getbooks = async(req: Request, res: Response)=>{
    const course = req.body.course
    const data = await librarycollection.find({course: course});
    res.status(200).json(data);
}

export default getbooks; 
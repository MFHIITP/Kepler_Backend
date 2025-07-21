import { Request, Response } from "express";
import librarycollection from "../models/library.model.js";

const addbooks = async(req: Request, res: Response)=>{
    console.log("Came to add books in the library")
    const data = new librarycollection(req.body);
    data.save();
    res.status(200).send("OK");
}

export default addbooks; 
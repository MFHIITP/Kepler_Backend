import { Request, Response } from "express";
import { codingModel } from "../models/coding.model";

const getCodingDetails = async(req: Request, res: Response) => {
    const emailId = req.body.email;
    const codingData = await codingModel.find({email: emailId});
    res.status(200).json(codingData[0]);
}
export default getCodingDetails
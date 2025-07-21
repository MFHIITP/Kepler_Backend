import { Request, Response } from "express";

const imagestore = async(req: Request, res: Response)=>{
    res.status(200).json({url: req.file?.path});
}
export {imagestore};
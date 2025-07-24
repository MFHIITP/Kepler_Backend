import { Request, Response } from "express";
import { collection } from "../models/collection.model.js";
import { admittedCoursesModel } from "../models/admittedCourses.model.js";

const deletefunc = async(req: Request, res: Response)=>{
    const emailId = req.body.email;
    await collection.deleteOne({email: emailId});
    await admittedCoursesModel.deleteOne({email: emailId});
    res.status(200).send("Deleted");
}

export default deletefunc;

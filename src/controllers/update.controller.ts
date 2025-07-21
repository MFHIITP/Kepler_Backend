import { Request, Response } from "express";
import { collection } from "../models/collection.model.js";

const updatefunc = async(req: Request, res: Response)=>{
    await collection.updateOne({email: req.body.email}, {$set: {[req.body.old] : req.body.name}});
    const mail = await collection.find({email: req.body.email});
    const profiles = {
        name: mail[0].name,
        email: mail[0].email,
        password: mail[0].password,
        phone: mail[0].phone,
        refercode: mail[0].refercode,
        isvalid: mail[0].isvalid,
        usenumber: mail[0].usenumber,
        college: mail[0].college,
        school: mail[0].school,
        college_year: mail[0].college_year,
        school_year: mail[0].school_year,
        college_stream: mail[0].college_stream
    }
    res.status(200).json({
        message: "OK",
        profileinfo: profiles
    });
}
export default updatefunc;
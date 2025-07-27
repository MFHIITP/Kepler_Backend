import { executive_names } from "../../local_dbs.js";
import { Request, Response } from "express";
import { admittedCoursesModel } from "../../models/admittedCourses.model.js";

const participant_list = async(req: Request, res: Response)=>{
    const groupName = req.body.groupName;
    const data = await admittedCoursesModel.find({admittedCourses: {$elemMatch: {name: groupName}}}, {name: 1, _id: 0});
    console.log(data);
    const names = data.map(d => d.name);
    
    executive_names.forEach((name) => {
        if(!names.includes(name)){
            names.unshift(name);
        }
    })
    res.status(200).json({
        participant_list: names
    })
}

export default participant_list;
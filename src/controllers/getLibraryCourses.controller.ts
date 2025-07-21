import { Request, Response } from "express";
import { core_emails, executive_emails, grouplist, teacher_emails } from "../local_dbs.js";
import { admittedCoursesModel } from "../models/admittedCourses.model.js";

const courseList = async(req: Request, res: Response)=>{
    try{
        const emailId = req.body.emailId;
        let newList = grouplist.sort((a, b)=>{return a.id - b.id;}).map(val => val.name)
        if(executive_emails.includes(emailId) || core_emails.includes(emailId) || teacher_emails.includes(emailId)){
            return res.status(200).json({
                data: newList
            })
        }
        const userCourseList = await admittedCoursesModel.findOne({email: emailId});
        const courseListDetails = userCourseList?.admittedCourses || []
        courseListDetails.sort((a, b) => (a.id - b.id))
        res.status(200).json({
            data: courseListDetails
        })
    }
    catch(err){
        res.status(500).json({
            message: 'Could not find details'
        })
    }
}

export default courseList
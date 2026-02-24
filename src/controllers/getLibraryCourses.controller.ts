import { Request, Response } from "express";
import { core_emails, executive_emails, grouplist, teacher_emails } from "../local_dbs.js";
import { admittedCoursesModel } from "../models/admittedCourses.model.js";

interface group {
    name: string,
    visibility: string,
    description: string
}

const courseList = async(req: Request, res: Response)=>{
    try{
        const emailId = req.body.emailId;
        let newList = grouplist.sort((a: group, b: group) => a.name.localeCompare(b.name)).map(val => val.name)

        const data = await admittedCoursesModel.findOne({email: emailId});
        const groups = data?.admittedCourses.map((val) => val.name) || []
        
        if(!executive_emails.includes(emailId) && !core_emails.includes(emailId) && !teacher_emails.includes(emailId)){
            newList = newList.filter((group_name) => groups.includes(group_name) || group_name == 'Community Group')
        }
        if(!executive_emails.includes(emailId)){
            newList = newList.filter((group_name) => group_name !== 'Executive Group')
        }

        if(groups.includes("Computer Science - Placements Made Easier")){
            newList = newList.filter((group_name) => group_name !== 'Placements Made Easier' && group_name !== "Computer Science - Artificial Intelligence: Explore the Future")
        }
        
        if (groups.includes("Computer Science - Placements Made Easier")) {
            newList = grouplist.filter(group => group.course == true).map((val: group) => val.name).filter((group_name) =>
                group_name !== "Computer Science - Artificial Intelligence: Explore the Future" &&
                group_name !== "Computer Science - Placements Made Easier"
            );
        }

        res.status(200).json({
            data: newList
        })
    }
    catch(err){
        res.status(500).json({
            message: 'Could not find details'
        })
    }
}

export default courseList
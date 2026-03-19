import { Request, Response } from "express";
import { dsa_teachers, executive_emails, fundamentals_teachers, grouplist, ml_teachers, webdev_teachers } from "../local_dbs.js";
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

        if(ml_teachers.includes(emailId)){
            newList = newList.filter(group => group == "Community Group" || group == "All Teachers" || group == "Computer Science - Artificial Intelligence: Explore the Future");
        }
        else if(webdev_teachers.includes(emailId)){
            newList = newList.filter(group => group == "Community Group" || group == "All Teachers" || group == "Computer Science - Development Crash Course: Projects Made Easier");
        }
        else if(fundamentals_teachers.includes(emailId)){
            newList = newList.filter(group => group == "Community Group" || group == "All Teachers" || group == "Computer Science - Fundamentals Course: Crack GATE With Ease");
        }
        else if(dsa_teachers.includes(emailId)){
            newList = newList.filter(group => group == "Community Group" || group == "All Teachers" || group == "Computer Science - DSA for Placement and Contests");
        }

        else{
            const data = await admittedCoursesModel.findOne({email: emailId});
            const groups = data?.admittedCourses.map((val) => val.name) || []
            
            if(!executive_emails.includes(emailId)){
                newList = newList.filter((group_name) => groups.includes(group_name) || group_name == 'Community Group')
            }
            if(!executive_emails.includes(emailId)){
                newList = newList.filter((group_name) => group_name !== 'Executive Group')
            }
            if (groups.includes("Computer Science - Placements Made Easier")) {
                newList = grouplist.filter(group => group.course == true).map((val: group) => val.name).filter((group_name) =>
                    group_name !== "Computer Science - Placements Made Easier"
                );
            }
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
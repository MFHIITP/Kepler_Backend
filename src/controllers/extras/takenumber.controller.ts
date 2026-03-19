import { Request, Response } from 'express';
import { dsa_teachers, fundamentals_teachers, grouplist, ml_teachers, webdev_teachers } from '../../local_dbs.js';
import { executive_emails } from '../../local_dbs.js';
import { admittedCoursesModel } from '../../models/admittedCourses.model.js';

interface group {
    name: string,
    visibility: string,
    description: string
}

const takeNumber = async(req: Request, res: Response)=>{
    let newList = grouplist.sort((a: group, b: group) => a.name.localeCompare(b.name));

    const email: string = req.body.email;

    if(ml_teachers.includes(email)){
        newList = grouplist.filter(group => group.name == "Community Group" || group.name == "All Teachers" || group.name == "Computer Science - Artificial Intelligence: Explore the Future");
    }
    else if(webdev_teachers.includes(email)){
        newList = grouplist.filter(group => group.name == "Community Group" || group.name == "All Teachers" || group.name == "Computer Science - Development Crash Course: Projects Made Easier");
    }
    else if(fundamentals_teachers.includes(email)){
        newList = grouplist.filter(group => group.name == "Community Group" || group.name == "All Teachers" || group.name == "Computer Science - Fundamentals Course: Crack GATE With Ease");
    }
    else if(dsa_teachers.includes(email)){
        newList = grouplist.filter(group => group.name == "Community Group" || group.name == "All Teachers" || group.name == "Computer Science - DSA for Placement and Contests");
    }
    
    else{
        const data = await admittedCoursesModel.findOne({email: email})
        const groups = data?.admittedCourses.map((val) => val.name) || []
        if(!executive_emails.includes(email)){
            newList = newList.filter((group) => group.name == "Community Group" ? true : groups.includes(group.name) && group.visibility == 'none');
        }
        if(!executive_emails.includes(email)){
            newList = newList.filter((group_name) => group_name.name !== 'Executive Group')
        }
        if (groups.includes("Computer Science - Placements Made Easier")) {
            newList = grouplist.filter(group => group.course == true).filter((group_name) =>
                group_name.name !== "Computer Science - Placements Made Easier"
            );
        }
    }
    res.status(200).json({
        list: newList
    })
}

export default takeNumber 
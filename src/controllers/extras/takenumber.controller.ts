import { Request, Response } from 'express';
import { grouplist } from '../../local_dbs.js';
import { executive_emails } from '../../local_dbs.js';
import { core_emails } from '../../local_dbs.js';
import { teacher_emails } from '../../local_dbs.js';
import { admittedCoursesModel } from '../../models/admittedCourses.model.js';

interface group {
    name: string,
    visibility: string,
    description: string
}

const takeNumber = async(req: Request, res: Response)=>{
    let newList = grouplist.sort((a: group, b: group) => a.name.localeCompare(b.name));

    const email: string = req.body.email;
    
    const data = await admittedCoursesModel.findOne({email: email})
    const groups = data?.admittedCourses.map((val) => val.name) || []
    if(!executive_emails.includes(email) && !core_emails.includes(email) && !teacher_emails.includes(email)){
        newList = newList.filter((group) => group.name == "Community Group" ? true : groups.includes(group.name) && group.visibility == 'none');
    }
    if(!executive_emails.includes(email)){
        newList = newList.filter((group_name) => group_name.name !== 'Executive Group')
    }
    res.status(200).json({
        list: newList
    })
}

export default takeNumber 
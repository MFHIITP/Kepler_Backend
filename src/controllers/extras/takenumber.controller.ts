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
    let newlist = grouplist.sort((a: group, b: group) => a.name.localeCompare(b.name));

    const email: string = req.body.email;
    
    const data = await admittedCoursesModel.findOne({email: email})
    const groups = data?.admittedCourses.map((val) => val.name) || []
    if(!executive_emails.includes(email) && !core_emails.includes(email) && !teacher_emails.includes(email)){
        newlist = newlist.filter((group_name)=> (groups.includes(group_name.name) && group_name.visibility == 'none') || group_name.name == 'Community Group')
    }
    if(!executive_emails.includes(email)){
        newlist = newlist.filter((group_name) => group_name.name !== 'Executive Group')
    }

    console.log(newlist);
    res.status(200).json({
        list: newlist
    })
}

export default takeNumber 
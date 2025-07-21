import { Request, Response } from 'express';
import { grouplist } from '../../local_dbs.js';
import { executive_emails } from '../../local_dbs.js';
import { core_emails } from '../../local_dbs.js';
import { teacher_emails } from '../../local_dbs.js';
import { admittedCoursesModel } from '../../models/admittedCourses.model.js';

const takenumber = async(req: Request, res: Response)=>{
    let newlist = grouplist.sort((a, b) => (a.id - b.id))
    const email = req.body.email
    const data = await admittedCoursesModel.findOne({email: email})
    const visible_groups = data.admittedCourses || []
    console.log(visible_groups);
    if(!executive_emails.includes(email) && !core_emails.includes(email) && !teacher_emails.includes(email)){
        newlist = newlist.filter((group_name)=>visible_groups.includes(group_name.name))
    }
    console.log(newlist);
    res.status(200).json({
        list: newlist
    })
}

export default takenumber 
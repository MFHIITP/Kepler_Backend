import { Request, Response } from 'express';
import {TeamMembersCollection} from '../../models/teamMembers.model.js'
import { executive_emails } from '../../local_dbs.js';

const addPerson = async(req: Request, res: Response)=>{
    const emailId = req.body.emailId;
    if(!executive_emails.includes(emailId)){
        res.status(403).send("Not an Admin")
        return;
    }
    const prevdata = await TeamMembersCollection.find({email_id: emailId});
    if(prevdata.length > 0){
        res.status(400).send("Already Exists");
    }
    const data = new TeamMembersCollection(req.body);
    await data.save();
    res.status(200).send("Done");
}

export default addPerson;
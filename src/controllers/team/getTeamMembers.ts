import { Request, Response } from 'express';
import {TeamMembersCollection} from '../../models/teamMembers.model.js'

const getData = async(req: Request, res: Response)=>{
    const teamName = req.params.teamName;
    const data = await TeamMembersCollection.find({teamName: teamName});
    const priorityOrder = [
        "Team Convenor",
        "Assistant Convenor",
        "Coordinator",
    ];
    data.sort((a, b) => priorityOrder.indexOf(a.position) - priorityOrder.indexOf(b.position))
    res.status(200).send(data);
}

export default getData; 
import { Request, Response } from 'express';
import pool from "../../utils/postgresConnection.utils.js";
import { executive_emails } from '../../local_dbs.js';
import checkTableExists from '../../postgresModels/checkTableExists.postgres.js';

const addPerson = async(req: Request, res: Response)=>{
    const email = req.body.email;
    if(!executive_emails.includes(email)){
        res.status(403).send("Not an Admin")
        return;
    }
    const {teamName, position, name, emailId, phoneNumber, degree, linkedIn, description} = req.body;
    if(!teamName || !position || !name || !emailId || !phoneNumber || !degree){
        res.status(400).send("All fields are required");
        return;
    }
    try {
        if(await checkTableExists('members') == false){
            await import("../../postgresModels/MembersSchema/CreateMembersSchema.postgres.js")
        }
        const query = `INSERT INTO members (teamName, position, name, emailId, phoneNumber, degree, linkedIn, description) VALUES (ARRAY[$1], $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (emailId) DO
        UPDATE 
        SET teamName = array_append(members.teamName, $1)
        WHERE members.emailId = $4 AND NOT $1 = ANY(members.teamName);`;
        const response = await pool.query(query, [teamName, position, name, emailId, phoneNumber, degree, linkedIn, description]);
        if(response.rowCount == 0){
            res.status(500).send("Failed to add person");
            return;
        }
        res.status(200).send("Added Person successfully");
    }
    catch (error) {
        console.error("Error adding person", error);
        res.status(500).send("Error occurred while adding person");
        return;
    }
}

export default addPerson;
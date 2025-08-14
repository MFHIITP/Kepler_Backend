import { Request, Response } from "express";
import pool from "../../utils/postgresConnection.utils.js";
import { executive_emails } from "../../local_dbs";

const deletePerson = async (req: Request, res: Response) => {
    const email = req.body.email;
    if (!executive_emails.includes(email)) {
        res.status(403).send("Not an Admin");
        return;
    }
    try {
        const teamName = req.body.teamName;
        const emailId = req.body.memberEmail;
        if(!teamName || !emailId){
            res.status(400).send("All fields are required");
            return;
        }
        const query = `UPDATE members
        SET teamName = array_remove(members.teamName, $1)
        WHERE members.emailId = $2 AND $1 = ANY(members.teamName);`;
        await pool.query(query, [teamName, emailId]);

        const deletionQuery = `DELETE FROM members
        WHERE emailId = $1 AND array_length(members.teamName, 1) IS NULL;`;
        await pool.query(deletionQuery, [emailId]);
        
        res.status(200).send("Person Deleted Successfully");
    }
    catch(error) {
        res.status(500).send("Error occurred while deleting person");
        return;
    }
}
export default deletePerson;
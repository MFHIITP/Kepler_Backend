import { Request, Response } from 'express';
import pool from "../../utils/postgresConnection.utils.js";

const getData = async(req: Request, res: Response)=>{
    const teamName = req.params.teamName;
    if(!teamName){
        res.status(400).send("Team name is required")
        return;
    }
    try {
        const query = `SELECT * FROM members WHERE $1 = ANY(teamName)`;
        const response = await pool.query(query, [teamName]);
        if(response.rowCount === 0){
            res.status(404).send("No members found for this team");
            return;
        }
        const data = response.rows;
        const priorityOrder = [
            "Chief Executive Officer", 
            "Chief Product Officer",
            "Chief Technology Officer",
            "Chief Financial Officer",
            "Chief Marketing Officer",
            "Chief Operating Officer",
            "Chief Human Resources Officer",
            "General Manager",
        ];
        data.sort((a, b) => priorityOrder.indexOf(a.position) - priorityOrder.indexOf(b.position))
        res.status(200).send(data);
    }
    catch (error) {
        res.status(500).send("Error occurred while fetching team members");
        return;
    }
}

export default getData; 
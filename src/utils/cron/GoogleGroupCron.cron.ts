import { google } from "googleapis";
import cron from "node-cron";
import { OAuth2Client_GoogleGroups } from "../../index.js";
import pool from "../postgresConnection.utils.js";
import config from "../../config.js";

(async() => {
    cron.schedule("0 6 * * *", async() => {
        console.log("Running Google Group Cleanup job");

        OAuth2Client_GoogleGroups.setCredentials({
            refresh_token: config.GOOGLE_GROUP_REFRESH_TOKEN
        })

        const directory = google.admin({
            version: "directory_v1",
            auth: OAuth2Client_GoogleGroups
        });

        const query = `SELECT * FROM googlegroupsstudentslist WHERE expiry_date < CURRENT_DATE`;
        const result = await pool.query(query);

        for(const row of result.rows){
            try{
                await directory.members.delete({
                    groupKey: row.group_email,
                    memberKey: row.student_email
                })

                console.log(`Removed ${row.student_email} from ${row.group_email}`);

                const deleteQuery = `DELETE FROM googlegroupsstudentslist WHERE student_email = $1 AND group_email = $2`;
                await pool.query(deleteQuery, [row.student_email, row.group_email]);
            }
            catch(error){
                if ((error as any)?.code === 404) {
                    console.log("Student already removed from group");
                }
                else {
                    console.error("Error removing student:", error);
                }
            }   
        }
    })
})();
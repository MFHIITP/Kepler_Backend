import config from "../config.js"
import { OAuth2Client_GoogleGroups } from "../index.js"
import pool from "../utils/postgresConnection.utils.js"
import { MapCourseToGoogleGroup } from "./CourseToGroupMapping.js"
import { google } from "googleapis"

const addStudentToGoogleGroup = async({student_email, selectedCourses} : {student_email: string, selectedCourses: string[]}) => {
    OAuth2Client_GoogleGroups.setCredentials({
        refresh_token: config.GOOGLE_GROUP_REFRESH_TOKEN
    })
    const directory = google.admin({
        version: "directory_v1",
        auth: OAuth2Client_GoogleGroups
    })
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 60);
    for(const course of selectedCourses){
        try{
            const selectedCourseId = MapCourseToGoogleGroup.getCourseToGoogleGroup(course);
            if(!selectedCourseId){
                console.warn(`Course mapping not found for ${course}`);
                continue;
            }
            for(const courseId of selectedCourseId){
                const groupEmail = `keplercourse_${courseId}@keplercodes.com`;
                await directory.members.insert({
                    groupKey: groupEmail,
                    requestBody: {
                        email: student_email,
                        role: "MEMBER"
                    }
                });
                console.log(`${student_email} added to ${groupEmail}`)
                const findQuery =  `SELECT 1 FROM googlegroupsstudentslist WHERE student_email = $1 AND group_email = $2`;
                const findResponse = await pool.query(findQuery, [student_email, groupEmail]);
                if(findResponse.rowCount == 0){
                    const insertQuery = `INSERT INTO googlegroupsstudentslist (student_email, group_email, expiry_date) VALUES ($1, $2, $3)`;
                    await pool.query(insertQuery, [student_email, groupEmail, expiryDate]);
                }
                else{
                    const updateQuery = `UPDATE googlegroupsstudentslist SET expiry_date = $1 WHERE student_email = $2 AND group_email = $3`;
                    await pool.query(updateQuery, [expiryDate, student_email, groupEmail]);
                }
            }
        }
        catch(error) {
            if ((error as any)?.response?.data?.error?.message?.includes("Member already exists")) {
                console.log("Student Already in the Group");
            }
            else{
                console.error("Error in placing the student in the group", error);
            }
        }
    }
}

export default addStudentToGoogleGroup;
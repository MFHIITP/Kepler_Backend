import { Request, Response } from "express";
import { OAuth2Client_GoogleGroups } from "../index.js";
import config from "../config.js";
import { google } from "googleapis";

const getCourseSyllabus = async(req: Request, res: Response) => {
    const { examName } = req.body;

    OAuth2Client_GoogleGroups.setCredentials({
        refresh_token: config.GOOGLE_GROUP_REFRESH_TOKEN
    });

    const sheets = google.sheets({
        version: 'v4',
        auth: OAuth2Client_GoogleGroups
    });

    const SPREADSHEET_ID = config.GOOGLE_SPREADSHEET_ID;
    
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `syllabus!A2:B`
    });
    const rows = response.data.values || [];
    
    const responseData = rows.filter(row => row[0] === examName).map(row => row[1]);

    res.status(200).json({
        message: "Successfully got course syllabus",
        courseSyllabusData: responseData
    })
}

export default getCourseSyllabus;
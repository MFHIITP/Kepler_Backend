import { Request, Response } from "express";
import { google } from "googleapis";
import { OAuth2Client_GoogleGroups } from "../index.js";
import config from "../config.js";

const getCourseSchedule = async(req: Request, res: Response) => {

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
        range: `schedule!A2:H`
    });
    const rows = response.data.values || [];

    const responseData = rows.filter(row => row[0] === examName).map(row => ({
        ClassNo: Number(row[1]),
        month: row[2],
        day: row[3],
        title: row[4],
        type: row[5],
        date: row[6],
        time: row[7]
    }));
    
    res.status(200).json({
        courseScheduleData: responseData,
        message: "Schedule fetched syccessfully"
    })
}

export default getCourseSchedule;
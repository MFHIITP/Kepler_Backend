import { Request, Response } from "express";
import { admittedCoursesModel } from "../models/admittedCourses.model.js";
import { grouplist } from "../local_dbs.js";
import { google } from "googleapis";
import { OAuth2Client_GoogleGroups } from "../index.js";
import config from "../config.js";

const folderMapping: Record<string, string> = {
  webdev: "13W_I7sBmtSyOjllWTM-ODT4Nb05GD0zS",
  dsa: "1jBq5q0BEy4SsZO5Hi0_m1H5R8zXhx6t6",
  fundamentals: "1F-KIUZwWPUt_rY85s8qNUkcHOD7To7aj",
  ml: "1stS_JtBZqZLPZfm9OErlHNmfrYWQ8yJW",
};

const getPlayListVideos = async (req: Request, res: Response) => {
  try {
    const { emailId, examName } = req.body;

    const userDetails = await admittedCoursesModel.findOne({
      email: emailId,
    });

    if (!userDetails) {
      res.status(405).json({
        message: "User has not purchased any course",
      });
      return;
    }

    const admittedCourses = userDetails.admittedCourses;

    if (!admittedCourses || admittedCourses.length === 0) {
      res.status(405).json({
        message: "User has not purchased any courses",
      });
      return;
    }

    const courseFullName = grouplist.find((data) => data.exam === examName)?.name;

    if (!courseFullName) {
      res.status(406).json({
        message: "Invalid Exam Name",
      });
      return;
    }

    const courseNames = admittedCourses.map((course) => course.name);

    let hasAccess = false;

    if (courseNames.includes("Computer Science - Placements Made Easier") && ["fundamentals", "webdev", "dsa", "ml"].includes(examName)) {
      hasAccess = true;
    } 
    else if (courseNames.includes(courseFullName)) {
      hasAccess = true;
    }

    if (!hasAccess) {
      res.status(400).json({
        message: "User have not purchased this course",
      });
      return;
    }

    const folderId = folderMapping[examName];

    if (!folderId) {
      res.status(400).json({
        message: "No folder mapped for this course",
      });
      return;
    }

   OAuth2Client_GoogleGroups.setCredentials({
      refresh_token: config.GOOGLE_GROUP_REFRESH_TOKEN,
    });

    const drive = google.drive({
      version: "v3",
      auth: OAuth2Client_GoogleGroups,
    });

    const driveRes = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'video/' and trashed = false`,
      fields: "files(id,name,mimeType,createdTime,webViewLink,thumbnailLink)",
      orderBy: "createdTime",
      pageSize: 1000,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });

    const files = driveRes.data.files || [];

    const playList = files.map((file, index) => ({
      id: file.id ?? "",
      name: file.name ?? "",
      link: `https://drive.google.com/file/d/${file.id}/preview`,
      image: file.thumbnailLink ?? null,
      serial: index + 1,
      type: "drive"
    }));

    res.status(200).json({
      playlist: playList,
      message: "Playlist fetched successfully",
    });
  } 
  catch (error) {
    console.error("Error fetching playlist:", error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export default getPlayListVideos;
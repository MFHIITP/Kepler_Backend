import { collection } from "../models/collection.model.js";
import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../index.js";
import tokenschema from "../models/Token.model.js";
import historyschema from "../models/History.model.js";
import dotenv from "dotenv";
import axios from "axios";
import useragent from "useragent";
import { admittedCoursesModel } from "../models/admittedCourses.model.js";
import { Request, Response } from "express";
dotenv.config();

const authlogin = async (req: Request, res: Response) => {

  console.log("Árrived");

  const userdetails = useragent.parse(req.headers["user-agent"]);
  const ipRaw = req.headers["x-forwarded-for"];
  const ip = ipRaw?.split(",")[0].trim();
  const response = await axios.get(
    `https://ipinfo.io/${ip}/json?token=c13532365e8939`
  );

  const mail = await collection.find({ email: req.body.email });
  const courseDetails = await admittedCoursesModel.find({email: req.body.email})

  if (mail.length === 0) {
    res.status(400).json({
      message: "You have not registered before. Please register first.",
    });
  } else {
    const accessToken = jwt.sign(
      {
        type: "Access",
        email: mail[0].email,
        reference: (Math.random() * 99 + 1).toFixed(2),
      },
      JWT_ACCESS_SECRET ?? "",
      {
        expiresIn: "1h",
      }
    );
    const refreshToken = jwt.sign(
      {
        email: mail[0].email,
        type: "Refresh",
      },
      JWT_REFRESH_SECRET ?? "",
      {
        expiresIn: "3d",
      }
    );
    const tokenElement = new tokenschema({
      userId: mail[0]._id,
      email_id: mail[0].email,
      name: mail[0].name,
      token: accessToken,
      details: JSON.stringify({
        OperatingSystem: userdetails.os,
        Browser: userdetails.device,
        class: userdetails.family,
        patch: userdetails.patch,
        major: userdetails.major,
        minor: userdetails.minor,
      }),
      locations: JSON.stringify(response.data),
    });
    await tokenElement.save();

    const profiles = {
      name: mail[0].name,
      email: mail[0].email,
      password: mail[0].password,
      phone: mail[0].phone,
      refercode: mail[0].refercode,
      isvalid: mail[0].isvalid,
      usenumber: mail[0].usenumber,
      college: mail[0].college,
      school: mail[0].school,
      college_year: mail[0].college_year,
      school_year: mail[0].school_year,
      college_stream: mail[0].college_stream,
    };

    let sendAlert: boolean = false;
  let lastDate: string | null = null
  let courses: string[] = [];
  if(courseDetails.length > 0 && courseDetails[0].admittedCourses.length > 0){
    courseDetails[0].admittedCourses.forEach((val) => {
      const today = new Date();
      const upComingDate = val?.upcomingPaymentDate!;
      const endingDate = val?.lastDateToPay!;
      if((today.getDate() == upComingDate.getDate() && today.getMonth() == upComingDate.getMonth() && today.getFullYear() == upComingDate.getFullYear()) || (today.getDate() == endingDate.getDate() && today.getMonth() == endingDate.getMonth() && today.getFullYear() == endingDate.getFullYear())){
        sendAlert = true;
        lastDate = val?.lastDateToPay!.toISOString()!
        courses.push(val.name!);
      }
    })
  }

    res.status(200).cookie("TestCookie", accessToken, {
      domain: ".localhost",
    }).json({
      message: "OK",
      accessToken: accessToken,
      refreshToken: refreshToken,
      profileinfo: profiles,
      sendAlert: sendAlert,
      lastDate: lastDate,
      courses: courses
    });

    const prevElement = await historyschema.find({ email: mail[0].email });
    if (prevElement.length > 0) {
      await historyschema.updateOne(
        { email: mail[0].email },
        {
          $set: {
            logintime: Date.now(),
            status: "active",
            logouttime: null,
          },
        }
      );
    } else {
      const historyElement = new historyschema({
        userId: mail[0]._id,
        name: mail[0].name,
        email: mail[0].email,
        logintime: Date.now(),
        status: "active",
        details: JSON.stringify({
          OperatingSystem: userdetails.os,
          Browser: userdetails.device,
          class: userdetails.family,
          patch: userdetails.patch,
          major: userdetails.major,
          minor: userdetails.minor,
        }),
        locations: JSON.stringify(response.data),
      });
      await historyElement.save();
    }
  }
};

export default authlogin;

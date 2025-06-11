import { collection } from "../models/collection.model.js";
import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../index.js";
import tokenschema from "../models/Token.model.js";
import historyschema from "../models/History.model.js";
import dotenv from "dotenv";
import axios from "axios";
import useragent from "useragent";
dotenv.config();
const authlogin = async (req, res) => {
  console.log("Árrived");
  const userdetails = useragent.parse(req.headers["user-agent"]);
  const ip = req.headers["x-forwarded-for"];
  const response = await axios.get(
    `https://ipinfo.io/${ip}/json?token=c13532365e8939`
  );

  const mail = await collection.find({ email: req.body.email });
  if (mail.length === 0) {
    res.status(400).json({
      message: "You have not registered before. Please register first.",
    });
  } else {
    const accessToken = jwt.sign(
      {
        id: mail[0]._id,
        email: mail[0].email,
      },
      JWT_ACCESS_SECRET,
      {
        expiresIn: "10s",
      }
    );
    const refreshToken = jwt.sign(
      {
        email: mail[0].email,
        type: "Refresh",
      },
      JWT_REFRESH_SECRET,
      {
        expiresIn: "20s",
      }
    );
    const tokenelement = new tokenschema({
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
    await tokenelement.save();
    const prevelement = await historyschema.find({ email: mail[0].email });
    if (prevelement.length > 0) {
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
      const historyelement = new historyschema({
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
      await historyelement.save();
    }
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
    console.log("Sending");
    res
      .status(200)
      .cookie("TestCookie", accessToken, {
        domain: ".localhost",
      })
      .json({
        message: "OK",
        accessToken: accessToken,
        refreshToken: refreshToken,
        profileinfo: profiles,
      });
  }
};

export default authlogin;

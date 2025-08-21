import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { JWT_ACCESS_SECRET } from "..";
import { admittedCoursesModel } from "../models/admittedCourses.model";
import { executive_emails } from "../local_dbs";

const checkValidity = async(req: Request, res: Response, next: NextFunction) => {
    const fullAccessToken = req.headers['authorizationaccesstoken']
    const token = fullAccessToken?.split(' ')[1];
    const decode = jwt.verify(token, JWT_ACCESS_SECRET ?? "");
    const emailId = decode.email;

    const courseDetails = await admittedCoursesModel.find({email: emailId});

    if(executive_emails.includes(emailId)){
        next();
        return;
    }
    
    if(courseDetails.length == 0){
    //     if(req.path.endsWith(`/payment/applyCourses`) || req.path.endsWith(`/payment/getCurrentCourses`) || req.path.endsWith('/library/courses/getCourses')){
    //         next();
    //         return;
    //     }
    //     res.status(405).send("User did not purchase any course");
    //     return;
        next();
        return;
    }

    const admittedCourses = courseDetails[0]?.admittedCourses || [];

    const updatedCourses = admittedCourses.filter((course) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const lastDate = course?.lastDateToPay!;
        lastDate.setHours(0, 0, 0, 0)
        return today <= lastDate
    })

    if(updatedCourses.length != admittedCourses.length){
        courseDetails[0].admittedCourses = updatedCourses;
        await courseDetails[0].save()
    }

    next();
}

export default checkValidity;
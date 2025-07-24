import { Request, Response } from "express";
import { admittedCoursesModel } from "../models/admittedCourses.model";

const removeCourse = async(req: Request, res: Response) => {
    const email = req.body.email;
    const course = req.body.courseName;
    const userDetails = await admittedCoursesModel.findOne({email: email})
    if(!userDetails){
        res.status(403).send("No Such User");
        return;
    }

    console.log(userDetails)
    userDetails.admittedCourses = userDetails?.admittedCourses.filter((val) => val !== course);
    userDetails.selectedCourses = userDetails?.selectedCourses.filter((val) => val !== course);
    await userDetails.save();
    res.status(200).send("Course Removed Successfully")
}

export default removeCourse;
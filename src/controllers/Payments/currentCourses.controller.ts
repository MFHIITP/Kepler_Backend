import { Request, Response } from "express";
import { admittedCoursesModel } from "../../models/admittedCourses.model.js";
import { grouplist } from "../../local_dbs.js";

interface courseStructure {
  name: string;
  salutation: string;
  value: number;
}

const currentCoursesFetch = async (req: Request, res: Response) => {
  console.log(req.body);
  const email = req.body.email;

  try {
    const userData = await admittedCoursesModel.findOne({ email: email });
    const allPossibleCourses = grouplist?.filter(data => data.course == true).map(data => data.name) || []
    console.log(userData)
    const admittedCourses = userData?.admittedCourses || [];
    let selectedCourses: string[] = userData?.selectedCourses || [];

    let onGoingCourses: courseStructure[] = [];
    let currentCourses: string[] = [];
    let preventedCourses: string[] = [];

    admittedCourses.forEach((val) => {
      if (val?.name?.startsWith("Computer Science")) {
        currentCourses.push(val.name!);
      } 

      if(new Date() >= val?.upcomingPaymentDate! && new Date() <= val?.lastDateToPay!){
        if(!selectedCourses.includes(val.name!)){
          selectedCourses.push(val.name!);
        }
      }
      else if(new Date() < val?.upcomingPaymentDate!){
        preventedCourses.push(val.name!);
      }
    });

    selectedCourses.forEach((val) => {
      if (val.startsWith("Computer Science")) {
        onGoingCourses.push({ name: val, salutation: "INR", value: 1000 });
      }
    });

    res.status(201).json({
      admittedCourses: currentCourses,
      selectedCourses: onGoingCourses,
      preventedCourses: preventedCourses,
      allPossibleCourses: allPossibleCourses
    });
  } catch (err) {
    console.log(err);
    res.status(493).send("Failed to Send Courses");
  }
};

export default currentCoursesFetch;

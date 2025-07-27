import { Request, Response } from "express";
import { admittedCoursesModel } from "../../models/admittedCourses.model.js";

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
    console.log(userData)
    const admittedCourses = userData?.admittedCourses || [];
    let selectedCourses: string[] = userData?.selectedCourses || [];

    let onGoingCourses: courseStructure[] = [];
    let currentCourses: courseStructure[] = [];
    let preventedCourses: string[] = [];

    admittedCourses.forEach((val) => {
      if (val?.name?.startsWith("JEE")) {
        currentCourses.push({ name: val.name, salutation: 'INT', value: 1000 });
      } else if (val?.name?.startsWith("CAT")) {
        currentCourses.push({ name: val.name, salutation: 'INT', value: 3000 });
      } else if (val?.name?.startsWith("Mathematics And Computer Science")) {
        currentCourses.push({ name: val.name, salutation: 'INT', value: 1000 });       
      } else if (val?.name?.startsWith("GATE")) {
        currentCourses.push({ name: val.name, salutation: 'INT', value: 2000 });
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
      if (val.startsWith("JEE")) {
        onGoingCourses.push({ name: val, salutation: "INR", value: 1000 });
      } else if (val.startsWith("CAT")) {
        onGoingCourses.push({ name: val, salutation: "INR", value: 3000 });
      } else if (val.startsWith("Mathematics And Computer Science")) {
        onGoingCourses.push({ name: val, salutation: "INR", value: 1000 });
      } else if (val.startsWith("GATE")) {
        onGoingCourses.push({ name: val, salutation: "INR", value: 2000 });
      }
    });

    res.status(201).json({
      admittedCourses: currentCourses,
      selectedCourses: onGoingCourses,
      preventedCourses: preventedCourses
    });
  } catch (err) {
    console.log(err);
    res.status(493).send("Failed to Send Courses");
  }
};

export default currentCoursesFetch;

import { Request, Response } from "express";
import { admittedCoursesModel } from "../../models/admittedCourses.model.js";

const applyCourses = async (req: Request, res: Response) => {
  console.log(req.body);
  const { selectedCourses, email } = req.body;
  try {
    const userData = await admittedCoursesModel.findOne({ email: email });
    let isInValid: boolean = false;

    const admittedCourses = userData?.admittedCourses;
    const selectedSet = new Set(selectedCourses);
    const admittedMap = new Map(admittedCourses?.map((course) => [course.name, course.upcomingPaymentDate]));

    if(admittedMap.size > 0){
      for (const [name, date] of admittedMap){
        if(selectedSet.has(name) && new Date() < date!){
          isInValid = true;
          break;
        }
      }
    }

    if(isInValid){
      res.status(303).send("Remove Duplicate Courses");
      return;
    }

    if (userData != null) {
      await admittedCoursesModel.updateOne(
        { email: email },
        { $set: { selectedCourses: selectedCourses } }
      );
    }
    else{
        const data = new admittedCoursesModel(req.body);
        await data.save()
    }
    res.status(200).json({
      message: "Updated",
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error: err,
    });
  }
};

export default applyCourses;

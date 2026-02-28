import { Request, Response } from "express";
import { admittedCoursesModel } from "../../models/admittedCourses.model.js";

const applyCourses = async (req: Request, res: Response) => {
  console.log(req.body);
  const { selectedCourses, email, additionalCoursesSelected } = req.body;
  try {
    const userData = await admittedCoursesModel.findOne({ email: email });
    let isInValid: boolean = false;

    const admittedCourses = userData?.admittedCourses;
    const admittedNames = admittedCourses?.map(course => course.name);
    // const additionalCourses = userData?.additionalCourses || [];
    // if(admittedNames?.includes("Computer Science - Placements Made Easier") && additionalCourses.length == 2){
    //   res.status(400).json({
    //     message: "Cannot select any more courses as already enrolled in them"
    //   })
    //   return;
    // }
    // else if(admittedNames?.includes("Computer Science - Placements Made Easier") && additionalCourses.length == 1){
    //   if(selectedCourses.includes("Computer Science - DSA for Placement and Contests") || selectedCourses.includes("Computer Science - Fundamentals Course: Crack GATE With Ease")){
    //     res.status(400).json({
    //       message: "Cannot select any more courses, as already enrolled in them"
    //     })
    //     return;
    //   }
    //   else if(admittedNames.includes("Computer Science - Placements Made Easier") && additionalCoursesSelected.length > 1){
    //     res.status(400).json({
    //       message: "Not permitted to buy this combination of courses"
    //     })
    //     return;
    //   }
    //   else if((additionalCourses[0] == 'Computer Science - Development Crash Course: Projects Made Easier' && additionalCoursesSelected[0] != "Computer Science - Artificial Intelligence: Explore the Future") || additionalCourses[0] == 'Computer Science - Artificial Intelligence: Explore the Future' && additionalCoursesSelected[0] != "Computer Science - Development Crash Course: Projects Made Easier"){
    //     res.status(400).json({
    //       message: "Already pursuing this course"
    //     })
    //     return;
    //   }
    // }
    // else if(!admittedNames?.includes("Computer Science - Placements Made Easier")){
    //   if(selectedCourses.includes("Computer Science - Placements Made Easier")){
    //     res.status(400).json({
    //       message: "Cannot select Placements Made Easier"
    //     })
    //     return;
    //   }
    // }
    const selectedSet = new Set(selectedCourses);
    const admittedMap = new Map(admittedCourses?.map((course) => [course.name, course.upcomingPaymentDate]));

    if(admittedMap.size > 0){
      for (const [name, date] of admittedMap){
        const today = new Date();
        const upcomingDate = date!;
        today.setHours(0, 0, 0, 0);
        upcomingDate.setHours(0, 0, 0, 0)
        if(selectedSet.has(name) && today < upcomingDate){
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
        { $set: { selectedCourses: selectedCourses, appliedAdditionalCourses: additionalCoursesSelected } }
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

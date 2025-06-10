import { admittedCoursesModel } from "../../models/admittedCourses.model.js";

const currentCoursesFetch = async (req, res) => {
  console.log(req.body);
  const { email, name } = req.body;

  try {
    const userData = await admittedCoursesModel.findOne({ email, name });
    const currentCourses = userData?.admittedCourses || [];

    if(currentCourses.length == 0){
        console.log("Not found")
        return res.status(201).json({
            data: []
        })
    }

    let ongoingCourses = [];

    currentCourses.forEach((val) => {
      if (val.startsWith("JEE")) {
        ongoingCourses.push({ name: val, salutation: "INR", value: 1000 });
      } else if (val.startsWith("CAT")) {
        ongoingCourses.push({ name: val, salutation: "INR", value: 3000 });
      } else if (val.startsWith("Mathematics and Computer Science")) {
        ongoingCourses.push({ name: val, salutation: "INR", value: 1000 });
      } else if (val.startsWith("GATE")) {
        ongoingCourses.push({ name: val, salutation: "INR", value: 2000 });
      }
    });

    res.status(201).json({ data: ongoingCourses });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};

export default currentCoursesFetch;

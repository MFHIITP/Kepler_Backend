import { admittedCoursesModel } from "../../models/admittedCourses.model.js";

const applyCourses = async (req, res) => {
  console.log(req.body);
  const { selectedCourses, email } = req.body;
  try {
    const userData = await admittedCoursesModel.findOne({ email: email });
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

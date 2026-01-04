import { Request, Response } from "express";
import { grouplist } from "../local_dbs";

const getAllCourses = async (request: Request, res: Response) => {
  const courses = grouplist.filter(data => data.course === true && data.name != 'Community Group').map(data => ({
    name: data.name.replace(/^Computer Science - \s*/, ""),
    exam: data.exam,
    courseDescription: data.courseDescription,
    features: data.features,
    rating: data.rating,
    image: data.image,
  }))   
  res.status(200).json(courses);
}
export default getAllCourses;
import { Request, Response } from "express";
import { collection } from "../../models/collection.model";
import { grouplist } from "../../local_dbs";

const homePage = async(req:Request, res:Response) => {
    const allUsers = await collection.countDocuments();
    const allCourses = grouplist.length;
    res.status(200).json({
        users: allUsers,
        courses: allCourses
    })
}
export default homePage
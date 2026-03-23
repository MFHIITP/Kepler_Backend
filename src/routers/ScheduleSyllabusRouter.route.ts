import Router from "express";
import getCourseSchedule from "../GoogleGroups/getCourseSchedule.controller.js";
import getCourseSyllabus from "../GoogleGroups/getCourseSyllabus.controller.js";

const router = Router();

router.route('/getCourseSchedule').post(getCourseSchedule);
router.route('/getCourseSyllabus').post(getCourseSyllabus);

export default router;
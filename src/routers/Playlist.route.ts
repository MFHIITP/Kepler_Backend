import { Router } from "express";
import getPlayListVideos from "../controllers/getPlayListVideos.controller.js";

const router = Router();

router.route("/getCoursePlaylist").post(getPlayListVideos);

export default router;
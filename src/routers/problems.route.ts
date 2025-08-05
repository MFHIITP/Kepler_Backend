import { Router } from "express";
import getProblem from "../Problems/getTodayProblem.controller";
import runProblem from "../Problems/runProblem.controller";
import submitProblem from "../Problems/submitProblem.controller";
import getCodingDetails from "../Problems/getCodingDetails.controller";
import getLeaderboardDetails from "../Problems/getLeadeBoardDetails.controller";
import getComments from "../Problems/getComments.controller";

const router = Router();

router.route('/getTodayProblem').get(getProblem)
router.route('/runProblem').post(runProblem)
router.route('/submitCode').post(submitProblem)
router.route('/codingProfile').post(getCodingDetails)
router.route('/leaderboard').post(getLeaderboardDetails);
router.route('/getComments').post(getComments);

export default router;
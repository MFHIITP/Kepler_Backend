import { Router } from "express";
import getData from '../controllers/team/getTeamMembers.js'
import addPerson from "../controllers/team/addPerson.js";

const router = Router();
router.route('/getTeam/:teamName').get(getData);
router.route('/addPerson').post(addPerson);

export default router; 
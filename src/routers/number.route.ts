import {Router} from 'express';
import takeNumber from '../controllers/extras/takenumber.controller.js';
import addnumber from '../controllers/extras/addnumber.controller.js';
import removenumber from '../controllers/extras/removenumber.controller.js';
import participant_list from '../controllers/extras/participant_list.controller.js';
const router = Router()

router.route('/take').post(takeNumber)
router.route('/add').post(addnumber)
router.route('/remove').post(removenumber)
router.route('/participant_list').post(participant_list)

export default router; 
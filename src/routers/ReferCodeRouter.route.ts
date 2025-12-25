import { Router } from "express"
import getReferCode from "../controllers/ReferCodeDetails/getReferCode.controller";

const router = Router();

router.route("/getReferCode").post(getReferCode);

export default router;
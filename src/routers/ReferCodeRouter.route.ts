import { Router } from "express"
import getReferCode from "../controllers/referCodes/getReferCode.controller.js";
import getAllReferralsGiven from "../controllers/referCodes/GetAllReferralsGiven.controller.js";
import acceptRejectReferralCode from "../controllers/referCodes/acceptingRejectingReferralCode.controller.js";
import sendPendingReferralInformation from "../controllers/referCodes/SendPendingReferralInformation.controller.js";
import saveReferralBankDetails from "../controllers/referCodes/saveBankDetails.controller.js";

const router = Router();

router.route("/getReferCode").post(getReferCode);
router.route('/getAcceptedReferrals').post(getAllReferralsGiven);
router.route('/acceptRejectReferral').post(acceptRejectReferralCode);
router.route('/getPendingReferrals').post(sendPendingReferralInformation);
router.route('/saveReferralBankDetails').post(saveReferralBankDetails);

export default router;
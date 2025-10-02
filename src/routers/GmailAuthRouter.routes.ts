import Router from "express"
import getGmailAuthCode from "../GmailAuthControllers/GetGmailAuth.controller";
import gmailAuthTokenReceiver from "../GmailAuthControllers/GmailAuthCodeReceive.controller";

const router = Router();

router.route("/getGmailAuth").get(getGmailAuthCode);
router.route("/OAuth2Callback").get(gmailAuthTokenReceiver);

export default router;
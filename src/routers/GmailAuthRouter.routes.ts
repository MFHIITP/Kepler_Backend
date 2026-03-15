import Router from "express"
import getGmailAuthCode from "../GmailAuthControllers/GetGmailAuth.controller.js";
import gmailAuthTokenReceiver from "../GmailAuthControllers/GmailAuthCodeReceive.controller.js";
import getGoogleGroupAuthCode from "../GoogleGroups/GetGoogleGroupURL.controller.js";
import getGoogleGroupRefreshToken from "../GoogleGroups/GoogleGroupCallback.controller.js";

const router = Router();

router.route("/getGmailAuth").get(getGmailAuthCode);
router.route("/OAuth2Callback").get(gmailAuthTokenReceiver);
router.route("/getGoogleGroupAuth").get(getGoogleGroupAuthCode);
router.route("/GoogleGroupsOAuth2Callback").get(getGoogleGroupRefreshToken);

export default router;
import { Router } from "express";
import getPersonalDetails from "../controllers/connectionsControls/getPersonalDetails.controller";
import saveDetails from "../controllers/connectionsControls/savePersonalDetails.controller";
import acceptConnectionRequestController from "../controllers/connectionsControls/acceptConnectionRequest.controller";
import deletePersonalConnectionController from "../controllers/connectionsControls/deletePersonalConnection.controller";
import getConnectionRequestDetailsController from "../controllers/connectionsControls/getConnectionRequestDetails.controller";
import getAllConnections from "../controllers/connectionsControls/getPersonalConnections.controller";
import sendConnectionRequestsController from "../controllers/connectionsControls/sendConnetionRequests.controller";
import getConnectionSuggestionsController from "../controllers/connectionsControls/getConnectionSuggestions.controller";
import getDetailsNewConnection from "../controllers/connectionsControls/getDetailsNewConnection.controller";

const router = Router();

router.route("/getPersonalDetails").post(getPersonalDetails);
router.route("/savePersonalDetails").post(saveDetails);
router.route("/acceptRejectConnectionRequest").post(acceptConnectionRequestController);
router.route("/deleteConnectionRequest").post(deletePersonalConnectionController);
router.route("/getConnectionDetailsRequest").post(getConnectionRequestDetailsController);
router.route("/getPersonalConnections").post(getAllConnections);
router.route("/sendConnectionRequest").post(sendConnectionRequestsController);
router.route("/getConnectionSuggestions").post(getConnectionSuggestionsController);
router.route("/getDetailsNewConnection").post(getDetailsNewConnection);

export default router;
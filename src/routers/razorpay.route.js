import Router from "express"
import createRazorpayOrder from "../payment/createOrder.contoller.payment.js";
import verifyPayment from "../payment/verifyPayment.controller.payment.js";

const router = Router();
router.route('/create-order').post(createRazorpayOrder);
router.route('/verify-order').post(verifyPayment);

export default router;
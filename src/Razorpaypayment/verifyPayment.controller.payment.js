import crypto from "crypto";
import { RAZORPAY_SECRET } from "../index.js";
import { admittedCoursesModel } from "../models/admittedCourses.model.js";
import axios from "axios";
import dotenv from "dotenv";
import { getLastDateOfNextMonth } from "../utils/NextMonthLastDate.js";

dotenv.config();

const verifyPayment = async (req, res) => {
  try {
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const razorpay_payment_id = req.body.razorpay_payment_id;
    const razorpay_order_id = req.body.razorpay_order_id;
    const razorpay_signature = req.body.razorpay_signature;

    const sign = crypto.createHmac("sha256", RAZORPAY_SECRET).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest("hex");

    if (sign == razorpay_signature) {
      const { data } = await axios.get(`https://api.razorpay.com/v1/payments/${razorpay_payment_id}`,{
          auth: {
            username: process.env.RAZORPAY_KEY_ID,
            password: process.env.RAZORPAY_SECRET,
          },
      });
      console.log(data);
      if (data.status != "captured") {
        return res.status(950).json({
          status: "Failure",
          message: "Not payment",
        });
      }
      const currentTime = new Date(Date.now()).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      })
      const lastDayNextMonth = getLastDateOfNextMonth();
      const twoDaysBefore = new Date(lastDayNextMonth)
      twoDaysBefore.setDate(lastDayNextMonth.getDate() - 2);
      const transactionDetails = [
            {
                name: "Transaction ID:",
                value: data.id,
                copy: true,
            },
            {
                name: "Amount:",
                salutation: "INR",
                value: data.amount / 100,
            },
            {
                name: "Status:",
                value: data.status,
                color: "text-green-700",
            },
        ]
        const paymentDetails = [
            {
                name: "Payment Date",
                value: currentTime,
            },
            {
                name: "Course Validity",
                value: lastDayNextMonth.toLocaleDateString("en-IN"),
            },
            {
                name: "Transaction ID",
                value: data.id,
                copy: true,
            },
            {
                name: "Payment Method",
                value: data.method,
            },
            {
                name: "Amount Paid",
                salutation: "INR",
                value: data.amount / 100,
            },
            {
                name: "Order Id",
                value: data.order_id,
                copy: true
            },
        ]
        const upcomingPaymentDetails = [
            {
                name: "Upcoming Payment Date",
                value: twoDaysBefore.toLocaleDateString("en-IN"),
            },
            {
                name: "Last Date for Upcoming Payment",
                value: lastDayNextMonth.toLocaleDateString("en-IN"),
                color: "text-red-700",
            },
        ]
        const logDetails = {
            name: "Payment Successful",
            value1: currentTime,
            value2: data.amount / 100,
            value3: "Payment initiation request received"
        }
        const currentMonth = new Date().getMonth() + 1;
      const doc = await admittedCoursesModel.findOne({ email: userEmail });
      if (doc) {
        const set = new Set(doc.selectedCourses);

        doc.admittedCourses = [...set];
        doc.transaction_details = transactionDetails
        doc.payment_details = paymentDetails
        doc.upcoming_payment_details = upcomingPaymentDetails
        doc.log_details = [...(doc.log_details || []), logDetails]
        doc.paidForMonth = true
        doc.lastDate = lastDayNextMonth
        doc.paidMonth = currentMonth
        
        await doc.save();
      } else {
        const newDoc = new admittedCoursesModel({
          email: userEmail,
          name: userName,
          admittedCourses: [],
          selectedCourses: [],
          visibleGroups: [],
          transaction_details: transactionDetails,
          payment_details: paymentDetails,
          upcoming_payment_details: upcomingPaymentDetails,
          log_details: [logDetails],
          paidForMonth: false,
          paidMonth: currentMonth
        });
        await newDoc.save();
      }
      res.status(200).json({
        status: "Success",
      });
    } else {
      res.status(900).json({
        status: "Failure",
        message: "Invalid Signature",
      });
    }
  } catch (err) {
    console.log("Error verifying payment", err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
export default verifyPayment;

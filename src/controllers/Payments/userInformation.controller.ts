import { Request, Response } from "express";
import { admittedCoursesModel } from "../../models/admittedCourses.model.js";

const userInformation = async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;

    const courseDetails = await admittedCoursesModel.findOne({ email, name });

    if (!courseDetails) {
      return res.status(404).json({ error: "User not found" });
    }

    var admittedCourses = courseDetails.admittedCourses || [];
    var selectedCourses = courseDetails.selectedCourses || [];
    var transaction_details = courseDetails.transaction_details || [];
    var payment_details = courseDetails.payment_details || [];
    var upcoming_payment_details = courseDetails.upcoming_payment_details || []
    var transaction_logs = courseDetails.log_details || [];

    var modifiedSelectedCourses = [];
    var modifiedAdmittedCourses = [];
    
    let paymentAmount = 0;

    selectedCourses.forEach((val) => {
      if (val.startsWith("Computer Science")) {
        paymentAmount += 1000;
      }
    });

    if (admittedCourses.length > 0) {
      admittedCourses.forEach((val) => {
        if (val?.name?.startsWith("Computer Science")) {
          modifiedAdmittedCourses.push({
            name: val.name,
            coursePaymentDate: val.coursePaymentDate,
            upcomingPaymentDate: val.upcomingPaymentDate,
            lastDateToPay: val.lastDateToPay,
            validity: val.validity,
            color: new Date().setHours(0, 0, 0, 0) >= new Date(val.upcomingPaymentDate!).setHours(0, 0, 0, 0) ? 'text-red-800' : ''
          });
        } 
      });
      admittedCourses = modifiedAdmittedCourses
    }

    if (selectedCourses.length > 0) {
      selectedCourses.forEach((val) => {
        if (val.startsWith("Computer Science")) {
          modifiedSelectedCourses.push({
            name: val,
            salutation: "INR",
            value: 1000,
          });
        }
      });
      selectedCourses = modifiedSelectedCourses;
    }

    const responseData = {
      transaction_details: transaction_details,
      course_details: admittedCourses,
      applied_course_details: selectedCourses,
      payment_details: payment_details,
      upcoming_payments: upcoming_payment_details,
      amount: {
        name: "Payment Amount",
        value: paymentAmount,
        salutation: "INR",
        color: "text-purple-900",
      },
      log_details: transaction_logs
    };

    res.status(200).json({
      data: responseData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default userInformation;

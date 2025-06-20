import { admittedCoursesModel } from "../../models/admittedCourses.model.js";

const userInformation = async (req, res) => {
  try {
    const { email, name } = req.body;

    const courseDetails = await admittedCoursesModel.findOne({ email, name });

    if (!courseDetails) {
      return res.status(404).json({ error: "User not found" });
    }

    var admittedCourses = courseDetails.admittedCourses || [];
    var selectedCourses = courseDetails.selectedCourses || [];

    const newcourses = selectedCourses.filter(
      (val) => !admittedCourses.includes(val)
    );

    var modifiedSelectedCourses = [];
    var modifiedAdmittedCourses = [];
    
    let paymentAmount = 0;

    selectedCourses.forEach((val) => {
      if (val.startsWith("JEE")) {
        paymentAmount += 1000;
      } else if (val.startsWith("CAT")) {
        paymentAmount += 3000;
      } else if (val.startsWith("GATE")) {
        paymentAmount += 2000;
      } else if (val.startsWith("Mathematics And Computer Science")) {
        paymentAmount += 1000;
      }
    });

    if (admittedCourses.length > 0) {
      admittedCourses.forEach((val) => {
        if (val.startsWith("JEE")) {
          modifiedAdmittedCourses.push({
            name: val,
            salutation: "INR",
            value: 1000,
          });
        } else if (val.startsWith("CAT")) {
          modifiedAdmittedCourses.push({
            name: val,
            salutation: "INR",
            value: 3000,
          });
        } else if (val.startsWith("Mathematics And Computer Science")) {
          modifiedAdmittedCourses.push({
            name: val,
            salutation: "INR",
            value: 1000,
          });
        } else if (val.startsWith("GATE")) {
          modifiedAdmittedCourses.push({
            name: val,
            salutation: "INR",
            value: 2000,
          });
        }
      });
      admittedCourses = modifiedAdmittedCourses
    }

    if (selectedCourses.length > 0) {
      selectedCourses.forEach((val) => {
        if (val.startsWith("JEE")) {
          modifiedSelectedCourses.push({
            name: val,
            salutation: "INR",
            value: 1000,
          });
        } else if (val.startsWith("CAT")) {
          modifiedSelectedCourses.push({
            name: val,
            salutation: "INR",
            value: 3000,
          });
        } else if (val.startsWith("Mathematics And Computer Science")) {
          modifiedSelectedCourses.push({
            name: val,
            salutation: "INR",
            value: 1000,
          });
        } else if (val.startsWith("GATE")) {
          modifiedSelectedCourses.push({
            name: val,
            salutation: "INR",
            value: 2000,
          });
        }
      });
      selectedCourses = modifiedSelectedCourses;
    }

    const responseData = {
      transaction_details: [
        {
          name: "Transaction ID:",
          value: "TXN90876",
          copy: true,
        },
        {
          name: "Amount:",
          salutation: "INR",
          value: 500.0,
        },
        {
          name: "Status:",
          value: "Success",
          color: "text-green-700",
        },
      ],
      course_details: admittedCourses,
      applied_course_details: selectedCourses,
      payment_details: [
        {
          name: "Payment Date",
          value: "25 Feb 2025, 05:07 pm",
        },
        {
          name: "Course Period",
          value: "25 Feb 2024 - 25 Feb 2025",
        },
        {
          name: "Transaction ID",
          value: "TNX-90876",
          copy: true,
        },
        {
          name: "Payment Method",
          value: "UPI/Bank Transfer/NFTF",
        },
        {
          name: "Amount Paid",
          salutation: "INR",
          value: 500,
        },
        {
          name: "UTR no (if any)",
          value: "AXISCNO9255422411",
        },
      ],
      upcoming_payments: [
        {
          name: "Upcoming Payment Date",
          value: "2025-03-22",
        },
        {
          name: "Payment Amount",
          value: paymentAmount,
          salutation: "INR",
          color: "text-purple-900",
        },
        {
          name: "Last Date for Upcoming Payment",
          value: "2025-03-29",
          color: "text-red-700",
        },
      ],
      log_details: Array(6)
        .fill()
        .map((_, i) => ({
          name: `Payment-${i + 1}`,
          value1: "Info",
          value2: "24 Feb 2025, 01:00:04 pm",
          value3: "Payment initiation request received",
        })),
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

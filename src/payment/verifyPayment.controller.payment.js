import crypto from "crypto"
import { RAZORPAY_SECRET } from "../index.js"
import { admittedCoursesModel } from "../models/admittedCourses.model.js"

const verifyPayment = async(req, res) => {
    try{
        const userName = req.body.userName;
        const userEmail = req.body.userEmail;
        const razorpay_payment_id = req.body.razorpay_payment_id
        const razorpay_order_id = req.body.razorpay_order_id
        const razorpay_signature = req.body.razorpay_signature

        const sign = crypto.createHmac("sha256", RAZORPAY_SECRET).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest("hex");

        if(sign == razorpay_signature){
            const doc = await admittedCoursesModel.findOne({email: userEmail});
            if(doc){
                const set = new Set(doc.selectedCourses);

                doc.admittedCourses = [...set];
                await doc.save();
            }
            else{
                const newDoc = new admittedCoursesModel({
                    email: userEmail,
                    name: userName,
                    admittedCourses: [...set],
                    selectedCourses: [...set],
                    visibleGroups: []
                })
                await newDoc.save();
            }
            res.status(200).json({
                status: "Success"
            })
        }
        else{
            res.status(900).json({
                status: "Failure",
                message: "Invalid Signature"
            })
        }
    }
    catch(err){
        console.log("Error verifying payment", err);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}
export default verifyPayment
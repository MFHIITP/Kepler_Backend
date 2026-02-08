import { Request, Response } from "express";
import { collection } from "../../models/collection.model.js";
import pool from "../../utils/postgresConnection.utils.js";

const saveReferralBankDetails = async(req: Request, res: Response) => {
    const {emailId, accountName, accountId, ifsc_code, branch} = req.body;

    const referCode = await collection.find({email: emailId}).select('referCode');

    try{
        const query = `UPDATE user_referral_schema SET account_number = $1, ifsc_code = $2, account_holder_name = $3, branch = $4 WHERE refer_code = $5`;
        const values = [accountId, ifsc_code, accountName, branch, referCode];
        const response = await pool.query(query, values);
        res.status(200).json({
            message: "User bank details updated successfully"
        })
    }
    catch(error){
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export default saveReferralBankDetails;
import tokenschema from "../models/Token.model.js";
import historyschema from "../models/History.model.js";
import { Request, Response } from "express";

const removetoken = async (req: Request, res: Response) => {
  try{
    const result = await tokenschema.deleteOne({ email_id: req.body.email });
    if (result.deletedCount === 0) {
      res.status(500).send("No token found for this email.");
      return;
    }
    await historyschema.updateOne(
      { email: req.body.email },  
      { 
        $set: {
          logouttime: Date.now(),   
          status: 'inactive'   
        }
      }
    );
  }
  catch(error){
    console.error("Logout failed")
  }
  res.status(200).send("Token deleted successfully.");
};
export default removetoken;

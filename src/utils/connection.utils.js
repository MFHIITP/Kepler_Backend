import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
import logger from "./winston_logger.js";

const server = process.env.SERVER;
const database = process.env.DATABASE
const connect = async () => {
    try {
      await mongoose.connect(`mongodb+srv://${server}/${database}`);
      logger.info('Database Successfully Connected')
      console.log("Connecion Successful");
    } catch (err) {
      console.log(err);
      logger.info('Database error ' + err)
    }
};
export default connect;
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
import logger from "./winston_logger.js";

const server = process.env.SERVER;
const database = process.env.DATABASE

const connect = async () => {
    try {
      const url = `mongodb+srv://${server}/${database}`;
      // const url = ``
      await mongoose.connect(url);
      logger.info('Database Successfully Connected')
      console.log("Connecion Successful");
    } catch (err) {
      console.log(err);
      logger.info('Database error ' + err)
    }
};
export default connect;
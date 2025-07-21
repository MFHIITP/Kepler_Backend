import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
import logger from "./winston_logger.js";

const server = "db:27017";
const database = "Kepler-22B"

const connect = async () => {
    try {
      const url = `mongodb://${server}/${database}`;
      // const url = `mongodb+srv://${process.env.SERVER}/${process.env.DATABASE}`
      await mongoose.connect(url);
      logger.info('Database Successfully Connected')
      console.log("Connecion Successful");
    } catch (err) {
      console.log(err);
      logger.info('Database error ' + err)
    }
};
export default connect;
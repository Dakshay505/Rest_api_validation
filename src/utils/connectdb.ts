import mongoose from "mongoose";
import config from "config";
import logger from "./logger";
const db_uri = config.get<string>("db_uri");

const connectdb =async ()=>{
    
    try{
      await mongoose.connect(db_uri)
        logger.info("Database connected successfully.");
    }catch(err){
        logger.error(err);
        process.exit(1);

    }
}
export default connectdb;
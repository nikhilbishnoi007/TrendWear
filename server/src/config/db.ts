import mongoose from "mongoose";
import config from "./config";

export const connectDb=async():Promise<void>=>{
 try {
    await mongoose.connect(config.DB_URL)
    console.log("Db connected successfully")
 } catch (error) {
    console.log(error)
     process.exit(1);
 }
}
import mongoose  from "mongoose";
import { config } from "../config/env.config.js";

let isConnected = false;
const connectDB = async () => {
    try {
        if(isConnected){
            return "already connected"
        }
        await mongoose.connect(config.MONGO_URI)
        isConnected = true
        console.log("db connect successfully");
        
    }catch(error){
        console.log(error);
        
    }
}

export {connectDB}
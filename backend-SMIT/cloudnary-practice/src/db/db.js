 import mongoose from "mongoose"
 import { db } from "../config/db.config.js"

const connectDB = async () => {
    try {
        await mongoose.connect(db.MONGO_URI);
        console.info("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export {connectDB}
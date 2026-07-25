import mongoose from "mongoose";
import dns from "node:dns"
dns.setServers([
    "1.1.1.1", "8.8.8.8"
])

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to db");
        
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}



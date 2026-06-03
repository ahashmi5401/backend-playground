// purpose of this file: write logic for how mongoose connects to the database

import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const connectDB = async () => {
    try {
        console.log("Connecting to Cluster via Standard Connection String...")
        
        // Using MongoDB URI from .env file
       await mongoose.connect(process.env.MONGODB_URI)
        console.log("Cluster DB connected successfully! 🎉")
    } catch (error) {
        console.error("DB connection error:", error.message)
    }
}
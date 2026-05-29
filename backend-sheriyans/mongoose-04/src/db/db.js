// purpose of this file: write logic for how mongoose connects to the database

import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        console.log("Connecting to Cluster via Standard Connection String...")
        
        // Yeh string direct ports use karti hai, router isse block nahi kar payega
       await mongoose.connect(
  "mongodb://ahashmi5401:mkmiofdbmk@ac-jc5hmpc-shard-00-00.c1liln0.mongodb.net:27017,ac-jc5hmpc-shard-00-01.c1liln0.mongodb.net:27017,ac-jc5hmpc-shard-00-02.c1liln0.mongodb.net:27017/?ssl=true&replicaSet=atlas-7k0kkv-shard-0&authSource=admin&appName=Cluster0"
)
        console.log("Cluster DB connected successfully! 🎉")
    } catch (error) {
        console.error("DB connection error:", error.message)
    }
}
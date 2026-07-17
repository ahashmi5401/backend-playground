import dotenv from "dotenv"
dotenv.config()

export const db = {
    MONGO_URI: process.env.MONGO_URI
}
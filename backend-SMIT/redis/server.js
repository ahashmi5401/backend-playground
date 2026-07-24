import express from "express";
import { User } from "./models/user.model.js";
import { connectDB } from "./db/db.js";
import dns from"node:dns";
import {createClient} from "redis";
import dotenv from "dotenv";

dotenv.config();

dns.setServers([
    "1.1.1.1", "8.8.8.8"
])
const app = express();


app.use(express.json());

const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

(async () => {
    await redisClient.connect();
       console.log("redis connected!");
})();

app.get("/", async (req, res) => {

    const cacheKey = "users";
    const cachedData = await redisClient.get(cacheKey);
    if(cachedData){
        console.log("data cahce");
        
        return res.status(200).json(JSON.parse(cachedData));
    }

    let data = await User.find()

    await redisClient.set(cacheKey, JSON.stringify(data), {
        EX: 60 * 60 * 24, // 1 day
    });
    return res.status(200).json(data)
})


await connectDB()
app.listen(5000, () => {
    console.log("Server is running on port 5000");
})
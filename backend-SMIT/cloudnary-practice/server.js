import {app} from "./src/app.js"
import dotenv from "dotenv"
import { connectDB } from "./src/db/db.js";
import dns from "node:dns"


dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config()
app.listen(3000, () => {
    console.log("Server is running on port 3000");
    connectDB()
})
import dotenv from "dotenv"
import {app} from "./src/app.js"
import { connectDB } from "./src/db/db.js";
import dns from "dns"

dns.setServers([
        "1.1.1.1",
        "8.8.8.8"
])


dotenv.config()


app.listen(process.env.PORT , () => {
    console.log("server is listening on port 3000");
    
    connectDB()
})
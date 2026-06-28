import app from "./src/app.js"
import dotenv from "dotenv"
import { connectDB } from "./src/db/db.js"
import dns from "dns"

dns.setServers([
    "8.8.8.8" , "1.1.1.1"
])

dotenv.config()

let PORT = process.env.PORT
app.listen(PORT , () => {
    console.log(`Server is listening on Port ${PORT}`);
    connectDB()
})
import dotenv from "dotenv"
import app from "./src/app.js"
import connectDB from './src/db/db.js'
import dns from "dns"

import cookieParser from "cookie-parser";



dotenv.config()

dns.setServers([
    "8.8.8.8", "1.1.1.1"
])

connectDB()
app.listen(3000 , () => {
    console.log('server is listening on port 3000');
    
})
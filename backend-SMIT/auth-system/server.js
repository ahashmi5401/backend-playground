import {app} from "./src/app.js"
import { config } from "./src/config/env.config.js"
import { connectDB } from "./src/db/db.js";
import dns from"node:dns"

dns.setServers([
    "1.1.1.1" , "8.8.8.8"
])


app.listen(config.PORT , (req , res ) => {
    console.log(`Server is listening on port ${config.PORT}`);
    connectDB()
    
})
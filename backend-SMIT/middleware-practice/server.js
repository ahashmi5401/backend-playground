import dotenv from "dotenv"
import {app} from "./src/app.js"
dotenv.config()




let  PORT = process.env.PORT
app.listen(PORT , () => {
    console.log(`server is listening on port ${PORT}`);
})
import { app } from "./src/app.js";
import helmet from "helmet"

//use for hide header s hacker didn't understand how web build 
app.use(helmet())

app.listen(4500 , (req , res) => {
    console.log("server is listening on port 4500");
})
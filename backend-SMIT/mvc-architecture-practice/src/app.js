import express from "express"
import { userRoutes } from "./routes/user.routes.js";

let app = express();

app.use(express.json())

app.use('/api/auth' , userRoutes)


export default app
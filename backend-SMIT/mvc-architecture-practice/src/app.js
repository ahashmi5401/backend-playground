import express from "express"
import { userRoutes } from "./routes/user.routes.js";
import { authRoutes } from "./routes/auth.routes.js";

let app = express();

app.use(express.json())

app.use('/api/auth' , authRoutes)
app.use('/api/users' , userRoutes)


export default app
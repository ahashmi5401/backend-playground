import express from "express";
import morgan from "morgan"
import {authRoutes} from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import globalErrorHandler from "./middleware/error.middleware.js";
import { userRoutes } from "./routes/user.routes.js";
import cors from "cors"
let app = express()


app.use(morgan("dev"))
app.use(express.json());
app.use((req, res, next) => {
  console.log("Request Content-Type:", req.headers['content-type']);
  console.log("Request body:", req.body);
  next();
});
app.use(cors({
    origin: "http://localhost:3000",
  credentials: true
}))
app.use(cookieParser())

app.use("/api/auth" , authRoutes)
app.use("/api/user" , userRoutes)

app.use(globalErrorHandler)
export {app}
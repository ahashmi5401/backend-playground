import express from "express"
import { appRoutes } from "./routes/app.routes.js"

let app = express()

app.use("/api" ,appRoutes )

export {app}
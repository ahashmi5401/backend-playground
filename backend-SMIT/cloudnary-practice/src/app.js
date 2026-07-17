import express from "express"
import { userRoutes } from "./routes/user.routes.js"
import helmet  from "helmet"
let app= express()


//for hide header
app.use(helmet())

app.use(express.json())
app.use("/api/user" , userRoutes)
export {app}
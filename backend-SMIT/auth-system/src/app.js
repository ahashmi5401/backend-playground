import express from "express"
import { errorHandler } from "./middleware/error.middleware.js"
import { authRoutes } from "./routes/auth.routes.js"

const app = express()

app.use(express.json())

app.use('/api/auth' , authRoutes)






app.use(errorHandler)

export {app}
import express from "express"
import { getData } from "../controller/app.controller.js"
import { limiter } from "../middleware/ratelimit.middleware.js"

let appRoutes = express.Router()

appRoutes.get("/test" ,limiter(1 , 3),  getData)

export {appRoutes}
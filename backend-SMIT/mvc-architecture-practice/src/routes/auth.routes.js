import express from "express"
import { userSignup} from "../controller/auth.controller.js"


let authRoutes = express.Router()

authRoutes.post('/', userSignup)

export {authRoutes}
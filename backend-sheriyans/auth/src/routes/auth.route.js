import {Router } from "express"
import { signup , refreshToken  , logout, logoutFromAll, login, verifyEmail} from "../controller/auth.controller.js"


let authRoutes = Router()


authRoutes.post("/signup" , signup)
authRoutes.post("/login" , login)
authRoutes.get("/refresh-token" , refreshToken)
authRoutes.get("/logout" , logout)
authRoutes.get("/logout-from-all" , logoutFromAll)
authRoutes.post("/verify-email" , verifyEmail)
export {authRoutes}
import {Router } from "express"
import { validateUser } from "../utils/validateUser.js"
import { profile } from "../controller/user.controller.js"


const  userRoutes = Router()

userRoutes.get("/profile" , validateUser, profile)

export {userRoutes}
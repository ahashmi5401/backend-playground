import express from "express"
import { createUser } from "../controller/auth.controller.js"

let authRoutes = express.Router()

authRoutes.post('/signup' , createUser )


export default authRoutes
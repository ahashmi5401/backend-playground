import express from "express"
import { getUsers, userSignup } from "../controller/user.controller.js"

let userRoutes = express.Router()

userRoutes.post('/signup', userSignup)
userRoutes.get('/users' , getUsers)


export {userRoutes}
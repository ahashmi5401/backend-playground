import express from "express"
import { getUsers } from "../controller/user.controller.js"

let userRoutes = express.Router()

userRoutes.get('/' , getUsers)


export {userRoutes}
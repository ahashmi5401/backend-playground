import express from "express"
import { login, signup } from "../controller/auth.controller.js";

let authRoutes = express.Router();

authRoutes.post('/signup' , signup)
authRoutes.post('/login' , login)
export {authRoutes}
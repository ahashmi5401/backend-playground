import express from "express"
import { login, signup, update } from "../controller/auth.controller.js";
import { validateUser } from "../validator/user.validator.js";

let authRoutes = express.Router();

authRoutes.post('/signup' , signup)
authRoutes.post('/login' , login)
authRoutes.put('/update' , validateUser , update)
export {authRoutes}
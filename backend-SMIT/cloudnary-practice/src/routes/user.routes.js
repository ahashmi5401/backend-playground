import express from "express"
const userRoutes = express.Router();
import { createUser } from "../controllers/user.controller.js";
import { limiter } from "../middleware/ratelimiting.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

userRoutes.post("/register" , limiter(1 , 30) , upload.single("profilePic") , createUser)

export {userRoutes}
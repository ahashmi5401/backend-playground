import express from "express"
import { createPost } from "../controller/post.controller.js";


let postRoutes = express.Router();

postRoutes.post('/post' , createPost)


export {postRoutes}
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Post } from "../model/post.model.js";
import Auth from "../model/auth.model.js";

const createPost = async (req, res) => {
    const { title, content, createdAt } = req.body;
    const token = req.cookies?.token;
    console.log(token);
    

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: No token provided"
        });
    }

    if (!title || !content ) {
        return res.status(400).json({
            success: false,
            message: "All fields (title, content, author) are required"
        });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await Auth.findOne({ _id: decode.id });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const newPost = await Post.create({
            title,
            content,
            author: user._id,
            createdAt: createdAt || Date.now() 
        });

        return res.status(201).json({
            success: true,
            message: "Post created successfully",
            post: newPost
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
}

export { createPost };
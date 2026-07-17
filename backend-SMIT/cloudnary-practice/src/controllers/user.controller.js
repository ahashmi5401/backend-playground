import { User } from "../models/user.model.js";
import { cloudinary } from "../config/cloudnary.config.js";
import fs from "fs/promises";
import {upload} from "../middleware/multer.middleware.js";

export const createUser = async (req, res) => {
    try {
        const { name , email , password } = req.body;
        console.log("req.file", req.file);
        console.log(name , email , password);
        
        
        // const findUser = await User.findOne({email});
        // if(findUser){
        //     return res.status(400).json({message: "User already exists"});
        // }

        if(!req.file){
            return res.status(400).json({message: "Profile image is required"});
        }
        const data = await cloudinary.uploader.upload(req.file.path);
        console.log("data", data);
        const newUser = new User({
            name,
            email,
            password,
            profileImage: data.secure_url
        });
        if(newUser){
            await newUser.save();
        }
        await fs.unlink(req.file.path);

        return res.status(200).json({message: "User created successfully"});
    }catch(error){
        console.log("error", error);
        return res.status(500).json({message: "Internal server error"});
    }
}
import mongoose from "mongoose";
import { userModel } from "../model/auth.model.js";

const userSignup = async (req, res) => { 
    try {
        const newUser = req.body;
        const {email} = newUser

        const userCheck = await userModel.findOne({email})
        if(userCheck){
            console.log(userCheck)
            res.status(400).json({sucess : false , message:"email already registered"})
        }
        let user = new userModel(newUser);
        
        await user.save(); 

        return res.status(201).json({
            status: true, 
            message: "User created successfully",
            createdUser: user
        });

    } catch (error) {
        console.log("Error is:", error.message);

        if (error.name === 'ValidationError') {
            const errorMessages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                status: false,
                message: "Validation failed",
                errors: errorMessages
            });
        
        if (error.code === 11000) {
            return res.status(400).json({
                status: false,
                message: "Email already registered"
            });
        }
    }
}}

export {userSignup}
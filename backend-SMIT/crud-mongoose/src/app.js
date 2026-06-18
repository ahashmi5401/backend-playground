import express from "express"
import { UserSchema } from "./model/users.model.js";
import mongoose from "mongoose";
export const app = express();

//middleware
app.use(express.json());


app.get('/', (req , res) => {
    res.send({
        status:"success",
        message:"home page"
    })
})

app.post('/users' , async (req , res ) => {
    try{
        const UserData = req.body;
        const user = new UserSchema(UserData);
        const savedUser = await user.save()
        if(user){
            res.status(201).json({
                status:"sucess",
                message:"user created sucessfully",
                user:savedUser
            })
        }
    }catch(error){
        return res.status(400).json({
        status:false,
        message : error.message

    })
    }
})

app.get("/users", async (req , res) => {
    try {
       let users = await  UserSchema.find();

       if(users){
        res.status(200).json({
            status:"success",
            message:"successfully fetch data ",
            data : users
        })
       }
       if(users.length() == 0){
        res.status(204).json({
            status:"success",
            message:"successfully fetch data but empty ",
            data : users
        })
       }
    }catch (error){
        res.status(400).json({

            status:false
        })
       }
})

app.get("/users/:username" , async (req , res) => {
    try{
        const {username} = req.params;
        let user = await UserSchema.findOne({
            username 
        })
        if (!user) {
                return res.status(404).json({
                    status:false,
                     message: "User not found" 
                    });
            }
    
        return res.status(200).json({
            status:"success",
            message:"data fetch successfully",
            data : user
        })
    }catch (error) {
        return res.status(500).json({
            status:false, 
             message: error.message });
    }
})


app.patch("/users/:username" , async (req ,res) => {
    try
    {
        const {username} = req.params;
        const updatedData = req.body;
        if (!updatedData || Object.keys(updatedData).length === 0) {
                return res.status(400).json({ message: "No update data provided" });
            }
        let user = await UserSchema.findOneAndUpdate(
            {username},
            {$set:updatedData}
        )
        if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            return res.status(200).json({ message: "User updated successfully",updatedData });
    }catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
})


app.delete("/users/:username" , async (req, res) => {
    try{
        const {username} = req.params;
        let user = await UserSchema.findOneAndDelete(
            {username}
        )
        if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
        return res.status(200).json({ message: "User deleted successfully", deletedUser : user  });
    }catch(error){
        return res.status(400).json({
            status:false,
            message:error.message
        })
    }
})
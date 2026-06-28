import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,                    // ✅ remove extra spaces
            maxlength: [12, "Name must be less than 12 characters"]
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,               
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
        },
        password: {
            type: String,
            required: true,
            minlength: [8, "Password must be at least 8 characters"],
            select: false                
        }
    },
    { timestamps: true }                  
);

const Auth = mongoose.model("Auth", authSchema);
export default Auth;
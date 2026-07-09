import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type:String,
        required:[true , "username is required"],
        trim:true,
        lowercase:true,
        minLength:3
    },
   email: {
    type: String,
    required: [true, 'Email address is required'],
    trim: true,
    lowercase: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
},
 password: {
  type: String,
  trim:true,
  required: [true, "Password is required"],
  minLength: [8, "Password must be at least 8 characters long"],
  match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-@#$%^&+=!_]).{8,}$/, "Password weak hai bhai!"],
},
 age:{
    type:Number,
    required:[true , "Age  Required"],
    min: [14, "greater than 14 years old "]
 }
}, {timestamps:true})

export const userModel = mongoose.model('user' , userSchema)
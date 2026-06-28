import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : [true , "email is required"],
        unique:true,
        trim:true,
        lowercase:true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address']

    },
    password : {
        type:String,
        required:[true , "password required"],
        minlength : [8 , "password length minimum 8 "],
        select: false // Automatically excludes password from query results by default   
    },
    role :{
        type:"String",
        enum:["student" , "teacher" , "admin"],
        default:"student"
    },
    name :{
        type:String,
        required:[true , "full name required"],
        trim:true
    },
    isActive:{
        type:Boolean,
        default:true
    }},
    {
        timestamps:true
    })


export const  userModel = mongoose.model('user' , userSchema )
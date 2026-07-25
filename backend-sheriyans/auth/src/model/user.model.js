import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true , "username required"],
        trim:true,
        lowercase:true,
        unique:true 
    },
    email:{
        type:String,
        required:[true, "email required"],
        trim:true,
        lowercase:true,
        unique:true ,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , "invalid email "]
    },
    password:{
        type:String,
        required:[true , "password required"],
        minLength : 8
    }
},{
    timestamps:true
}
)


export const User = mongoose.model("user" , userSchema)
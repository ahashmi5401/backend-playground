import mongoose from "mongoose"

const sessionSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true , "User is required"]
    },
    refreshTokenHash:{
        type:String,
        required:[true , "Refresh Token is Required"]
    },
    ip:{
        type:String,
        required:[true , "IP Address is Required"]
    },
    //isse identify karte hai ke konse client konsa browser use kart hai
    userAgent:{
        type:String,
        required:[true , "User Agent is Required"]
    },
    revoked : {
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})


export let sessionModel = mongoose.model("sessions" , sessionSchema)
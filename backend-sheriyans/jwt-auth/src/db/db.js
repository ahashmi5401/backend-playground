import mongoose from "mongoose";

async function connectDB (){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('connected to db successfully')
    }catch(error){
        console.log('the error while connected to db ' , error);
        
    }
}


export default  connectDB
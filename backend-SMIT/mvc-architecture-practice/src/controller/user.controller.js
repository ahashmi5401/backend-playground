import mongoose from "mongoose";
import { userModel } from "../model/auth.model.js";




const getUsers =async (req , res ) => {
    let {page = 1, limit = 10 , role , isActive  } = req.query;
    page = Number(page);
    limit = Number(limit);


    if(isNaN(page) || isNaN(limit)){
        throw new Error("Page and limit Should be Number " , 400)
    }

    if(page<1 || limit < 1){
        throw new AppError("the page number and limit should be positive" , 400)
    }
    let skip = (page - 1) * limit;
    try{
      let data = await userModel.find({role , isActive}).limit(limit).skip(skip)
      return res.status(200).json({
        status:"success",
        message:"data retrieve successfully",
        data : data
      })
    }catch(error){
        console.log("error" , error);
       return  res.json({
            meassge : error.message
        })
    }
}
export { getUsers };

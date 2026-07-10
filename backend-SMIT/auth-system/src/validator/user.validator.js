import jwt from "jsonwebtoken"
import AppError from "../utils/AppError.js";
import { config } from "../config/env.config.js";
import { userModel as User} from "../model/user.model.js";
export const validateUser = async (req , res , next ) => {
    try{
         let token = req.cookies?.token
                if(!token) throw new AppError("UnAuthorize" , 400);
        
                let decode = jwt.verify(token , config.JWT_SECRET)
        
                if(!decode)throw new AppError("Invalid Token " , 400)
                const user = await User.findOne({_id : decode._id})
                
                if(!user)throw new AppError("user not found " , 404)
                
                req.user = user ;
                next()

    }catch(error){
        next(error)
    }
}
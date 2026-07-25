import AppError from "../utils/appError.js"
import jwt from "jsonwebtoken"
import {User} from "../model/user.model.js"
export const validateUser = async (req , res , next) => {
    try{
        let token = req.headers.authorization?.split(" ")[1]
        if(!token) throw new AppError("unAutharize User " , 400)
        
        let decode = jwt.verify(token , process.env.JWT_SECRET)
        let user = await User.findOne({_id:decode.id})
        req.user = user
        next()
    }catch(error){
        next(error)
    }
}
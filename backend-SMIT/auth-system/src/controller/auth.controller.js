import { userModel as User} from "../model/user.model.js";
import AppError from "../utils/AppError.js";
import bcrypt from "bcrypt"
import { comparePassword, hashedPassword } from "../utils/passwordUtils.js";
import jwt from "jsonwebtoken"
import {config} from '../config/env.config.js'
import cookie from "cookie"

const signup = async (req , res , next)=> {
    try{
        const {email , password , username , age } = req.body;



        if(!email || !password || !username || !age) {
            throw new AppError("All Field Are Required " , 400)
        }


        const userExist = await User.findOne({email});
        if(userExist) {
            throw new AppError("User Already Registered " , 400);
        }

        const hashPassword = await  hashedPassword(password)

       const user = new User({
            email,
            username,
            age,
            password: hashPassword
        });
        await user.save()

        if(user){
            return res.status(201).json({
                status : true,
                message:"User signup Sucessfully ",
                data:user
            })
        }
    }catch(error){
        next(error)
    }
}


const login = async (req  , res , next ) => {
    try{
        const {email , password} = req.body;
        

        if(!email || !password) throw new AppError("Both Field Are Required " , 400);
        let existUser = await User.findOne({email})

        
        if(existUser){
            let passMatch = await comparePassword(password , existUser.password);
            if(passMatch){
                let token = jwt.sign({_id : existUser._id}, config.JWT_SECRET,{expiresIn : "1d"})
                res.cookie("token" , token)
               return res.status(201).json({
                    status:true,
                    message:"user login succesfully",
                })
            }
            throw new AppError("Password Incorrect " , 400)
        }
        throw new AppError("user not registered " , 400)
    }catch(error){
        next(error)
    }
}


const update = async (req , res , next)=> {
    try{
        let updatedData = req.body;

       
        
        const updateUser = await User.findOneAndUpdate( {_id : req.user._id }, updatedData , {new:true} )
        
        return res.status(200).json({
            status : true,
            message:"user updated sucessfully",
            data:updateUser
        })
    }catch(error){
        next(error)
    }
}
export {signup , login , update}
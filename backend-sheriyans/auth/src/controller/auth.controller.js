import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import AppError from "../utils/appError.js";
import { COOKIE_OPTIONS } from "../utils/cookieOption.js";
import { assignJWT } from "../utils/jwt.js";
import { hashedPassword } from "../utils/passwordHash.js";
import { sessionModel } from "../model/session.model.js";

const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            throw new AppError("All fields are required", 400);
        }

        const normalizedEmail = email.trim().toLowerCase();
        const trimmedUsername = username.trim();

        // Unique user check
        const existingUser = await User.findOne({
            $or: [{ email: normalizedEmail }, { username: trimmedUsername }],
        });

        if (existingUser) {
            if (existingUser.email === normalizedEmail) {
                throw new AppError("Email Already Registered", 409);
            }
            if (existingUser.username === trimmedUsername) {
                throw new AppError("Username must be unique", 409);
            }
        }

        // Password Hash & User Save
        const hash = await hashedPassword(password);

        const newUser = new User({
            username: trimmedUsername,
            email: normalizedEmail,
            password: hash,
        });
        await newUser.save();

        // 1. Session Document create karo
        const session = await sessionModel.create({
            user: newUser._id,
            refreshTokenHash: "pending",
            revoked: false,
            ip: req.ip,
            userAgent: req.headers["user-agent"]
        });

        const accessToken = assignJWT({ id: newUser._id, sessionId: session._id }, "15m");
        const refreshToken = assignJWT({ id: newUser._id, sessionId: session._id }, "7d");

        session.refreshTokenHash = await hashedPassword(refreshToken);
        await session.save();

        res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);



        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: newUser,
            accessToken
        });

    } catch (error) {
        next(error);
    }
};


const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1. Validation check
        if (!email || !password) {
            throw new AppError("Email and password are required", 400);
        }

        const normalizedEmail = email.trim().toLowerCase();

        // 2. Single DB Query
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            throw new AppError("Invalid email or password", 401);
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new AppError("Invalid email or password", 401);
        }

        // 4. Session Create Karo
        const session = await sessionModel.create({
            user: user._id,
            refreshTokenHash: "pending",
            revoked: false,
            ip: req.ip,
            userAgent: req.headers["user-agent"]
        });

        // 5. JWT Tokens Banao (User ID + Session ID)
        const accessToken = assignJWT({ id: user._id, sessionId: session._id }, "15m");
        const refreshToken = assignJWT({ id: user._id, sessionId: session._id }, "7d");

        // 6. Refresh Token Hash karke DB mein save karo
        session.refreshTokenHash = await hashedPassword(refreshToken);
        await session.save();

        // 7. Cookie set karo
        res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user,
            accessToken
        });

    } catch (error) {
        next(error);
    }
};

const refreshToken = async (req, res, next) => {
    try {
        let refreshToken = req.cookies.refreshToken;
        if (!refreshToken) throw new AppError("Refresh token not found", 401);

        let decode = jwt.verify(refreshToken, process.env.JWT_SECRET);

        const session = await sessionModel.findOne({
            _id: decode.sessionId,
            revoked: false
        });

        if (!session) throw new AppError("Invalid session or session revoked", 401);

        // Bcrypt Compare se verify karo
        const isValidToken = await bcrypt.compare(refreshToken, session.refreshTokenHash);
        if (!isValidToken) {
            throw new AppError("Invalid refresh token, please login again", 401);
        }

        const newAccessToken = assignJWT({ id: decode.id, sessionId: session._id }, "15m");
        const newRefreshToken = assignJWT({ id: decode.id, sessionId: session._id }, "7d");

        session.refreshTokenHash = await hashedPassword(newRefreshToken);
        await session.save();

        res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);

        return res.status(200).json({
            success: true,
            message: "Access token generated successfully",
            accessToken: newAccessToken
        });

    } catch (error) {
        next(error);
    }
};


const logout = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) throw new AppError("Refresh Token is not found", 400);

        const decode = jwt.verify(refreshToken, process.env.JWT_SECRET);

        const session = await sessionModel.findOne({
            _id: decode.sessionId,
            revoked: false
        });

        if (!session) throw new AppError("Invalid session or session expired", 400);

        session.revoked = true;
        await session.save();

        // Cookie clear karo
        res.clearCookie("refreshToken", COOKIE_OPTIONS);

        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });

    } catch (error) {
        next(error);
    }
};


const logoutFromAll = async (req , res , next) => {
    try{
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) throw new AppError("Refresh Token is not found", 400);

        const decode =  jwt.verify(refreshToken , process.env.JWT_SECRET)

 const session = await sessionModel.updateMany(
    { user: decode.id, revoked: false }, // 👈 'user' aur 'revoked'
    { revoked: true }                    // 👈 'revoked: true'
);
         if (result.matchedCount === 0) throw new AppError("No active sessions found or already logged out", 400);

         res.clearCookie("refreshToken" , COOKIE_OPTIONS)

         return res.status(200).json({
            status:"success",
            message:"logout from all device"
         })
    }catch (error){
        next(error)
    }
}

export { signup, refreshToken, logout  , logoutFromAll , login};
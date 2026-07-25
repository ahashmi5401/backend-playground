import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import AppError from "../utils/appError.js";
import { COOKIE_OPTIONS } from "../utils/cookieOption.js";
import { assignJWT } from "../utils/jwt.js";
import { hashedPassword } from "../utils/passwordHash.js";
import { sessionModel } from "../model/session.model.js";
import { generateOTP, otpHTML } from "../utils/otp.js";
import { OTP } from "../model/otp.model.js";
import { sendEmail } from "../service/email.service.js"
const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            throw new AppError("All fields are required", 400);
        }

        const normalizedEmail = email.trim().toLowerCase();
        const trimmedUsername = username.trim();

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

        const hash = await hashedPassword(password);

        const newUser = new User({
            username: trimmedUsername,
            email: normalizedEmail,
            password: hash,
        });

        await newUser.save();

        console.log("About to generate OTP...");
        let otp = generateOTP()
        console.log("Generated OTP:", otp);

        const html = otpHTML(otp)

        let otpHash = await hashedPassword(otp)
        console.log("User saved");
        await OTP.deleteMany({ email: normalizedEmail }); 
        await OTP.create({
            email: normalizedEmail,
            user: newUser._id,
            otp: otpHash,
        });

        console.log("OTP saved");

        await sendEmail(
            normalizedEmail,
            "OTP VERIFICATION",
            otpHTML(trimmedUsername, otp)
        );

        console.log("Email sent successfully");

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                email,
                username,
                isVerified: newUser.isVerified
            },
            otp: otp // Temporary for testing
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

        if (!req.body.isVerified) throw new AppError("Email not verified")
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


const logoutFromAll = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) throw new AppError("Refresh Token is not found", 400);

        const decode = jwt.verify(refreshToken, process.env.JWT_SECRET)

        const result = await sessionModel.updateMany(
            { user: decode.id, revoked: false }, // 👈 'user' aur 'revoked'
            { revoked: true }                    // 👈 'revoked: true'
        );
        if (result.matchedCount === 0) throw new AppError("No active sessions found or already logged out", 400);

        res.clearCookie("refreshToken", COOKIE_OPTIONS)

        return res.status(200).json({
            status: "success",
            message: "logout from all device"
        })
    } catch (error) {
        next(error)
    }
}

const verifyEmail = async (req, res, next) => {
    try {
        const { otp, email } = req.body;

        console.log("Verify Email - Email:", email);
        console.log("Verify Email - OTP:", otp);

        if (!email || !otp) throw new AppError("both field are required", 401)

        const finduser = await OTP.findOne({ email }).sort({ createdAt: -1 })
        console.log("Verify Email - Found OTP record:", !!finduser);

        if (!finduser) throw new AppError("user not registered", 400)

        console.log("Verify Email - Stored OTP hash:", finduser.otp);

        let isOtpMatch = await bcrypt.compare(otp, finduser.otp)
        console.log("Verify Email - OTP match result:", isOtpMatch);

        if (!isOtpMatch) throw new AppError("otp is invalid or expire ", 400)

        const userUpdate = await User.findByIdAndUpdate(finduser.user, { isVerified: true })

        // Delete OTP after successful verification
        await OTP.deleteOne({ _id: finduser._id });
        return res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: userUpdate,
        });
    } catch (error) {
        next(error)
    }
}

export { signup, refreshToken, logout, logoutFromAll, login, verifyEmail };
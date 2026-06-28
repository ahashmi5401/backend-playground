import Auth from "../model/auth.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const ifUserAlreadyExist = await Auth.findOne({email})
        if(ifUserAlreadyExist){
            return res.status(409).json({
                success:false,
                message:"user already register "
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new Auth({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.cookie("token" , token )

        res.status(201).json({
            message: "User created successfully",
            data:user
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createUser };
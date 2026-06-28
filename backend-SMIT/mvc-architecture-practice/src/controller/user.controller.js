import { userModel } from "../model/auth.model.js";


const userSignup = async (req, res) => { // 1. Yahan 'async' add kiya
    try {
        const newUser = req.body;
        let user = new userModel(newUser);
        
        await user.save(); 

        // Agar bina kisi error ke save ho gaya, to hi success response chalega
        return res.status(201).json({
            status: true, 
            message: "User created successfully",
            createdUser: user
        });

    } catch (error) {
        // 3. Postman ko error response bhejna lazmi hai taake request pending na rahe
        console.log("Error is:", error.message);

        // Mongoose Validation Error (Jaise invalid email ya missing password)
        if (error.name === 'ValidationError') {
            const errorMessages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                status: false,
                message: "Validation failed",
                errors: errorMessages
            });
        }

        // Duplicate Email Error (Mongoose unique: true rule)
        if (error.code === 11000) {
            return res.status(400).json({
                status: false,
                message: "Email already registered"
            });
        }
    }
}


const getUsers =async (req , res ) => {
    try{
      let data = await userModel.find()
      res.status(200).json({
        status:"success",
        message:"data retrieve successfully",
        data : data
      })
    }catch(error){
        console.log("error" , error);
        res.json({
            meassge : error.message
        })
    }
}
export { userSignup , getUsers };

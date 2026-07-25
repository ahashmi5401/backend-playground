import bcrypt from "bcrypt"
const hashedPassword = async (password) => {
    try{
        const genSalt = await  bcrypt.genSalt(10)
        return  await bcrypt.hash(password , genSalt)
    }catch(error){
        console.log("error" , error);
        
    }
}

export {hashedPassword}
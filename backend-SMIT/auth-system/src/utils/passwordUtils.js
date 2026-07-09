import bcrypt from "bcrypt"
const hashedPassword = async(password)=> {
    let salt  =await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password , salt)

    return hashedPassword
}

const comparePassword = async (password , hashedPassword) => {
    let isMatch = await bcrypt.compare(password , hashedPassword);
    return isMatch
}

export {hashedPassword , comparePassword}
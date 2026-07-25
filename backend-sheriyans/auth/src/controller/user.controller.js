
const profile = async (req , res , next ) => {
    try{
        let {_id , email , password , username } = req.user;

        return res.status(200).json({
            success:true,
            message:"profile data fetch sucessfully ",
            profile : {
                _id, 
                email,
                password,
                username
            }
        })
    }catch (error){

        next(error)
}
}

export {profile}
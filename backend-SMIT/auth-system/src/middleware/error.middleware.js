export const errorHandler = (err , req , res , next) => {
    err.statusCode = err.statusCode || 500;

    if(err.code == 11000){
        return res.status(400).json({
            status:false,
            message:"user already registered"
        })
    }

    return res.status(err.statusCode).json({
        status:false,
        message:err.message
    })
}
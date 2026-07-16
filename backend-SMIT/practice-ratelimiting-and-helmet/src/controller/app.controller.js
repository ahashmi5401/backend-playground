

export const getData = (req , res) => {
    return res.status(200).json({
        status:"sucess",
        message:"data fetch successfully"
    })
}

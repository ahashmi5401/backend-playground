
let users = [];

const getUsers = (req , res) => {
    if(users == ""){
        res.status(204).json({
            status :"success",
            message:"data retrieve sucessfull but User Array is Empty",
            data : users
        })
    }else{
        res.status(200).json({
            status:'success',
            message:"data retrieve sucessfully",
            data : users
        })
    }
}
const createUser = (req , res) => {
    const user = req.body;
    if(Object.keys(user).length === 0){
        res.status(400).json({message:"give data username email password"})
    }else{
        users.push(user)
        res.status(201).json({
            status : "sucess",
            message:"User create succefully",
            data : user
        })
    }
}

const updateUser = (req , res) => {

    const {username} = req.params;
    let userFound = false;

    const updatedData = req.body;
    users = users.map(user => {
        if(user.username == username){
            userFound = true
            return { ...user, ...updatedData };
        }
        return user
    })

     if (!userFound) {
        return res.status(404).json({
            status: "fail",
            message: "User not found"
        });
    }

    res.status(200).json({
        status: "success",
        message: "User updated successfully",
        data: users.find(user => user.username == username)
    });
}


const deleteUser = (req , res ) => {
    const {username} = req.params;

    const initialLength = users.length;
    users = users.filter(user => user.username !== username)

    if(users.length === initialLength){
        return res.status(404).json({
            status:"fail",
            message:'user not found'
        })
    }
        res.status(200).json({
        status: "success",
        message: "User deleted successfully"
    });
}
export {createUser , getUsers , updateUser , deleteUser}
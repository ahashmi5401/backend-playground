let users = []


const getUser = (req , res) => {
    res.status(200).json({status: "sucess" , data : users , message : "data fetch succefully"})
}


const createUser = (req , res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ 
            status: "fail", 
            message: "User data cannot be empty" 
        });
    }
    const newUser = { id: Date.now(), ...req.body };
    users.push(newUser);
     res.status(201).json({status: "sucess" , data : req.body , message : "user created succefully"})
}


const updateUser = (req , res) => {
    const {id} = req.params;
    let { email , password} = req.body;

    const user = users.find(u => u.id == id)
    if(email) user.email = email
    if(password) user.password = password

    res.status(200).json({
        status: "success",
        data: user,
        message: "User updated successfully"
    });
    
}


const deleteUser = (req , res) => {
    const {id} = req.params
    const userIndex = users.findIndex(u => u.id == id);

    const deletedUser = users.splice(userIndex, 1)
    res.status(200).json({
        status: "success",
        data : deletedUser,
        message: `User with ID ${id} deleted successfully`
    });
}

module.exports={
    createUser,
    getUser,
    updateUser,
    deleteUser

}
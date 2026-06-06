const postsModel = require('../models/posts.model')
const uploadFile = require('../services/storage.service')

exports.createPost = async (req , res ) => {
    console.log(req)
    const {caption } = req.body;

    //image uplaod send imagekit function bcz it have url 
    console.log(req?.files);
    const image = await uploadFile(req.file.buffer)
    
    await postsModel.create({
        caption,
        image : image?.url
    })

    res.status(201).json({message : "post created succesfully" , post :{caption , image : image.url} })
}

exports.getAllPosts = async (req , res ) => {
    const posts = await postsModel.find()

    res.status(200).json({message :"all post fetch succefully " , post : posts})
}
const mongoose = require('mongoose')


const postsSchema = new mongoose.Schema({
    caption : String,
    image : String
})

const postsModel = mongoose.model('posts' , postsSchema)
module.exports = postsModel
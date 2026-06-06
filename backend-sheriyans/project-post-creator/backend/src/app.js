const express = require('express')
const app = express()


//middleware 
const customCORS = require('./middleware/cors.js')
const upload  = require('./middleware/multer.js')

//controller
const {createPost , getAllPosts} = require('../src/controller/post.controller.js')
//use middleware for json parse to show 
//only work on text 
app.use(express.json())

// 2. Enable CORS with specific options
app.use(customCORS);



///for create post 
//key name dena hai jisme file upload horai hai
app.post('/create-post' ,upload.single("image"), createPost)


//for get all post 
app.get('/posts' , getAllPosts)


module.exports = app

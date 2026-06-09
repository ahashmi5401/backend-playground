const express = require('express')
const {createUser, getUser, updateUser, deleteUser} = require('./controller/user.controller')
const handleParse = require('./middleware/bodyParser')

let app = express();

app.use(handleParse)

app.get('/user' , getUser)


app.post('/user' ,createUser)



app.patch('/user/:id' , updateUser)


app.delete('/user/:id' , deleteUser)


module.exports = app

const express = require(
    'express'
)
const {users , clothes , shoes , medicines, products} = require('../db/db.js')
const app = express()


app.get('/' , (req , res) => {
    res.status(200).send({message : "Home Page"})
})

app.get('/users' , (req , res) => {
    res.status(200).send(users)
})


app.get('/clothes' , (req , res) => {
    res.send(200).send(clothes)
})


app.get('/products' , (req , res) => {
    res.send(200).send(clothes)
})



app.get('/medicines' , (req , res) => {
    res.send(200).send(medicines)
})


app.get('/shoes' , (req , res) => {
    res.send(200).send(shoes)
})



module.exports = app
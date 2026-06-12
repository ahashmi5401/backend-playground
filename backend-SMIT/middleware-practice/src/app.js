import express from "express"
import { getUsers , createUser , updateUser, deleteUser } from "./controller/user.controller.js"
//custom middleware 

import { addInfo } from "./middleware/dataInfo.js"
import morgan from "morgan"

export const app = express()

//morgan for save log
app.use(morgan("combined"))

//middleware for parse the json 
app.use(express.json())

//add additional fifeld in req by using custom middleware
app.use(addInfo)

app.get('/' , (req , res) => {
    res.status(200).json({
        status : "sucess",
        message : "successfully get reponse from '/' endpoint"
    })
})


app.get('/users' , getUsers )

app.post('/users' , createUser)

app.patch('/users/:username' , updateUser)

app.delete('/users/:username' , deleteUser)

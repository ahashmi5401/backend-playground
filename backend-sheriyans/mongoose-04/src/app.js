import express from "express"
import { noteModel } from "./model/notes.model.js";
const app = express();

/*
Api Details Four Api
Post /note => for creating note in db
Patch /note/:idx => for update specific note get from index  in db 
delete /note/:idx => for delete specific note get from index  in db 
get /note => get all notes from db 

*/


//middleware for read upcoing data from request 
app.use(express.json())

app.post("/note" , async (req , res ) => {
    let {title , description}= req.body
    await noteModel.create({
        title, 
        description
    })

    res.status(201).json({message : "note was created succefully" , note : req.body})
})


//find() => [{} , {}] or []
//findOne() => {} or null 
app.get("/note" , async (req , res ) => {
    //find method ka kaam sare note ko la kar rkh do response me  
    //find return only
    const notes = await noteModel.find()
     res.status(200).json({message : "fetch all notes sucessfully" , notes : notes})


     //if example title match with other note sotr ein db so it return mtach title obj 
     ///const specificNote = await noteModel.findOne({title : "check "}) -> only written one 
})


app.delete('/note/:id' , async (req, res ) => {
    let id = req.params.id;

    //it find and then delete after cheking the id 
    const deletedNote = await noteModel.findOneAndDelete({ _id: id });

    if(!deletedNote){
        res.status(404).json({
            success : false,
            message : "Note Not Found"
        })
    }
    res.status(200).json({message:'Note Deleted Successfully ' ,  deletedNote})
})


app.patch("/note/:id", async (req , res ) => {
    const id = req.params.id
    let description = req.body.description;
    let title = req.body.title;


    //2 obj mangta hai ye method one to check kiske basis pe or 2nd for kiya update krna hai 
    const updatedNote = await noteModel.findOneAndUpdate({
        _id : id
    }, {
        title,
        description
    })
    if(!updatedNote){
        res.status(404).json({
            status : false,
            message : "Update fail Note No found "
        })
    }

    res.status(200).json({
        message : "Note Update Sucessfully ",
        updatedNote : updatedNote
    })
})
export default app;


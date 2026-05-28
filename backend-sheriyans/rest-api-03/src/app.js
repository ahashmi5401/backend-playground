//aapp.js main purpose to create server

const express = require('express')

const notes = [];


 const app = express();


//app.use(express.json()) // to parse json data from request body 
//middleware hai json data ko parse karne ke liye express.json() middleware use karte hai
app.use(express.json())

//for create note
app.post("/notes" , (req , res ) => {
        notes.push(req.body)
        return res.status(201).json({message : "note created successfully" , note : req.body})
})


//for get all notes
app.get("/notes" , (req , res) => {
    res.status(200).json({message : "fetch all notes sucessfully" , notes : notes})
})


//for delete note 
app.delete("/notes/:idx" , (req , res) => {
    //get the dynamic value of id 
    const index = req.params.idx;
    
    if (isNaN(index) || index < 0 || index >= notes.length) {
        return res.status(404).json({ error: "Note not found" });
    }

// Splice ka matlab: is index se shuru karo aur 1 item delete kar do
    const deletedNote = notes.splice(index, 1);

    return res.status(200).json({ 
        message: `Note at index ${index} was deleted successfully`, 
        deletedNote: deletedNote[0] 
    });
})


//for update note 
app.patch('/notes/:idx' , (req , res) => {
    const index = req.params.idx;
    
    console.log(req.body.description);
    
    if (!req.body) {
        return res.status(400).json({ error: 'Missing note object in request body' });
    }

    const description = req.body.description;
    notes[index].description = description

    const title = req.body.title;
    notes[index].title = title

    res.status(200).json({ message: 'note updated successfully' });
});

module.exports = app;

//also can use export but t use we need to change type in package.json type module 

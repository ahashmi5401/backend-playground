const express = require('express');


//server instance creation and initialization
const app = express();


//routing 
//jo bhi data front end se ane wala hai usai use karne ke liya ham request ka use karenge 
// jo bhi hamai data send karna hai us mai hum response ka use karenge 
//response is backend se frontend pe data bhejna 
//have some more methon like send is one of them
app.get("/" , (req , res)=> {
    res.send('HomePage');
})

app.get("/about" , (req , res ) => {
    res.send("About Page")
})

app.get("/services" , (req  , res) => {
    res.send("Services Page")
})

app.get("/contact" , (req , res ) => {
    res.send("Contact Page")
})



//start the server
app.listen(3000 , () => {
    console.log('Server is running on port 3000');
})
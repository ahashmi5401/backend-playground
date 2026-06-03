const http = require('http');

let server = http.createServer((req , res) => {
   let path = req.url
   if(path == "/"){
    res.end("Home Page")
   }else if (path == "about"){
    res.end("About Page")
   }else if(path == "contact"){
    res.end("Contact Page")
   }else if (path == "services"){
    res.end("service page")
   }else{
    res.end("404 page not found")
   }
})

module.exports ={
    server
}
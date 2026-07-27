import express from "express"
import fs, { createWriteStream } from "fs"
import zlib from "zlib"

let app = express()

app.use(express.json())

// sab data aik sath load hojayega memory pe load pare ga 
// app.get("/", (req, res) => {
//     fs.readFile('./sample.txt', "utf-8", (error, data) => {
//         if (error) {
//             console.error('Error reading file:', err);
//             return;
//         }
//         res.send(data)
//     })
// })



//zip kaise banaye aik file ka bina zada  memory usage ke 
//Stream (read file) => zlib for zip => and then write 
//pipe ka matlb jo bhi data ayega wo pipe se jaye ga 

fs.createReadStream('./sample.txt').pipe(zlib.createGzip().pipe(createWriteStream('./sample.zip')))
// streaming chunk me load karna or res bhi chunk me bhejte rehna 
app.get("/" , (req , res) => {
    const stream = fs.createReadStream('./sample.txt' , "utf-8")

    stream.on('data' , (chunk) =>{
        console.log(chunk);
       res.write(chunk )
        
    })
    stream.on('end' , ()=>{
        res.end()
    })
})

app.listen(3000, () => {
    console.log("server is listening on port 3000");

})
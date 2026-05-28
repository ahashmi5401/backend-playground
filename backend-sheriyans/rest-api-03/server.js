//server.js main purpose to start server import from app.js 

//also use this but if we set module in json
// import { app } from './src/app'


let app = require("./src/app")



app.listen(3000 , () => {
console.log('server is running on port 3000')
}) 


let {server} = require('./src/index.js')

server.listen(3000  , (req , res ) => {
    console.log("server is listening on port 3000")
})
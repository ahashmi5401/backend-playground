const cors = require('cors')

const corsOption = {
    origin : 'http://localhost:5173',
    methoda : ['GET' , 'PATCH' , 'DELETE' , 'PUT' , 'POST'],
    credentials : true
}


const corsMiddleware = cors(corsOption)

module.exports = corsMiddleware
const multer = require('multer')
//multer media bcz we send  form-data need to install npm i multer 

const upload = multer({storage : multer.memoryStorage()})


module.exports = upload
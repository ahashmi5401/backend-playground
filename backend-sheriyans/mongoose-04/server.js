import app from './src/app.js'
import { connectDB } from './src/db/db.js'

//call the connnection function 
connectDB()
app.listen(3000 , () => {
    console.log('sever is running on port 3000')
})
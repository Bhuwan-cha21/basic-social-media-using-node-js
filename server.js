const express = require('express')

const connectDB = require('./database/connection')
const userRoute = require('./routes/user')
const socialRoute = require('./routes/social')
const dotenv = require('dotenv')
dotenv.config()


const app = express()
connectDB()

app.use(express.json())
app.use("/api/users", userRoute)
app.use("/api/social", socialRoute)
app.get('/' , (req,res) =>{
    res.send('bhuwan')
})
app.listen(3000)
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')


const app = express()
app.use(express.json())
dotenv.config()

const authRouter = require('./routes/auth')
app.use('/api/auth', authRouter)

const clientRouter = require('./routes/client')
app.use('/api/client', clientRouter)


mongoose.connect(process.env.MONGO_URI)
    .then(() => { console.log("MongoDb Connected") })
    .catch(err => console.log(err));

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}.`)
})
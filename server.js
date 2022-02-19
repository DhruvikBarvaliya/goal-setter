const dotenv = require('dotenv').config()
const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
connectDB()
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
const port = process.env.PORT || 4000

app.use('/api/goals', require('./routes/goalRouter'))
app.use('/api/users', require('./routes/userRoute'))
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is Running on Port No :${port}`)
})
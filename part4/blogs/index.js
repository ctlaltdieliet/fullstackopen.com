const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
require('dotenv').config()

const mongoUrl = process.env.NODE_ENV === 'test'   ? process.env.TEST_MONGODB_URI  : process.env.MONGODB_URI
console.log("mongoUrl is",mongoUrl)
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.listen(3003)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)


app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
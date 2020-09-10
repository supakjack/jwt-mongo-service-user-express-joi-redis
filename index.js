const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
require('dotenv').config()
require('./helpers/init_mongodb')
require('./helpers/init_redis')
const { verifyAccessToken } = require('./helpers/jwt_helper')

const userRoute = require('./routers/userRoute')
const authRoute = require('./routers/authRoute')
const serviceRoute = require('./routers/serviceRoute')

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', verifyAccessToken, async (req, res, next) => {
  const data = 'Hello From Auth Atlas'
  res.send({ data })
})

app.use('/user', verifyAccessToken, userRoute)
app.use('/service', verifyAccessToken, serviceRoute)
app.use('/auth', authRoute)

app.use(async (req, res, next) => {
  next(createError.NotFound())
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

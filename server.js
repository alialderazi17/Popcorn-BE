const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const mediaRouter = require('./routes/mediaRouter')
const PORT = process.env.PORT || 3000
const db = require('./db')
const app = express()
const authRouter = require('./routes/authRouter')
const genreRouter = require('./routes/genreRouter')
const mediaListRouter = require('./routes/mediaListRouter')
const userRouter = require('./routes/userRouter')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/auth', authRouter)
app.use('/media', mediaRouter)
app.use('/genres', genreRouter)
app.use('/watchlist', mediaListRouter)
app.use('/user', userRouter)
app.get('/', (req, res) => {
  res.send('Server is running!')
})

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`)
})

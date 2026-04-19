const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
require("dotenv").config()
// const authRouter = require("./routes/authRouter")
const mediaRouter = require("./routes/mediaRouter")
const PORT = process.env.PORT || 3000
const db = require("./db")
const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/media", mediaRouter)

app.get("/", (req, res) => {
  res.send("Server is running!")
})

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`)
})

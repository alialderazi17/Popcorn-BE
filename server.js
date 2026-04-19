const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
require("dotenv").config()

const PORT = process.env.PORT || 3000

const db = require("./db")
const app = express()

const mediaRouter = require("./routes/MediaRouter")
const genreRouter = require("./routes/genreRouter")

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/media", mediaRouter)
app.use("/genres", genreRouter)

app.get("/", (req, res) => {
  res.send("Server is running!")
})

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`)
})

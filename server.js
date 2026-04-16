const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
  res.send("Server is running!")
})

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`)
})

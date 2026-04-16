const mongoose = require("mongoose")
require("dotenv").config({ quiet: true })
const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])
mongoose.set("strictQuery", false)

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Successfully connected to MongoDB . . . ")
  } catch (error) {
    console.error("Connection error", error.message)
  }
}

connect()

const db = mongoose.connection

module.exports = db

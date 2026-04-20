const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    popularity: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Genre', genreSchema)

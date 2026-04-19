const { Schema, default: mongoose } = require("mongoose")

const GenreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    popularity: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Genre", GenreSchema)

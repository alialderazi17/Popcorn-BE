const mongoose = require('mongoose')

const mediaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    releaseDate: {
      type: Date,
      required: true
    },
    mediaType: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    genre: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Media', mediaSchema)

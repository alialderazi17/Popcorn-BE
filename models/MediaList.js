const mongoose = require('mongoose')

const mediaListSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    dateAdded: {
      type: Date,
      required: true
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media',
        required: false
      }
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('MediaList', mediaListSchema)

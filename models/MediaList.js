const mongoose = require('mongoose')

const mediaListSchema = new mongoose.Schema(
  {
    items: [
      {
        media: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Media',
          required: false,
          unique: true,
        },
        status: { type: String },
        userRating: { type: String },
        dateAdded: { type: Date, default: Date.now },
        description: { type: String },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('MediaList', mediaListSchema)

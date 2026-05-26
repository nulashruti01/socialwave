const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: {
      type: String,
      default: '',
    },
    mediaUrl: [
      {
        type: String,
      },
    ],
    mediaType: [
      {
        type: String,
        enum: ['image', 'video', 'reel', 'audio'],
      },
    ],
    readAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);

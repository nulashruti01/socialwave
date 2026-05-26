const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
      default: null,
    },
    lastMessageAt: {
      type: Date,
      default: null,
    },
    waveRoom: {
      isActive: { type: Boolean, default: false },
      audioSnippets: [{
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        audioUrl: { type: String, required: true },
        caption: { type: String, default: '' },
        duration: { type: Number, default: 0 },
        pinned: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
      }],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Conversation', conversationSchema);

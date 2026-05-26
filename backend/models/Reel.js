const mongoose = require('mongoose');

const reelCommentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true, maxlength: 500 },
  },
  { timestamps: true }
);

const reelSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    videoUrl: {
      type: String,
      required: [true, 'Video URL is required'],
    },
    caption: {
      type: String,
      default: '',
      maxlength: [500, 'Caption cannot exceed 500 characters'],
    },
    thumbnail: {
      type: String,
      default: '',
    },
    duration: {
      type: Number,
      required: true,
      min: 15,
      max: 60,
    },
    originalReel: { type: mongoose.Schema.Types.ObjectId, ref: 'Reel' },
    sourceCredit: { type: String, default: '' },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [reelCommentSchema],
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reel', reelSchema);

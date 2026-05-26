const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, maxlength: 500, default: '' },
  encryptedText: { type: String, default: '' },
  isGhost: { type: Boolean, default: false },
  expiresAt: { type: Date },
  readAt: { type: Date, default: null },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  replies: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, maxlength: 300 },
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, maxlength: 2200 },
  images: [{ type: String }],
  type: { type: String, enum: ['post', 'reel', 'gif', 'remix'], default: 'post' },
  hashtags: [{ type: String }],
  location: { type: String, default: '' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [commentSchema],
  saves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  views: { type: Number, default: 0 },
  remix: {
    sourceReel: { type: mongoose.Schema.Types.ObjectId, ref: 'Reel' },
    type: { type: String, enum: ['static', 'gif', 'interactive'], default: null },
    timestampStart: { type: Number, default: null },
    timestampEnd: { type: Number, default: null },
    credit: { type: String, default: '' },
  },
  sharedSpace: {
    isShared: { type: Boolean, default: false },
    coAuthors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    updates: [{
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      content: { type: String, maxlength: 2200, default: '' },
      images: [{ type: String }],
      createdAt: { type: Date, default: Date.now }
    }]
  },
  isArchived: { type: Boolean, default: false },
}, { timestamps: true });

postSchema.pre('save', function(next) {
  if (this.content) {
    const tags = this.content.match(/#\w+/g);
    this.hashtags = tags ? tags.map(t => t.toLowerCase()) : [];
  }
  next();
});

module.exports = mongoose.model('Post', postSchema);

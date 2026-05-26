const Reel = require('../models/Reel');

const getReels = async (req, res) => {
  try {
    const userIds = [...req.user.following, req.user._id];
    const reels = await Reel.find({ author: { $in: userIds } })
      .populate('author', 'username avatar')
      .populate('comments.user', 'username avatar')
      .sort({ createdAt: -1 })
      .limit(50);
    res.json({ reels });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

const createReel = async (req, res) => {
  try {
    const { videoUrl, caption, thumbnail, duration } = req.body;

    if (!videoUrl) {
      return res.status(400).json({ message: 'Video URL is required.' });
    }

    if (!duration || duration < 15 || duration > 60) {
      return res.status(400).json({ message: 'Video duration must be between 15-60 seconds.' });
    }

    const reel = await Reel.create({
      author: req.user._id,
      videoUrl,
      caption: caption || '',
      thumbnail: thumbnail || '',
      duration,
    });

    await reel.populate('author', 'username avatar');
    res.status(201).json({ reel });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

const getReel = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id)
      .populate('author', 'username avatar')
      .populate('comments.user', 'username avatar');

    if (!reel) return res.status(404).json({ message: 'Reel not found.' });

    reel.views += 1;
    await reel.save();

    res.json({ reel });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

const deleteReel = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);

    if (!reel) return res.status(404).json({ message: 'Reel not found.' });

    if (reel.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this reel.' });
    }

    await reel.deleteOne();
    res.json({ message: 'Reel deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

const toggleLikeReel = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);

    if (!reel) return res.status(404).json({ message: 'Reel not found.' });

    const isLiked = reel.likes.includes(req.user._id);

    if (isLiked) {
      reel.likes.pull(req.user._id);
    } else {
      reel.likes.push(req.user._id);
    }

    await reel.save();
    res.json({ likes: reel.likes, liked: !isLiked });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

const addReelComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ message: 'Comment cannot be empty.' });
    }

    const reel = await Reel.findById(req.params.id);

    if (!reel) return res.status(404).json({ message: 'Reel not found.' });

    reel.comments.push({ user: req.user._id, text });
    await reel.save();
    await reel.populate('comments.user', 'username avatar');

    const newComment = reel.comments[reel.comments.length - 1];
    res.status(201).json({ comment: newComment });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

const deleteReelComment = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);

    if (!reel) return res.status(404).json({ message: 'Reel not found.' });

    const comment = reel.comments.id(req.params.commentId);

    if (!comment) return res.status(404).json({ message: 'Comment not found.' });

    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this comment.' });
    }

    reel.comments.pull(req.params.commentId);
    await reel.save();
    res.json({ message: 'Comment deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

module.exports = {
  getReels,
  createReel,
  getReel,
  deleteReel,
  toggleLikeReel,
  addReelComment,
  deleteReelComment,
};

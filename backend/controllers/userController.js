const User = require('../models/User');
const Post = require('../models/Post');

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .populate('followers', 'username avatar fullName isVerified')
      .populate('following', 'username avatar fullName isVerified');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    const posts = await Post.find({ author: user._id, isArchived: false })
      .populate('author', 'username avatar isVerified')
      .populate('comments.user', 'username avatar')
      .sort({ createdAt: -1 });
    res.json({ user, posts });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const updateProfile = async (req, res) => {
  try {
    const { bio, avatar, fullName, website, isPrivate } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { bio, avatar, fullName, website, isPrivate }, { new: true });
    res.json({ user });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const toggleFollow = async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString()) return res.status(400).json({ message: 'Cannot follow yourself.' });
    const target = await User.findById(req.params.id);
    if (!target) return res.status(404).json({ message: 'User not found.' });
    const current = await User.findById(req.user._id);
    const isFollowing = current.following.includes(req.params.id);
    if (isFollowing) {
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: req.params.id } });
      await User.findByIdAndUpdate(req.params.id, { $pull: { followers: req.user._id } });
      res.json({ following: false });
    } else {
      await User.findByIdAndUpdate(req.user._id, { $push: { following: req.params.id } });
      await User.findByIdAndUpdate(req.params.id, { $push: { followers: req.user._id } });
      res.json({ following: true });
    }
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json({ users: [] });
    const users = await User.find({
      $or: [{ username: { $regex: q, $options: 'i' } }, { fullName: { $regex: q, $options: 'i' } }],
      _id: { $ne: req.user._id }
    }).select('username avatar fullName bio isVerified').limit(15);
    res.json({ users });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const getSuggestedUsers = async (req, res) => {
  try {
    const current = await User.findById(req.user._id);
    const users = await User.find({
      _id: { $ne: req.user._id, $nin: current.following },
    }).select('username avatar fullName isVerified followers').limit(8);
    res.json({ users });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const toggleSavePost = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const postId = req.params.postId;
    const isSaved = user.savedPosts.includes(postId);
    if (isSaved) {
      await User.findByIdAndUpdate(req.user._id, { $pull: { savedPosts: postId } });
      res.json({ saved: false });
    } else {
      await User.findByIdAndUpdate(req.user._id, { $push: { savedPosts: postId } });
      res.json({ saved: true });
    }
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const getSavedPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'savedPosts',
      populate: { path: 'author', select: 'username avatar isVerified' }
    });
    res.json({ posts: user.savedPosts });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = { getUserProfile, updateProfile, toggleFollow, searchUsers, getSuggestedUsers, toggleSavePost, getSavedPosts };

const Post = require('../models/Post');
const Reel = require('../models/Reel');
const Notification = require('../models/Notification');

const filterGhostComments = (posts, currentUserId) => {
  const now = new Date();
  return posts.map((post) => {
    if (!post.comments) return post;
    const comments = post.comments.filter((comment) => {
      if (!comment.isGhost) return true;
      if (comment.user.toString() === currentUserId.toString()) return true;
      if (post.author.toString() !== currentUserId.toString()) return false;
      if (comment.expiresAt && comment.expiresAt <= now) return false;
      return true;
    });
    return { ...post.toObject ? post.toObject() : post, comments };
  });
};

const getFeed = async (req, res) => {
  try {
    const ids = [...req.user.following, req.user._id];
    const posts = await Post.find({ author: { $in: ids }, isArchived: false })
      .populate('author', 'username avatar fullName isVerified')
      .populate('comments.user', 'username avatar')
      .sort({ createdAt: -1 }).limit(50);
    res.json({ posts: filterGhostComments(posts, req.user._id) });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

const getExplorePosts = async (req, res) => {
  try {
    const posts = await Post.find({ isArchived: false })
      .populate('author', 'username avatar isVerified')
      .sort({ likes: -1, createdAt: -1 }).limit(60);
    res.json({ posts });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

const getTrendingHashtags = async (req, res) => {
  try {
    const result = await Post.aggregate([
      { $unwind: '$hashtags' },
      { $group: { _id: '$hashtags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    res.json({ hashtags: result });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

const getPostsByHashtag = async (req, res) => {
  try {
    const posts = await Post.find({ hashtags: req.params.tag.toLowerCase(), isArchived: false })
      .populate('author', 'username avatar isVerified')
      .sort({ createdAt: -1 }).limit(30);
    res.json({ posts });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

const createPost = async (req, res) => {
  try {
    const { content, images, location, type } = req.body;
    if (!content && (!images || images.length === 0)) return res.status(400).json({ message: 'Content or image required.' });
    const post = await Post.create({ author: req.user._id, content, images: images || [], location, type: type || 'post' });
    await post.populate('author', 'username avatar fullName isVerified');
    res.status(201).json({ post });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

const createRemixPost = async (req, res) => {
  try {
    const { reelId, content, type, timestampStart, timestampEnd } = req.body;
    if (!reelId || !type) {
      return res.status(400).json({ message: 'Reel ID and remix type are required.' });
    }
    const reel = await Reel.findById(reelId).populate('author', 'username');
    if (!reel) return res.status(404).json({ message: 'Source reel not found.' });
    const credit = `Remixed from @${reel.author.username}`;
    const post = await Post.create({
      author: req.user._id,
      content: content || '',
      images: [],
      type: 'remix',
      remix: {
        sourceReel: reel._id,
        type,
        timestampStart: timestampStart || 0,
        timestampEnd: timestampEnd || reel.duration,
        credit,
      },
    });
    await post.populate('author', 'username avatar fullName isVerified');
    res.status(201).json({ post });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

const createSharedSpacePost = async (req, res) => {
  try {
    const { content, images, coAuthors } = req.body;
    if (!content && (!images || images.length === 0)) return res.status(400).json({ message: 'Shared post requires content or image.' });
    const post = await Post.create({
      author: req.user._id,
      content: content || '',
      images: images || [],
      type: 'post',
      sharedSpace: {
        isShared: true,
        coAuthors: Array.isArray(coAuthors) ? coAuthors : [],
        updates: [],
      },
    });
    await post.populate('author', 'username avatar fullName isVerified');
    res.status(201).json({ post });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

const addSharedSpaceUpdate = async (req, res) => {
  try {
    const { content, images } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found.' });
    if (!post.sharedSpace?.isShared) return res.status(400).json({ message: 'Not a shared space post.' });
    const allowed = [post.author.toString(), ...(post.sharedSpace.coAuthors || []).map((id) => id.toString())];
    if (!allowed.includes(req.user._id.toString())) return res.status(403).json({ message: 'Not authorized.' });
    post.sharedSpace.updates.push({
      author: req.user._id,
      content: content || '',
      images: images || [],
    });
    await post.save();
    await post.populate('author', 'username avatar fullName isVerified');
    res.status(201).json({ post });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

const addGhostComment = async (req, res) => {
  try {
    const { text, expiresIn } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found.' });
    if (!text || !text.trim()) return res.status(400).json({ message: 'Comment text is required.' });
    const payload = {
      user: req.user._id,
      text,
      isGhost: true,
      expiresAt: expiresIn ? new Date(Date.now() + expiresIn * 1000) : new Date(Date.now() + 60000),
    };
    post.comments.push(payload);
    await post.save();
    await post.populate('comments.user', 'username avatar');
    res.status(201).json({ comment: post.comments[post.comments.length - 1] });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

const markGhostCommentRead = async (req, res) => {
  try {
    const { commentId } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found.' });
    if (post.author.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Only post owner can read ghost comments.' });
    const comment = post.comments.id(commentId);
    if (!comment || !comment.isGhost) return res.status(404).json({ message: 'Ghost comment not found.' });
    comment.readAt = new Date();
    comment.expiresAt = new Date(Date.now() + 60000);
    await post.save();
    res.json({ comment });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found.' });
    if (post.author.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not authorized.' });
    await post.deleteOne();
    res.json({ message: 'Deleted.' });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found.' });
    const isLiked = post.likes.includes(req.user._id);
    if (isLiked) { post.likes.pull(req.user._id); }
    else {
      post.likes.push(req.user._id);
      if (post.author.toString() !== req.user._id.toString()) {
        await Notification.create({ recipient: post.author, sender: req.user._id, type: 'like', post: post._id });
      }
    }
    await post.save();
    res.json({ likes: post.likes, liked: !isLiked });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) return res.status(400).json({ message: 'Comment required.' });
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found.' });
    post.comments.push({ user: req.user._id, text });
    await post.save();
    await post.populate('comments.user', 'username avatar isVerified');
    if (post.author.toString() !== req.user._id.toString()) {
      await Notification.create({ recipient: post.author, sender: req.user._id, type: 'comment', post: post._id });
    }
    res.status(201).json({ comment: post.comments[post.comments.length - 1] });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found.' });
    const comment = post.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found.' });
    if (comment.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not authorized.' });
    post.comments.pull(req.params.commentId);
    await post.save();
    res.json({ message: 'Deleted.' });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

module.exports = {
  getFeed,
  getExplorePosts,
  getTrendingHashtags,
  getPostsByHashtag,
  createPost,
  createRemixPost,
  createSharedSpacePost,
  addSharedSpaceUpdate,
  addGhostComment,
  markGhostCommentRead,
  deletePost,
  toggleLike,
  addComment,
  deleteComment,
};

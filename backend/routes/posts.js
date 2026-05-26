const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/postController');
const { protect } = require('../middleware/auth');
router.get('/feed', protect, getFeed);
router.get('/explore', protect, getExplorePosts);
router.get('/trending', protect, getTrendingHashtags);
router.get('/hashtag/:tag', protect, getPostsByHashtag);
router.post('/', protect, createPost);
router.post('/remix', protect, createRemixPost);
router.post('/shared', protect, createSharedSpacePost);
router.post('/:id/shared-update', protect, addSharedSpaceUpdate);
router.post('/:id/ghost-comment', protect, addGhostComment);
router.post('/:id/ghost-comment/read', protect, markGhostCommentRead);
router.delete('/:id', protect, deletePost);
router.post('/:id/like', protect, toggleLike);
router.post('/:id/comments', protect, addComment);
router.delete('/:id/comments/:commentId', protect, deleteComment);
module.exports = router;

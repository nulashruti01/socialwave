const express = require('express');
const router = express.Router();
const {
  getReels,
  createReel,
  getReel,
  deleteReel,
  toggleLikeReel,
  addReelComment,
  deleteReelComment,
} = require('../controllers/reelController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getReels);
router.post('/', protect, createReel);
router.get('/:id', protect, getReel);
router.delete('/:id', protect, deleteReel);
router.post('/:id/like', protect, toggleLikeReel);
router.post('/:id/comments', protect, addReelComment);
router.delete('/:id/comments/:commentId', protect, deleteReelComment);

module.exports = router;

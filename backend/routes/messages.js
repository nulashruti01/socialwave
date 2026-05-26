const express = require('express');
const router = express.Router();
const {
  sendMessage,
  getConversation,
  getConversations,
  markAsRead,
  deleteMessage,
} = require('../controllers/messageController');
const { protect } = require('../middleware/auth');

router.post('/', protect, (req, res) => {
  const io = req.app.get('io');
  sendMessage(req, res, io);
});

router.get('/conversations', protect, getConversations);
router.get('/:userId', protect, getConversation);
router.put('/:id/read', protect, markAsRead);
router.delete('/:id', protect, deleteMessage);

module.exports = router;

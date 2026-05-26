const Notification = require('../models/Notification');

const getNotifications = async (req, res) => {
  try {
    const notifs = await Notification.find({ recipient: req.user._id })
      .populate('sender', 'username avatar isVerified')
      .populate('post', 'images content')
      .sort({ createdAt: -1 }).limit(50);
    res.json({ notifications: notifs });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

const markRead = async (req, res) => {
  try {
    await Notification.updateMany({ recipient: req.user._id }, { isRead: true });
    res.json({ message: 'Marked read.' });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

module.exports = { getNotifications, markRead };

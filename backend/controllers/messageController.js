const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const User = require('../models/User');

const sendMessage = async (req, res, io) => {
  try {
    const { receiverId, content, mediaUrl, mediaType } = req.body;

    if (!receiverId) {
      return res.status(400).json({ message: 'Receiver ID is required.' });
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found.' });
    }

    if (!content && (!mediaUrl || mediaUrl.length === 0)) {
      return res.status(400).json({ message: 'Message content or media is required.' });
    }

    const message = await Message.create({
      sender: req.user._id,
      receiver: receiverId,
      content: content || '',
      mediaUrl: mediaUrl || [],
      mediaType: mediaType || [],
    });

    await message.populate('sender', 'username avatar');

    const participants = [req.user._id, receiverId].map(id => id.toString()).sort().join('-');

    let conversation = await Conversation.findOne({
      participants: { $all: [req.user._id, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [req.user._id, receiverId],
        lastMessage: message._id,
        lastMessageAt: new Date(),
      });
    } else {
      conversation.lastMessage = message._id;
      conversation.lastMessageAt = new Date();
      await conversation.save();
    }

    if (io) {
      io.to(`user_${receiverId}`).emit('message:receive', {
        message: message.toObject(),
      });
    }

    res.status(201).json({ message });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

const getConversation = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id },
      ],
    })
      .populate('sender', 'username avatar')
      .populate('receiver', 'username avatar')
      .sort({ createdAt: 1 })
      .limit(50);

    res.json({ messages });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user._id,
    })
      .populate('participants', 'username avatar')
      .populate({
        path: 'lastMessage',
        populate: { path: 'sender', select: 'username' },
      })
      .sort({ lastMessageAt: -1 });

    res.json({ conversations });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found.' });
    }

    if (message.receiver.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to read this message.' });
    }

    message.readAt = new Date();
    await message.save();

    res.json({ message });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found.' });
    }

    if (message.sender.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this message.' });
    }

    await message.deleteOne();
    res.json({ message: 'Message deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

module.exports = {
  sendMessage,
  getConversation,
  getConversations,
  markAsRead,
  deleteMessage,
};

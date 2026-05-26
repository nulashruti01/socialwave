const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

const formatUser = (user) => ({
  _id: user._id, username: user.username, email: user.email,
  fullName: user.fullName, bio: user.bio, website: user.website,
  avatar: user.avatar, isVerified: user.isVerified, isPrivate: user.isPrivate,
  followers: user.followers, following: user.following, savedPosts: user.savedPosts,
});

const register = async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;
    if (!username || !email || !password) return res.status(400).json({ message: 'All fields required.' });

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await User.findOne({ $or: [{ email: normalizedEmail }, { username }] });
    if (existing) return res.status(400).json({ message: existing.email === normalizedEmail ? 'Email in use.' : 'Username taken.' });

    const user = await User.create({ username, email: normalizedEmail, password, fullName: fullName || '' });
    res.status(201).json({ token: generateToken(user._id), user: formatUser(user) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    res.json({ token: generateToken(user._id), user: formatUser(user) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMe = async (req, res) => res.json({ user: req.user });

module.exports = { register, login, getMe };

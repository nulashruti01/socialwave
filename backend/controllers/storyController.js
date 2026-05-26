const Story = require('../models/Story');

const getStories = async (req, res) => {
  try {
    const ids = [...req.user.following, req.user._id];
    const stories = await Story.find({ author: { $in: ids }, expiresAt: { $gt: new Date() } })
      .populate('author', 'username avatar isVerified')
      .sort({ createdAt: -1 });
    const grouped = {};
    stories.forEach(s => {
      const uid = s.author._id.toString();
      if (!grouped[uid]) grouped[uid] = { user: s.author, stories: [], hasUnseen: false };
      grouped[uid].stories.push(s);
      if (!s.viewers.includes(req.user._id)) grouped[uid].hasUnseen = true;
    });
    res.json({ stories: Object.values(grouped) });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

const createStory = async (req, res) => {
  try {
    const { image, caption } = req.body;
    if (!image) return res.status(400).json({ message: 'Image required.' });
    const story = await Story.create({ author: req.user._id, image, caption });
    await story.populate('author', 'username avatar isVerified');
    res.status(201).json({ story });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

const viewStory = async (req, res) => {
  try {
    await Story.findByIdAndUpdate(req.params.id, { $addToSet: { viewers: req.user._id } });
    res.json({ message: 'Viewed.' });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

module.exports = { getStories, createStory, viewStory };

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const reelRoutes = require('./routes/reels');
const messageRoutes = require('./routes/messages');
const storyRoutes = require('./routes/stories');
const notificationRoutes = require('./routes/notifications');

const app = express();
const server = http.createServer(app);
const CLIENT_URL = process.env.CLIENT_URL || '';
const corsOptions = {
  origin: process.env.NODE_ENV === 'development' ? true : CLIENT_URL,
  credentials: true,
};

const io = new Server(server, { cors: corsOptions });

app.set('io', io);

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/reels', reelRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/notifications', notificationRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK', message: 'SocialWave API running' }));

// Socket.io connection
io.on('connection', (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  socket.on('user:online', (userId) => {
    socket.join(`user_${userId}`);
    console.log(`📱 User ${userId} joined room`);
  });

  socket.on('message:typing', (data) => {
    io.to(`user_${data.receiverId}`).emit('user:typing', {
      senderId: data.senderId,
      senderName: data.senderName,
    });
  });

  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
module.exports = app;

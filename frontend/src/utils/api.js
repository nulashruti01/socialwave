import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL ||"https://socialwave-wlqe.onrender.com",
  withCredentials: true,
});

// Posts
export const fetchFeed = () => api.get('/posts/feed');
export const fetchAllPosts = () => api.get('/posts');
export const createPost = (content) => api.post('/posts', { content });
export const deletePost = (id) => api.delete(`/posts/${id}`);
export const toggleLike = (id) => api.post(`/posts/${id}/like`);
export const addComment = (id, text) => api.post(`/posts/${id}/comments`, { text });
export const deleteComment = (postId, commentId) => api.delete(`/posts/${postId}/comments/${commentId}`);

// Reels
export const fetchReels = () => api.get('/reels');
export const createReel = (videoUrl, caption, thumbnail, duration) =>
  api.post('/reels', { videoUrl, caption, thumbnail, duration });
export const deleteReel = (id) => api.delete(`/reels/${id}`);
export const toggleLikeReel = (id) => api.post(`/reels/${id}/like`);
export const addReelComment = (id, text) => api.post(`/reels/${id}/comments`, { text });
export const deleteReelComment = (reelId, commentId) => api.delete(`/reels/${reelId}/comments/${commentId}`);
export const getReel = (id) => api.get(`/reels/${id}`);

// Messages
export const sendMessage = (receiverId, content, mediaUrl, mediaType) =>
  api.post('/messages', { receiverId, content, mediaUrl, mediaType });
export const fetchConversation = (userId) => api.get(`/messages/${userId}`);
export const fetchConversations = () => api.get('/messages/conversations');
export const markMessageAsRead = (messageId) => api.put(`/messages/${messageId}/read`);
export const deleteMessage = (id) => api.delete(`/messages/${id}`);

// Users
export const getUserProfile = (username) => api.get(`/users/${username}`);
export const updateProfile = (data) => api.put('/users/profile', data);
export const toggleFollow = (id) => api.post(`/users/${id}/follow`);
export const searchUsers = (q) => api.get(`/users/search?q=${q}`);

export default api;


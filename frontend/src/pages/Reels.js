import React, { useState, useEffect } from 'react';
import { fetchReels, toggleLikeReel, addReelComment, deleteReel } from '../utils/api';
import ReelCard from '../components/ReelCard';
import '../styles/Reels.css';

const Reels = () => {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    loadReels();
  }, []);

  const loadReels = async () => {
    try {
      const { data } = await fetchReels();
      setReels(data.reels || []);
    } catch (error) {
      console.error('Error loading reels:', error);
      alert('Failed to load reels');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (reelId, isLiked) => {
    try {
      await toggleLikeReel(reelId);
      setReels(reels.map(r =>
        r._id === reelId
          ? { ...r, likes: isLiked ? r.likes.filter(id => id !== reelId) : [...r.likes, reelId] }
          : r
      ));
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleDeleteReel = async (reelId) => {
    if (window.confirm('Delete this reel?')) {
      try {
        await deleteReel(reelId);
        setReels(reels.filter(r => r._id !== reelId));
      } catch (error) {
        console.error('Error deleting reel:', error);
        alert('Failed to delete reel');
      }
    }
  };

  const handleAddComment = async (reelId, text) => {
    try {
      const { data } = await addReelComment(reelId, text);
      setReels(reels.map(r =>
        r._id === reelId
          ? { ...r, comments: [...r.comments, data.comment] }
          : r
      ));
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment');
    }
  };

  if (loading) {
    return <div className="spinner">Loading reels...</div>;
  }

  return (
    <div className="reels-container">
      <div className="reels-header">
        <h1>Reels</h1>
        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
          + Create Reel
        </button>
      </div>

      {reels.length === 0 ? (
        <div className="empty-state">
          <p>No reels yet. Be the first to create one!</p>
        </div>
      ) : (
        <div className="reels-feed">
          {reels.map(reel => (
            <ReelCard
              key={reel._id}
              reel={reel}
              onLike={handleLike}
              onDelete={handleDeleteReel}
              onComment={handleAddComment}
            />
          ))}
        </div>
      )}

      {showCreateModal && (
        <ReelCreateModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            loadReels();
          }}
        />
      )}
    </div>
  );
};

const ReelCreateModal = ({ onClose, onSuccess }) => {
  const [caption, setCaption] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoUrl || !duration) {
      alert('Please enter video URL and duration');
      return;
    }
    try {
      setLoading(true);
      const { createReel } = await import('../utils/api');
      await createReel(videoUrl, caption, thumbnail, parseInt(duration));
      onSuccess();
    } catch (error) {
      console.error('Error creating reel:', error);
      alert('Failed to create reel');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create Reel</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Video URL (Cloudinary)"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            required
            className="input"
          />
          <textarea
            placeholder="Caption (optional)"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            maxLength="500"
            className="textarea"
          />
          <input
            type="text"
            placeholder="Thumbnail URL (optional)"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            className="input"
          />
          <input
            type="number"
            placeholder="Duration (15-60 seconds)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            min="15"
            max="60"
            required
            className="input"
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating...' : 'Create Reel'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reels;

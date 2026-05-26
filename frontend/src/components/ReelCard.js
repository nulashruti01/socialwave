import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/ReelCard.css';

const ReelCard = ({ reel, onLike, onDelete, onComment }) => {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(reel.likes.includes(user?._id));

  const handleLike = () => {
    onLike(reel._id, isLiked);
    setIsLiked(!isLiked);
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(reel._id, commentText);
      setCommentText('');
    }
  };

  const isOwner = user?._id === reel.author._id;

  return (
    <div className="reel-card">
      <div className="reel-video">
        <video
          src={reel.videoUrl}
          controls
          poster={reel.thumbnail}
          className="reel-video-element"
        />
        <div className="reel-overlay">
          <div className="reel-author">
            {reel.author.avatar && (
              <img src={reel.author.avatar} alt={reel.author.username} className="reel-avatar" />
            )}
            <span className="reel-username">{reel.author.username}</span>
          </div>
          {reel.caption && <p className="reel-caption">{reel.caption}</p>}
        </div>
      </div>

      <div className="reel-actions">
        <button className={`action-btn ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
          ❤️ {reel.likes.length}
        </button>
        <button className="action-btn" onClick={() => setShowComments(!showComments)}>
          💬 {reel.comments.length}
        </button>
        <span className="action-stat">👁️ {reel.views}</span>
        {isOwner && (
          <button className="action-btn delete-btn" onClick={() => onDelete(reel._id)}>
            🗑️
          </button>
        )}
      </div>

      {showComments && (
        <div className="reel-comments">
          <div className="comments-list">
            {reel.comments.map(comment => (
              <div key={comment._id} className="comment-item">
                <strong>{comment.user.username}</strong>
                <p>{comment.text}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleComment} className="comment-form">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="input"
            />
            <button type="submit" className="btn btn-sm">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReelCard;

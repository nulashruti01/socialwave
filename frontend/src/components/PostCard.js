import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toggleLike, addComment, deleteComment, deletePost } from '../utils/api';
import TimeAgo from 'react-timeago';
import './PostCard.css';

const Avatar = ({ username, size = 'md' }) => (
  <div className={`avatar avatar-${size}`}>
    {username?.[0]?.toUpperCase() || '?'}
  </div>
);

const PostCard = ({ post, onDelete }) => {
  const { user } = useAuth();
  const [likes, setLikes] = useState(post.likes || []);
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isLiked = likes.includes(user?._id);
  const isOwner = post.author?._id === user?._id;

  const handleLike = async () => {
    try {
      const { data } = await toggleLike(post._id);
      setLikes(data.likes);
    } catch (err) { console.error(err); }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setSubmitting(true);
    try {
      const { data } = await addComment(post._id, commentText);
      setComments((prev) => [...prev, data.comment]);
      setCommentText('');
      setShowComments(true);
    } catch (err) { console.error(err); }
    setSubmitting(false);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(post._id, commentId);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) { console.error(err); }
  };

  const handleDeletePost = async () => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await deletePost(post._id);
      onDelete?.(post._id);
    } catch (err) { console.error(err); }
  };

  return (
    <article className="post-card card">
      <div className="post-header">
        <Link to={`/profile/${post.author?.username}`} className="post-author-link">
          <Avatar username={post.author?.username} size="md" />
          <div>
            <span className="post-username">@{post.author?.username}</span>
            <span className="post-time"><TimeAgo date={post.createdAt} /></span>
          </div>
        </Link>
        {isOwner && (
          <button className="btn btn-ghost btn-sm post-delete-btn" onClick={handleDeletePost}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14H6L5 6"/>
              <path d="M10 11v6M14 11v6"/>
              <path d="M9 6V4h6v2"/>
            </svg>
          </button>
        )}
      </div>

      <p className="post-content">{post.content}</p>

      {post.images?.length > 0 && (
        <div className="post-images">
          {post.images.map((src, index) => (
            <div key={src + index} className="post-image-wrapper">
              <img src={src} alt={`Post image ${index + 1}`} className="post-image" />
            </div>
          ))}
        </div>
      )}

      <div className="post-actions">
        <button className={`action-btn ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span>{likes.length}</span>
        </button>
        <button className="action-btn" onClick={() => setShowComments((v) => !v)}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span>{comments.length}</span>
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          {comments.length > 0 && (
            <div className="comments-list">
              {comments.map((c) => (
                <div key={c._id} className="comment-item">
                  <Avatar username={c.user?.username} size="sm" />
                  <div className="comment-body">
                    <Link to={`/profile/${c.user?.username}`} className="comment-username">@{c.user?.username}</Link>
                    <span className="comment-text">{c.text}</span>
                  </div>
                  {c.user?._id === user?._id && (
                    <button className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)', padding: '0.2rem 0.4rem' }} onClick={() => handleDeleteComment(c._id)}>×</button>
                  )}
                </div>
              ))}
            </div>
          )}
          <form className="comment-form" onSubmit={handleComment}>
            <Avatar username={user?.username} size="sm" />
            <input className="input comment-input" placeholder="Write a comment..." value={commentText} onChange={(e) => setCommentText(e.target.value)} disabled={submitting} />
            <button className="btn btn-primary btn-sm" type="submit" disabled={submitting || !commentText.trim()}>Post</button>
          </form>
        </div>
      )}
    </article>
  );
};

export default PostCard;

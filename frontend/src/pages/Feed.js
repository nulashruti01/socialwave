import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import PostCard from '../components/PostCard';
import { fetchFeed, fetchAllPosts, createPost } from '../utils/api';
import './Feed.css';

const Feed = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('feed');
  const [activeNav, setActiveNav] = useState('home');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [doubleTapId, setDoubleTapId] = useState(null);

  const mockStories = [
    { id: 1, username: 'Your Story', avatar: user?.username?.[0]?.toUpperCase(), isYourStory: true },
    { id: 2, username: 'user_001', avatar: '😎', viewed: false },
    { id: 3, username: 'designer_ai', avatar: '🎨', viewed: false },
    { id: 4, username: 'creator_wave', avatar: '🌊', viewed: false },
    { id: 5, username: 'tech_pulse', avatar: '⚡', viewed: false },
    { id: 6, username: 'vibes_daily', avatar: '✨', viewed: false },
  ];

  const trendingCreators = [
    { id: 1, name: 'Alex Rivera', followers: '2.5M', avatar: '👤' },
    { id: 2, name: 'Sam Chen', followers: '1.8M', avatar: '👤' },
    { id: 3, name: 'Jordan Sky', followers: '3.2M', avatar: '👤' },
  ];

  const trendingHashtags = [
    { tag: '#FutureOfTech', posts: '45.2K' },
    { tag: '#CreativeMinds', posts: '32.8K' },
    { tag: '#DesignLife', posts: '28.1K' },
    { tag: '#WebFlow', posts: '21.5K' },
  ];

  const loadPosts = async () => {
    setLoading(true);
    try {
      const { data } = tab === 'feed' ? await fetchFeed() : await fetchAllPosts();
      setPosts(data.posts);
    } catch {
      setError('Failed to load posts.');
    }
    setLoading(false);
  };

  useEffect(() => { loadPosts(); }, [tab]);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setPosting(true); setError('');
    try {
      const { data } = await createPost(content);
      setPosts((prev) => [data.post, ...prev]);
      setContent('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post.');
    }
    setPosting(false);
  };

  const handleDelete = (id) => setPosts((prev) => prev.filter((p) => p._id !== id));

  const toggleLike = (postId) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handlePostDoubleTap = (postId) => {
    if (!likedPosts.has(postId)) {
      toggleLike(postId);
    }
    setDoubleTapId(postId);
    setTimeout(() => setDoubleTapId(null), 600);
  };

  return (
    <main className="modern-feed">
      {/* Premium Top Navigation */}
      <nav className="premium-navbar">
        <div className="navbar-content">
          <div className="navbar-logo">
            <span className="logo-icon">♦</span>
            <span className="logo-text">SocialWave</span>
          </div>
          <div className="navbar-actions">
            <button className="nav-icon-btn" title="Notifications">
              <span className="icon">🔔</span>
              <span className="notification-badge">3</span>
            </button>
            <button className="nav-icon-btn" title="Messages">
              <span className="icon">💬</span>
              <span className="notification-badge">2</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Stories Carousel Section */}
      <section className="stories-section">
        <div className="stories-container">
          {mockStories.map((story) => (
            <div key={story.id} className={`story-card ${story.isYourStory ? 'your-story' : 'user-story'}`}>
              <div className={`story-avatar ${!story.viewed && !story.isYourStory ? 'unviewed' : ''}`}>
                {story.isYourStory ? (
                  <>
                    <div className="avatar-circle">{story.avatar}</div>
                    <button className="story-plus-btn">+</button>
                  </>
                ) : (
                  <div className="avatar-circle">{story.avatar}</div>
                )}
              </div>
              <p className="story-username">{story.username}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="feed-container">
        {/* Main Feed */}
        <div className="feed-main-section">
          {/* Tab Navigation */}
          <div className="feed-tabs-modern">
            <button className={`feed-tab-btn ${tab === 'feed' ? 'active' : ''}`} onClick={() => setTab('feed')}>
              <span className="tab-icon">🏠</span>
              <span>Following</span>
            </button>
            <button className={`feed-tab-btn ${tab === 'explore' ? 'active' : ''}`} onClick={() => setTab('explore')}>
              <span className="tab-icon">✨</span>
              <span>Trending</span>
            </button>
          </div>

          {/* Posts Feed */}
          <div className="posts-feed">
            {loading ? (
              <div className="loading-state">
                <div className="spinner-modern"></div>
                <p>Loading premium content...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="empty-state-modern">
                <div className="empty-icon-modern">👋</div>
                <h3>{tab === 'feed' ? 'Your feed is empty' : 'Discover amazing content'}</h3>
                <p>{tab === 'feed' ? 'Follow creators to see their posts in your feed.' : 'Explore trending posts and creators.'}</p>
              </div>
            ) : (
              posts.map((post) => (
                <div
                  key={post._id}
                  className="modern-post-card"
                  onDoubleClick={() => handlePostDoubleTap(post._id)}
                >
                  {/* Post Header */}
                  <div className="post-header">
                    <div className="post-author-info">
                      <div className="author-avatar">{post.author?.username?.[0]?.toUpperCase() || '👤'}</div>
                      <div className="author-details">
                        <div className="author-name">@{post.author?.username || 'Unknown'}</div>
                        <div className="post-location">📍 Featured Feed</div>
                      </div>
                    </div>
                    <button className="follow-btn">Follow</button>
                  </div>

                  {/* Post Content */}
                  <div className="post-content-wrapper">
                    {post.image && <img src={post.image} alt="Post" className="post-image" />}
                    <div className="post-text">{post.content}</div>
                    {doubleTapId === post._id && <div className="double-tap-heart">❤️</div>}
                  </div>

                  {/* Post Engagement */}
                  <div className="post-engagement">
                    <div className="engagement-stats">
                      <span className="like-count">{likedPosts.has(post._id) ? '1' : '0'} likes</span>
                      <span className="comment-count">12 comments</span>
                      <span className="share-count">5 shares</span>
                    </div>
                  </div>

                  {/* Post Actions */}
                  <div className="post-actions">
                    <button
                      className={`action-btn ${likedPosts.has(post._id) ? 'liked' : ''}`}
                      onClick={() => toggleLike(post._id)}
                      title="Like"
                    >
                      <span className="action-icon">{likedPosts.has(post._id) ? '❤️' : '🤍'}</span>
                      <span className="action-label">Like</span>
                    </button>
                    <button className="action-btn" title="Comment">
                      <span className="action-icon">💬</span>
                      <span className="action-label">Comment</span>
                    </button>
                    <button className="action-btn" title="Share">
                      <span className="action-icon">➡️</span>
                      <span className="action-label">Share</span>
                    </button>
                    <button className="action-btn" title="Save">
                      <span className="action-icon">🔖</span>
                      <span className="action-label">Save</span>
                    </button>
                  </div>

                  {/* Post Caption */}
                  <div className="post-caption">
                    <p><strong>@{post.author?.username || 'user'}</strong> {post.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Trending Sidebar */}
        <aside className="trending-sidebar">
          {/* Trending Creators */}
          <div className="trending-card">
            <h3 className="trending-title">✨ Suggested Creators</h3>
            <div className="creators-list">
              {trendingCreators.map((creator) => (
                <div key={creator.id} className="creator-item">
                  <div className="creator-avatar">{creator.avatar}</div>
                  <div className="creator-info">
                    <div className="creator-name">{creator.name}</div>
                    <div className="creator-followers">{creator.followers}</div>
                  </div>
                  <button className="follow-btn-sm">Follow</button>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Hashtags */}
          <div className="trending-card">
            <h3 className="trending-title">🔥 Trending Now</h3>
            <div className="hashtags-list">
              {trendingHashtags.map((item, idx) => (
                <div key={idx} className="hashtag-item">
                  <div>
                    <div className="hashtag-text">{item.tag}</div>
                    <div className="hashtag-count">{item.posts} posts</div>
                  </div>
                  <div className="trend-indicator">↗️</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Floating Bottom Navigation Bar */}
      <nav className="floating-nav-bar">
        <button
          className={`nav-item ${activeNav === 'home' ? 'active' : ''}`}
          onClick={() => setActiveNav('home')}
          title="Home"
        >
          <span className="nav-icon">🏠</span>
        </button>
        <button
          className={`nav-item ${activeNav === 'explore' ? 'active' : ''}`}
          onClick={() => { setActiveNav('explore'); setTab('explore'); }}
          title="Explore"
        >
          <span className="nav-icon">🔍</span>
        </button>
        <button
          className={`nav-item ${activeNav === 'reels' ? 'active' : ''}`}
          onClick={() => setActiveNav('reels')}
          title="Reels"
        >
          <span className="nav-icon">🎬</span>
        </button>
        <button
          className={`nav-item ${activeNav === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveNav('profile')}
          title="Profile"
        >
          <span className="nav-icon">👤</span>
        </button>
      </nav>
    </main>
  );
};

export default Feed;

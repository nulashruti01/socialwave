import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PostCard from '../components/PostCard';
import { getUserProfile, toggleFollow, updateProfile } from '../utils/api';
import './Profile.css';

const Profile = () => {
  const { username } = useParams();
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const isOwnProfile = user?.username === username;

  useEffect(() => { loadProfile(); }, [username]);

  const loadProfile = async () => {
    setLoading(true); setError('');
    try {
      const { data } = await getUserProfile(username);
      setProfile(data.user); setPosts(data.posts);
      setBio(data.user.bio || ''); setAvatar(data.user.avatar || '');
      setFollowing(data.user.followers?.some((f) => f._id === user?._id || f === user?._id));
    } catch { setError('User not found.'); }
    setLoading(false);
  };

  const handleFollow = async () => {
    setFollowLoading(true);
    try {
      const { data } = await toggleFollow(profile._id);
      setFollowing(data.following);
      setProfile((prev) => ({
        ...prev,
        followers: data.following
          ? [...(prev.followers || []), { _id: user._id, username: user.username }]
          : (prev.followers || []).filter((f) => f._id !== user._id),
      }));
    } catch {}
    setFollowLoading(false);
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const { data } = await updateProfile({ bio, avatar });
      setProfile((prev) => ({ ...prev, bio: data.user.bio, avatar: data.user.avatar }));
      updateUser({ ...user, bio: data.user.bio, avatar: data.user.avatar });
      setEditing(false);
    } catch {}
    setSaving(false);
  };

  const handleDeletePost = (id) => setPosts((prev) => prev.filter((p) => p._id !== id));

  if (loading) return <div className="spinner" style={{ marginTop: '4rem' }} />;
  if (error) return <div className="alert alert-error" style={{ maxWidth: 500, margin: '3rem auto' }}>{error}</div>;

  return (
    <main className="profile-layout">
      <div className="profile-header card">
        <div className="profile-avatar-wrap">
          {profile.avatar
            ? <img src={profile.avatar} alt={profile.username} className="avatar avatar-xl" />
            : <div className="avatar avatar-xl">{profile.username?.[0]?.toUpperCase()}</div>}
        </div>
        <div className="profile-info">
          <div className="profile-top-row">
            <h1 className="profile-username">@{profile.username}</h1>
            {isOwnProfile ? (
              <button className="btn btn-outline btn-sm" onClick={() => setEditing(!editing)}>
                {editing ? 'Cancel' : 'Edit Profile'}
              </button>
            ) : (
              <button className={`btn btn-sm ${following ? 'btn-outline' : 'btn-primary'}`} onClick={handleFollow} disabled={followLoading}>
                {followLoading ? '…' : following ? 'Unfollow' : 'Follow'}
              </button>
            )}
          </div>
          <div className="profile-stats">
            <div className="stat"><span className="stat-num">{posts.length}</span><span className="stat-label">Posts</span></div>
            <div className="stat"><span className="stat-num">{profile.followers?.length || 0}</span><span className="stat-label">Followers</span></div>
            <div className="stat"><span className="stat-num">{profile.following?.length || 0}</span><span className="stat-label">Following</span></div>
          </div>
          {!editing ? (
            <p className="profile-bio">{profile.bio || <span className="text-muted">No bio yet.</span>}</p>
          ) : (
            <div className="edit-form">
              <div className="input-group">
                <label className="input-label">Bio</label>
                <input className="input" value={bio} onChange={(e) => setBio(e.target.value)} maxLength={160} placeholder="Tell the world about yourself..." />
              </div>
              <div className="input-group">
                <label className="input-label">Avatar URL</label>
                <input className="input" value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder="https://..." />
              </div>
              <button className="btn btn-primary btn-sm" onClick={handleSaveProfile} disabled={saving}>
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="profile-posts">
        <h2 className="posts-heading">Posts</h2>
        {posts.length === 0 ? (
          <div className="empty-state card">
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📝</div>
            <p className="text-muted">{isOwnProfile ? "You haven't posted yet." : `@${profile.username} hasn't posted yet.`}</p>
          </div>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} onDelete={handleDeletePost} />)
        )}
      </div>
    </main>
  );
};

export default Profile;

import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { searchUsers } from '../utils/api';
import './Navbar.css';

const AvatarPlaceholder = ({ username, size = 'sm' }) => (
  <div className={`avatar avatar-${size}`} style={{ border: '2px solid var(--accent)' }}>
    {username?.[0]?.toUpperCase() || '?'}
  </div>
);

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(debounceRef.current);
    if (!val.trim()) { setResults([]); setShowDropdown(false); return; }
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const { data } = await searchUsers(val);
        setResults(data.users);
        setShowDropdown(true);
      } catch {}
      setSearching(false);
    }, 350);
  };

  const goToProfile = (username) => {
    setQuery(''); setResults([]); setShowDropdown(false);
    navigate(`/profile/${username}`);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L3 7V12C3 16.55 6.84 20.74 12 22C17.16 20.74 21 16.55 21 12V7L12 2Z" fill="var(--accent)" opacity="0.9"/>
            <path d="M8 12L10.5 14.5L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>SocialWave</span>
        </Link>

        <div className="navbar-search" ref={searchRef}>
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            className="search-input" type="text" placeholder="Search users..."
            value={query} onChange={handleSearch}
            onFocus={() => results.length > 0 && setShowDropdown(true)}
          />
          {showDropdown && (
            <div className="search-dropdown">
              {searching && <div className="search-item text-muted text-sm">Searching...</div>}
              {!searching && results.length === 0 && <div className="search-item text-muted text-sm">No users found</div>}
              {results.map((u) => (
                <button key={u._id} className="search-item" onClick={() => goToProfile(u.username)}>
                  <AvatarPlaceholder username={u.username} size="sm" />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>@{u.username}</div>
                    {u.bio && <div className="text-muted text-sm">{u.bio}</div>}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <nav className="navbar-links">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} title="Feed">
            <svg width="20" height="20" viewBox="0 0 24 24" fill={isActive('/') ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </Link>
          <Link to="/reels" className={`nav-link ${isActive('/reels') ? 'active' : ''}`} title="Reels">
            <svg width="20" height="20" viewBox="0 0 24 24" fill={isActive('/reels') ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
              <line x1="7" y1="2" x2="7" y2="22"/>
              <line x1="17" y1="2" x2="17" y2="22"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <line x1="2" y1="7" x2="7" y2="7"/>
              <line x1="2" y1="17" x2="7" y2="17"/>
              <line x1="17" y1="17" x2="22" y2="17"/>
              <line x1="17" y1="7" x2="22" y2="7"/>
            </svg>
          </Link>
          <Link to="/messages" className={`nav-link ${isActive('/messages') ? 'active' : ''}`} title="Messages">
            <svg width="20" height="20" viewBox="0 0 24 24" fill={isActive('/messages') ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </Link>
          <Link to={`/profile/${user?.username}`} className={`nav-link ${location.pathname.includes(user?.username) ? 'active' : ''}`} title="Profile">
            <AvatarPlaceholder username={user?.username} size="sm" />
          </Link>
          <button className="nav-link btn-ghost" onClick={logout} title="Logout">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

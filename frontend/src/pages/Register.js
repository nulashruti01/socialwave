import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
  const { register } = useAuth();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      await register(form.username, form.email, form.password);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <div className="auth-logo">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L3 7V12C3 16.55 6.84 20.74 12 22C17.16 20.74 21 16.55 21 12V7L12 2Z" fill="var(--accent)"/>
            <path d="M8 12L10.5 14.5L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h1 className="auth-title">SocialWave</h1>
        </div>
        <p className="auth-subtitle text-muted text-center">Create your account</p>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label className="input-label">Username</label>
            <input className="input" type="text" name="username" value={form.username} onChange={handleChange} placeholder="cooluser123" required minLength={3} maxLength={20} autoFocus />
          </div>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input className="input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input className="input" type="password" name="password" value={form.password} onChange={handleChange} placeholder="Min. 6 characters" required minLength={6} />
          </div>
          <button className="btn btn-primary w-full" type="submit" disabled={loading}>
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>
        <p className="auth-switch text-center text-sm text-muted">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

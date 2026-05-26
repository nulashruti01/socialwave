import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await login(form.email, form.password);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed. Please try again.');
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
        <p className="auth-subtitle text-muted text-center">Sign in to your account</p>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label className="input-label">Email</label>
            <input className="input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required autoFocus />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input className="input" type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" required />
          </div>
          <button className="btn btn-primary w-full" type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
        <p className="auth-switch text-center text-sm text-muted">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

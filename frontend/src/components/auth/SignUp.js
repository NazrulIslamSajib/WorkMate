import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Sign up failed');

      setSuccess('Sign up successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container" style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left Panel */}
      <div style={{
        flex: 1,
        minHeight: '100vh',
        background: '#18272e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <img src="/image1.png" alt="Signup Illustration" style={{ maxWidth: '90%', maxHeight: '80vh', width: 'auto', height: 'auto', display: 'block' }} />
      </div>

      {/* Right Form Panel */}
      <div style={{ flex: 1, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <form onSubmit={handleSubmit} className="signup-form">
          <h2>Create Account</h2>
          <div className="signup-subtitle">Join us by creating your account below.</div>

          <label>Email Address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

          <label>Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />

          {error && <div className="signup-error">{error}</div>}
          {success && <div className="signup-success">{success}</div>}

          <button type="submit" className="signup-btn">Sign Up</button>

          <div className="signup-or-wrapper">
            <div className="signup-divider" />
            <span className="signup-or">Or</span>
            <div className="signup-divider" />
          </div>

          <div className="signup-login-link">
            Already have an account? <Link to="/" className="link">Log In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

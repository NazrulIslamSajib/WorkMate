import React, { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      setSuccess('Sign up successful! You can now log in.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container" style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', background: 'radial-gradient(ellipse at left top, #1b2e2e 60%, #1b2e2e 100%)' }}>
        <img src="/image.png" alt="Sign Up Illustration" style={{ position: 'absolute', right: 0, top: 0, width: '70%', height: '100%', objectFit: 'cover', opacity: 0.18, zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 380, background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', padding: '38px 32px' }}>
          <h2 style={{ fontWeight: 700, fontSize: '2rem', marginBottom: 18, color: '#222' }}>Sign Up</h2>
          <form className="signup-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <label style={{ fontWeight: 500, marginBottom: 4 }}>Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: '12px 14px', borderRadius: 8, border: '1px solid #e0e0e0', fontSize: '1rem' }} />
            <label style={{ fontWeight: 500, marginBottom: 4 }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ padding: '12px 14px', borderRadius: 8, border: '1px solid #e0e0e0', fontSize: '1rem' }} />
            <label style={{ fontWeight: 500, marginBottom: 4 }}>Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required style={{ padding: '12px 14px', borderRadius: 8, border: '1px solid #e0e0e0', fontSize: '1rem' }} />
            {error && <div className="signup-error" style={{ color: '#e74c3c', marginTop: 8 }}>{error}</div>}
            {success && <div className="signup-success" style={{ color: '#4be08a', marginTop: 8 }}>{success}</div>}
            <button type="submit" className="signup-btn" style={{ background: '#4be08a', color: '#fff', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 0', fontSize: '1.1rem', marginTop: 8 }}>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Reset failed');

      setSuccess('Password reset successful! Redirecting...');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container" style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left: Illustration */}
      <div style={{
        flex: 1,
        background: '#18272e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <img src="/image1.png" alt="Reset Illustration" style={{ maxWidth: '90%', maxHeight: '80vh', width: 'auto', height: 'auto' }} />
      </div>

      {/* Right: Reset Form */}
      <div style={{ flex: 1, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <form onSubmit={handleSubmit} className="login-form" style={{ width: '100%', maxWidth: 400 }}>
          <div className="reset-icon" style={{ textAlign: 'center', fontSize: 48, marginBottom: 12 }}>
            <span role="img" aria-label="reset" style={{ color: '#00c853' }}>🔑 </span>
          </div>
          <h2 style={{ fontWeight: 700, fontSize: '2rem', marginBottom: 8, color: '#222' }}>Reset Password</h2>
          <p style={{ color: '#888', fontSize: 14, marginBottom: 24 }}>
            Strong passwords include numbers, letters, and punctuation marks.
          </p>

          <label style={{ fontWeight: 500, marginBottom: 4, fontSize: 15 }}>Email Address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
            style={{ padding: '13px 14px', borderRadius: 6, border: '1px solid #e0e0e0', fontSize: '1rem', marginBottom: 18 }} />

          <label style={{ fontWeight: 500, marginBottom: 4, fontSize: 15 }}>New Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
            style={{ padding: '13px 14px', borderRadius: 6, border: '1px solid #e0e0e0', fontSize: '1rem', marginBottom: 18 }} />

          <label style={{ fontWeight: 500, marginBottom: 4, fontSize: 15 }}>Confirm Password</label>
          <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required placeholder="Retype password"
            style={{ padding: '13px 14px', borderRadius: 6, border: '1px solid #e0e0e0', fontSize: '1rem', marginBottom: 18 }} />

          {error && <div className="login-error">{error}</div>}
          {success && <div className="reset-success" style={{ color: '#4be08a', marginBottom: 12 }}>{success}</div>}

          <button type="submit" className="login-btn">Reset Password</button>
        </form> 
        
      </div>
    </div>
  );
};

export default ResetPassword;

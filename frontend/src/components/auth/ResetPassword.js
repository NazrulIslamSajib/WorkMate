import React, { useState } from 'react';
import './ResetPassword.css';

const ResetPassword = () => {
  const [email, setEmail] = useState('m32220@gmail.com');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Reset failed');
      setSuccess('Password reset successful!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="reset-container">
      <form className="reset-form" onSubmit={handleSubmit}>
        <div className="reset-icon">
          {/* Replace with actual icon if available */}
          <span role="img" aria-label="reset" style={{fontSize: 48, color: '#00c853'}}>⏱️</span>
        </div>
        <h2>Reset your Password</h2>
        <p className="reset-desc">Strong passwords include numbers, letters, and punctuation marks.</p>
        <label>Email Address</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <label>Enter New Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <label>Confirm Password</label>
        <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required placeholder="Retype password" />
        {error && <div className="reset-error">{error}</div>}
        {success && <div className="reset-success">{success}</div>}
        <button type="submit" className="reset-btn">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;

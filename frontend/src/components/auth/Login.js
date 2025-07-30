import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('m32220@gmail.com');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      // Store user email and redirect to dashboard after successful login
      localStorage.setItem('userEmail', email);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container" style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left: Illustration on dark gradient */}
      <div style={{
        flex: 1,
        minHeight: '100vh',
        background: '#18272e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <img src="/image1.png" alt="Login Illustration" style={{ maxWidth: '90%', maxHeight: '80vh', width: 'auto', height: 'auto', display: 'block' }} />
      </div>
      {/* Right: Login form */}
      <div style={{ flex: 1, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <form onSubmit={handleSubmit} className="login-form" style={{ width: '100%', maxWidth: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <h2 style={{ fontWeight: 700, fontSize: '2.2rem', marginBottom: 8, color: '#222', textAlign: 'left' }}>Login</h2>
          <div style={{ color: '#888', fontWeight: 400, fontSize: 15, marginBottom: 28, textAlign: 'left' }}>WelcomeBack, Please Enter your Details to Log In.</div>
          <label style={{ fontWeight: 500, marginBottom: 4, fontSize: 15, textAlign: 'left' }}>Email Adders</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: '13px 14px', borderRadius: 6, border: '1px solid #e0e0e0', fontSize: '1rem', marginBottom: 18 }} />
          <label style={{ fontWeight: 500, marginBottom: 4, fontSize: 15, textAlign: 'left' }}>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ padding: '13px 14px', borderRadius: 6, border: '1px solid #e0e0e0', fontSize: '1rem', marginBottom: 18 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <label style={{ fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} style={{ accentColor: '#4be08a' }} /> Remember me
            </label>
            <Link to="/reset-password" style={{ color: '#888', fontWeight: 400, fontSize: 14, textDecoration: 'none' }}>Forgot password ?</Link>
          </div>
          {error && <div className="login-error" style={{ color: '#e74c3c', marginBottom: 8 }}>{error}</div>}
          <button type="submit" className="login-btn" style={{ background: '#4be08a', color: '#fff', fontWeight: 700, border: 'none', borderRadius: 6, padding: '14px 0', fontSize: '1.1rem', marginBottom: 18, marginTop: 0 }}>Log In</button>
          <div style={{ display: 'flex', alignItems: 'center', margin: '0 0 18px 0' }}>
            <div style={{ flex: 1, height: 1, background: '#e0e0e0' }} />
            <span style={{ color: '#bbb', fontSize: 15, margin: '0 12px' }}>Or</span>
            <div style={{ flex: 1, height: 1, background: '#e0e0e0' }} />
          </div>
          <div className="login-signup" style={{ textAlign: 'center', fontSize: 15 }}>Don't have an account? <Link to="/signup" style={{ color: '#222', fontWeight: 600, textDecoration: 'none' }}>Sign Up</Link></div>
        </form>
      </div>
    </div>
  );
};

export default Login;

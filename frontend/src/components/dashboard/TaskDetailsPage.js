
import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomDropdown from './CustomDropdown';
import CongratulationsModal from './CongratulationsModal';
// For user info and nav bar
import './Dashboard.css';

const statusOptions = [
  'All Task', 'Ongoing', 'Pending', 'Collaborative Task', 'Done'
];

const statusColors = {
  Pending: '#e040fb',
  InProgress: '#ffb300',
  Done: '#00c853',
};


export default function TaskDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('Pending');
  const [loading, setLoading] = useState(true);
  const [showCongrats, setShowCongrats] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const logoutRef = useRef();
  // Handle click outside for logout dropdown
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (logoutRef.current && !logoutRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    }
    if (showLogout) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLogout]);
  const handleLogout = async () => {
    // Remove user info from localStorage
    localStorage.removeItem('userEmail');
    try {
      await fetch('http://localhost:5000/api/logout', { method: 'POST', credentials: 'include' });
    } catch (e) {
      alert('Logout failed to contact server, but you have been logged out locally.');
    }
    navigate('/', { replace: true });
  };

  React.useEffect(() => {
    fetch(`http://localhost:5000/api/tasks/${id}`)
      .then(res => res.json())
      .then(data => {
        setTask(data);
        setSelectedStatus(data.status);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async () => {
    await fetch(`http://localhost:5000/api/tasks/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: selectedStatus })
    });
    if (selectedStatus === 'Done') {
      setShowCongrats(true);
    } else {
      navigate('/dashboard');
    }
  };

  const handleDelete = async () => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, { method: 'DELETE' });
    navigate('/dashboard');
  };

  const handleCongratsClose = () => {
    setShowCongrats(false);
    navigate('/dashboard');
  };

  if (loading || !task) return <div style={{ padding: 40 }}>Loading...</div>;

  // User info for nav bar
  const userEmail = localStorage.getItem('userEmail') || '';
  const userName = userEmail.split('@')[0]?.charAt(0).toUpperCase() + userEmail.split('@')[0]?.slice(1) || 'User';

  return (
    <>
      {/* Dashboard-style gradient header and nav */}
      <div style={{
        width: '100%',
        minHeight: 130,
        background: 'radial-gradient(ellipse at left top, #1b2e2e 60%, #1b2e2e 80%, #1b2e2e 100%, #1b2e2e 100%)',
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
        zIndex: 1,
        padding: 0,
        display: 'block',
        marginBottom: -60
      }}>
        {/* Nav bar */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', zIndex: 2, padding: '36px 48px 0 48px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 32 }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: 0 }}>Tasko</div>
            <div style={{ color: '#4be08a', fontWeight: 600, fontSize: 17, cursor: 'pointer' }}>Task List</div>
            <div style={{ color: '#fff', fontWeight: 500, fontSize: 17, cursor: 'pointer' }}>Spin</div>
          </div>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginLeft: 18, marginTop: 0 }} ref={logoutRef}>
            <span style={{ color: '#fff', fontWeight: 500, fontSize: 18, marginRight: 8 }}>{userName} M.</span>
            <div
              style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, #4be08a 60%, #1b2e2e 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 20, border: '2px solid #fff', cursor: 'pointer', position: 'relative' }}
              onClick={() => setShowLogout((v) => !v)}
              tabIndex={0}
              aria-label="User menu"
            >
              {userName.charAt(0)}
            </div>
            <svg style={{ marginLeft: 6, cursor: 'pointer' }} width="18" height="18" viewBox="0 0 20 20" fill="none" onClick={() => setShowLogout((v) => !v)}><path d="M7 8l3 3 3-3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            {/* Logout dropdown */}
            {showLogout && (
               <div style={{ position: 'absolute', top: 48, right: -12, background: '#fff', borderRadius:5, boxShadow: '0 2px 12px rgba(0,0,0,0.13)', minWidth: 45, zIndex: -33, padding: '8px 0' }}>
                <button
                  onClick={handleLogout}
                  style={{ display: 'flex', alignItems: 'center', width: '100%', background: 'none', border: 'none', color: '#e74c3c', fontWeight: 600, fontSize: 16, padding: '-10px 20px', cursor: 'pointer', gap: 10 }}
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M16 17l5-5m0 0l-5-5m5 5H9" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 12a7 7 0 11-14 0 7 7 0 0114 0z" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Main card */}
      <div className="dashboard-container" style={{ marginTop: 94, maxWidth: 1100, background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', padding: '32px 40px', marginLeft: 'auto', marginRight: 'auto' }}>
        <CongratulationsModal open={showCongrats} onClose={handleCongratsClose} />
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontWeight: 700, fontSize: 22, color: '#222', marginBottom: 0 }}>Task Details</span>
            <span style={{ display: 'inline-block', width: 24 }}></span>
           
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
            <button style={{ background: '#ffe066', color: '#222', fontWeight: 600, border: 'none', borderRadius: 8, padding: '10px 29px', fontSize: 16, marginRight: 12, boxShadow: '0 2px 8px #ffe06633' }}>Edit Task</button>
            <button style={{ background: '#4be08a', color: '#fff', fontWeight: 600, border: 'none', borderRadius: 8, padding: '10px 28px', fontSize: 16, boxShadow: '0 2px 8px #4be08a33' }} onClick={() => navigate('/dashboard')}>Back</button>
          </div>
        </div>
        {/* Main content row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32, marginBottom: 18 }}>
          {/* Icon */}
          <div style={{ width: 90, height: 90, borderRadius: '50%', background: '#4be08a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
            <span role="img" aria-label="icon">📝</span>
          </div>
          {/* Title/desc */}
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: '1.45rem', marginBottom: 4 }}>{task.title}</div>
            <div style={{ color: '#666', fontSize: 15, marginBottom: 0, maxWidth: 600 }}>{task.description}</div>
          </div>
        </div>
        {/* End date and status row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginBottom: 18 }}>
          <div>
            <div style={{ fontWeight: 600, color: '#222', fontSize: 15, marginBottom: 2 }}>End Date</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span role="img" aria-label="calendar">📅</span>
              <span style={{ fontWeight: 500, fontSize: 16 }}>{new Date(task.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
          <div style={{ borderLeft: '1px solid #eee', height: 32 }} />
          <div style={{ fontWeight: 700, color: statusColors[task.status] || '#ffb300', fontSize: 22, marginLeft: 8, display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 18, marginRight: 8 }}>&bull;</span> {task.status}
          </div>
        </div>
        {/* Change status dropdown */}
        <div style={{ margin: '32px 0 0 0', maxWidth: 320 }}>
          <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 16 }}>Change Status</div>
          <CustomDropdown
            label={selectedStatus}
            options={statusOptions}
            selected={selectedStatus}
            onChange={setSelectedStatus}
            multi={false}
          />
        </div>
        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 16, marginTop: 36, justifyContent: 'flex-end' }}>
          <button onClick={handleDelete} style={{ background: '#ffe3e3', color: '#e74c3c', fontWeight: 600, border: 'none', borderRadius: 8, padding: '12px 32px', fontSize: 16, boxShadow: '0 2px 8px #ffe3e333' }}>Delete Task</button>
          <button onClick={handleSubmit} style={{ background: '#4be08a', color: '#fff', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 32px', fontSize: 16, boxShadow: '0 2px 8px #4be08a33' }}>Submit</button>
        </div>
      </div>
    </>
  );
}

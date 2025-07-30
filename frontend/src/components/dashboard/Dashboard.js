import React, { useEffect, useState, useRef } from 'react';

import CongratulationsModal from './CongratulationsModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import DashboardHeader from './DashboardHeader';
import CustomDropdown from './CustomDropdown';
import './CustomDropdown.css';
import './DashboardHeader.css';
import './Dashboard.css';

const statusColors = {
  Pending: '#e040fb',
  InProgress: '#ffb300',
  Done: '#00c853',
};

const categories = [
  'Arts and Craft', 'Nature', 'Family', 'Sport', 'Friends', 'Meditation'
];

import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filterCategory, setFilterCategory] = useState([]);
  const [filterStatus, setFilterStatus] = useState([]);
  const [showCongrats, setShowCongrats] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newStatus, setNewStatus] = useState('Pending');
  const [newDescription, setNewDescription] = useState('');
  const navigate = useNavigate();
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
    localStorage.removeItem('userEmail');
    try {
      await fetch('http://localhost:5000/api/logout', { method: 'POST', credentials: 'include' });
    } catch (e) {
      alert('Logout failed to contact server, but you have been logged out locally.');
    }
    navigate('/login', { replace: true });
  };

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/api/tasks');
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleStatusChange = async (id, status) => {
    await fetch(`http://localhost:5000/api/tasks/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (status === 'Done') setShowCongrats(true);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const confirmDelete = async () => {
    await fetch(`http://localhost:5000/api/tasks/${deleteId}`, { method: 'DELETE' });
    setShowDelete(false);
    setDeleteId(null);
    fetchTasks();
  };

  const filteredTasks = tasks.filter(task =>
    (filterCategory.length === 0 || filterCategory.includes(task.category)) &&
    (filterStatus.length === 0 || filterStatus.includes(task.status))
  );

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTitle) return;
    await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newTitle,
        category: newCategory,
        status: newStatus,
        description: newDescription
      })
    });
    setNewTitle('');
    setNewCategory('');
    setNewStatus('Pending');
    setNewDescription('');
    fetchTasks();
  };

  return (
    <>
      {/* Gradient header with welcome and illustration */}
      <div style={{
        width: '100%',
        minHeight: 220,
        background: 'radial-gradient(ellipse at left top, #1b2e2e 60%, #1b2e2e 80%, #1b2e2e 100%, #1b2e2e 100%)',
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
        zIndex: 1,
        padding: '0',
        display: 'block'
      }}>
        {/* Wide faded illustration */}
        <img src="/image.png" alt="Dashboard Illustration" style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '54%',
          minWidth: 420,
          height: '100%',
          objectFit: 'cover',
          opacity: 0.22,
          zIndex: 1,
          pointerEvents: 'none',
        }} />
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', zIndex: 2, padding: '36px 48px 0 48px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 18 }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#4be08a', marginBottom: 0 }}>Hi {localStorage.getItem('userEmail')?.split('@')[0]?.charAt(0).toUpperCase() + localStorage.getItem('userEmail')?.split('@')[0]?.slice(1) || 'User'}</div>
            <div className="dashboard-title" style={{ fontSize: '2.3rem', fontWeight: 700, marginBottom: 8, marginTop: 0, color: '#fff', letterSpacing: '-1px' }}>Welcome to Dashboard</div>
          </div>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginLeft: 18, marginTop: 0 }} ref={logoutRef}>
            <span style={{ color: '#fff', fontWeight: 500, fontSize: 18, marginRight: 8 }}>{localStorage.getItem('userEmail')?.split('@')[0]?.charAt(0).toUpperCase() + localStorage.getItem('userEmail')?.split('@')[0]?.slice(1) || 'User'} M.</span>
            <div
              style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, #4be08a 60%, #1b2e2e 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 20, border: '2px solid #fff', cursor: 'pointer', position: 'relative' }}
              onClick={() => setShowLogout((v) => !v)}
              tabIndex={0}
              aria-label="User menu"
            >
              {localStorage.getItem('userEmail')?.split('@')[0]?.charAt(0).toUpperCase() || 'U'}
            </div>
            <svg style={{ marginLeft: 6, cursor: 'pointer' }} width="18" height="18" viewBox="0 0 20 20" fill="none" onClick={() => setShowLogout((v) => !v)}><path d="M7 8l3 3 3-3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            {/* Logout dropdown */}
            {showLogout && (
              <div style={{ position: 'absolute', top: 48, right: 0, background: '#fff', borderRadius: 8, boxShadow: '0 2px 12px rgba(0,0,0,0.13)', minWidth: 120, zIndex: 10, padding: '8px 0' }}>
                <button
                  onClick={handleLogout}
                  style={{ display: 'flex', alignItems: 'center', width: '100%', background: 'none', border: 'none', color: '#e74c3c', fontWeight: 600, fontSize: 16, padding: '10px 20px', cursor: 'pointer', gap: 10 }}
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M16 17l5-5m0 0l-5-5m5 5H9" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 12a7 7 0 11-14 0 7 7 0 0114 0z" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* White card with filters and task list */}
      <div className="dashboard-container" style={{ marginTop: '-60px' }}>
        <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', padding: '24px 32px', margin: '0 0 32px 0', display: 'flex', alignItems: 'center', gap: 24, position: 'relative', zIndex: 2 }}>
          <div className="dashboard-title-list" style={{ fontWeight: 700, fontSize: '1.18rem', marginRight: 18 }}>All Task List</div>
          <CustomDropdown
            label="Select Task Category"
            options={categories}
            selected={filterCategory}
            onChange={setFilterCategory}
            multi
          />
          <CustomDropdown
            label="Pending"
            options={["All Task", "Ongoing", "Pending", "Collaborative Task", "Done"]}
            selected={filterStatus}
            onChange={setFilterStatus}
            multi
          />
          <button className="add-task-btn" style={{ fontWeight: 700, fontSize: '1.08rem', borderRadius: 10, padding: '14px 32px', background: '#4be08a', marginLeft: 'auto', color: '#fff', boxShadow: '0 2px 8px rgba(75,224,138,0.12)' }}>Add New Task</button>
        </div>
        <form className="dashboard-add-form" onSubmit={handleAddTask} style={{ display: 'flex', gap: 12, margin: '18px 0 0 0' }}>
          <input placeholder="Task Title" value={newTitle} onChange={e => setNewTitle(e.target.value)} required style={{ minWidth: 120 }} />
          <input placeholder="Category" value={newCategory} onChange={e => setNewCategory(e.target.value)} style={{ minWidth: 120 }} />
          <select value={newStatus} onChange={e => setNewStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="InProgress">InProgress</option>
            <option value="Done">Done</option>
          </select>
          <input placeholder="Description" value={newDescription} onChange={e => setNewDescription(e.target.value)} style={{ minWidth: 120 }} />
          <button className="add-task-btn" type="submit">Add New Task</button>
        </form>
        <div className="dashboard-task-cards" style={{ marginTop: 24 }}>
          {filteredTasks.map(task => (
            <div className="dashboard-task-card" key={task._id} style={{ borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', background: '#fff', padding: 24, marginBottom: 18, cursor: 'pointer' }}
              onClick={() => navigate(`/dashboard/task/${task._id}`)}>
              <div className="dashboard-task-header" style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <div className="dashboard-task-avatar" style={{ width: 48, height: 48, background: '#e0f7fa', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 700, color: '#00bfae', marginRight: 14 }}>B</div>
                <div className="dashboard-task-title" style={{ fontWeight: 700, fontSize: '1.18rem', flex: 1 }}>{task.title}</div>
                <button className="dashboard-task-delete" onClick={e => { e.stopPropagation(); handleDelete(task._id); }} title="Delete" style={{ background: 'none', border: 'none', color: '#e74c3c', fontSize: '1.3rem', cursor: 'pointer', marginLeft: 8 }}>🗑️</button>
              </div>
              <div className="dashboard-task-desc" style={{ color: '#444', fontSize: '1rem', marginBottom: 6 }}>{task.description}</div>
              <div className="dashboard-task-meta" style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.98rem', color: '#888' }}>
                <span className="dashboard-task-date">{new Date(task.date).toLocaleDateString()}</span>
                <span className="dashboard-task-status" style={{ color: statusColors[task.status], fontWeight: 600, marginLeft: 8 }}>{task.status}</span>
              </div>
            </div>
          ))}
        </div>
        <CongratulationsModal open={showCongrats} onClose={() => setShowCongrats(false)} />
        <DeleteConfirmModal open={showDelete} onConfirm={confirmDelete} onCancel={() => setShowDelete(false)} />
      </div>
    </>
  );
}

export default Dashboard;

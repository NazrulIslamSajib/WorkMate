import React from 'react';
import './DashboardHeader.css';

const DashboardHeader = () => {
  const email = localStorage.getItem('userEmail') || 'User';
  const name = email.includes('@') ? email.split('@')[0] : email;
  return (
    <header className="dashboard-main-header">
      <div className="dashboard-logo">Tasko</div>
      <nav className="dashboard-nav">
        <a href="#" className="dashboard-nav-link active">Task List</a>
        <a href="#" className="dashboard-nav-link">Spin</a>
      </nav>
      <div className="dashboard-user">
        <span className="dashboard-user-name">{name}</span>
        <img src="/avatar.png" alt="User" className="dashboard-user-avatar" />
      </div>
    </header>
  );
};

export default DashboardHeader;

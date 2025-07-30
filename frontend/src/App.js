import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import './App.css';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import ResetPassword from './components/auth/ResetPassword';
// import TaskList from './components/tasks/TaskList';
import Dashboard from './components/dashboard/Dashboard';
import TaskDetailsPage from './components/dashboard/TaskDetailsPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* <Route path="/tasks" element={<TaskList />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/task/:id" element={<TaskDetailsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

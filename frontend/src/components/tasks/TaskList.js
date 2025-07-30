import React, { useEffect, useState } from 'react';
import './TaskList.css';

const statusColors = {
  Pending: '#e040fb',
  InProgress: '#ffb300',
  Done: '#00c853',
};

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('Pending');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:5000/api/tasks');
    const data = await res.json();
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, category, status, description })
    });
    if (res.ok) {
      setTitle('');
      setCategory('');
      setStatus('Pending');
      setDescription('');
      fetchTasks();
    }
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
  };

  return (
    <div className="tasklist-container">
      <div className="tasklist-header">
        <h2>All Task List</h2>
        <form className="add-task-form" onSubmit={handleAddTask}>
          <input placeholder="Task Title" value={title} onChange={e => setTitle(e.target.value)} required />
          <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="InProgress">InProgress</option>
            <option value="Done">Done</option>
          </select>
          <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
          <button type="submit" className="add-task-btn">Add New Task</button>
        </form>
      </div>
      <div className="task-cards">
        {loading ? <div>Loading...</div> : tasks.map(task => (
          <div className="task-card" key={task._id}>
            <div className="task-card-header">
              <div className="task-avatar">B</div>
              <div className="task-title">{task.title}</div>
              <button className="task-delete" onClick={() => handleDelete(task._id)} title="Delete">🗑️</button>
            </div>
            <div className="task-desc">{task.description}</div>
            <div className="task-meta">
              <span className="task-date">{new Date(task.date).toLocaleDateString()}</span>
              <span className="task-status" style={{ color: statusColors[task.status] }}>{task.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;

import React, { useState } from 'react';
import CustomDropdown from './CustomDropdown';
import './Dashboard.css';

const statusOptions = [
  'All Task', 'Ongoing', 'Pending', 'Collaborative Task', 'Done'
];

const statusColors = {
  Pending: '#e040fb',
  InProgress: '#ffb300',
  Done: '#00c853',
};

export default function TaskDetailsModal({ open, task, onClose, onStatusChange, onDelete, onEdit, onSubmit }) {
  const [selectedStatus, setSelectedStatus] = useState(task?.status || 'Pending');

  if (!open || !task) return null;

  return (
    <div className="modal-overlay" style={{ zIndex: 1000 }}>
      <div className="modal-content" style={{ maxWidth: 800, minWidth: 400, padding: 32, position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer' }}>&times;</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#4be08a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38, fontWeight: 700, color: '#fff' }}>
            <span role="img" aria-label="icon">📝</span>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.5rem' }}>{task.title}</div>
            <div style={{ color: '#666', marginTop: 6, maxWidth: 420 }}>{task.description}</div>
          </div>
        </div>
        <div style={{ margin: '28px 0 0 0', display: 'flex', alignItems: 'center', gap: 32 }}>
          <div>
            <div style={{ fontWeight: 600, color: '#222', fontSize: 15 }}>End Date</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
              <span role="img" aria-label="calendar">📅</span>
              <span style={{ fontWeight: 500 }}>{new Date(task.date).toLocaleDateString()}</span>
            </div>
          </div>
          <div style={{ borderLeft: '1px solid #eee', height: 32 }} />
          <div style={{ fontWeight: 600, color: '#222', fontSize: 15 }}> <span style={{ color: statusColors[task.status], fontWeight: 700, fontSize: 22, marginLeft: 8 }}>&bull; {task.status}</span></div>
        </div>
        <div style={{ margin: '32px 0 0 0' }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Change Status</div>
          <CustomDropdown
            label={selectedStatus}
            options={statusOptions}
            selected={selectedStatus}
            onChange={setSelectedStatus}
            multi={false}
          />
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 36, justifyContent: 'flex-end' }}>
          <button onClick={onDelete} style={{ background: '#ffe3e3', color: '#e74c3c', fontWeight: 600, border: 'none', borderRadius: 8, padding: '12px 32px', fontSize: 16 }}>Delete Task</button>
          <button onClick={onClose} style={{ background: '#eee', color: '#222', fontWeight: 600, border: 'none', borderRadius: 8, padding: '12px 32px', fontSize: 16 }}>Back</button>
          <button onClick={() => onSubmit(selectedStatus)} style={{ background: '#4be08a', color: '#fff', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 32px', fontSize: 16 }}>Submit</button>
        </div>
      </div>
    </div>
  );
}

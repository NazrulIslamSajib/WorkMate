import React from 'react';

const DeleteConfirmModal = ({ open, onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: 16 }}>
          {/* Replace with Figma illustration if available */}
          <span role="img" aria-label="delete" style={{ fontSize: 64 }}>🗑️</span>
        </div>
        <h2>Are you Sure!!</h2>
        <div style={{ color: '#888', marginBottom: 24 }}>
          Do you want to delete this Task on this app?
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 18 }}>
          <button style={{ background: '#4be08a', color: '#111', border: 'none', borderRadius: 6, padding: '10px 32px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer' }} onClick={onConfirm}>Yes</button>
          <button style={{ background: '#ffbdbd', color: '#111', border: 'none', borderRadius: 6, padding: '10px 32px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer' }} onClick={onCancel}>No</button>
        </div>
      </div>
      <style>{`
        .modal-overlay {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          background: rgba(0,0,0,0.18); display: flex; align-items: center; justify-content: center; z-index: 1000;
        }
        .modal-content {
          background: #fff; border-radius: 16px; padding: 36px 48px; box-shadow: 0 2px 24px rgba(0,0,0,0.13); min-width: 340px;
        }
      `}</style>
    </div>
  );
};

export default DeleteConfirmModal;

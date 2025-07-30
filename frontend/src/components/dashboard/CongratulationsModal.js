import React from 'react';

const CongratulationsModal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1 style={{ textAlign: 'center', fontSize: '2.2rem', margin: '20px 0 10px 0' }}>Congratulations</h1>
        <div style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: 16 }}>
          Successfully Completed the Task!
        </div>
        <div style={{ textAlign: 'center', color: '#888', marginBottom: 24 }}>
          Congratulations! you have successfully completed the task and you got 20 points.
        </div>
        <button style={{ background: '#4be08a', color: '#111', border: 'none', borderRadius: 6, padding: '10px 32px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer' }} onClick={onClose}>Close</button>
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

export default CongratulationsModal;

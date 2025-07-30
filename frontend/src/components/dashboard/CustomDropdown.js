import React, { useState, useRef, useEffect } from 'react';
import './CustomDropdown.css';

const CustomDropdown = ({ label, options, selected, onChange, multi = false }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSelect = (option) => {
    if (multi) {
      if (selected.includes(option)) {
        onChange(selected.filter(o => o !== option));
      } else {
        onChange([...selected, option]);
      }
    } else {
      onChange(option);
      setOpen(false);
    }
  };

  return (
    <div className="custom-dropdown" ref={ref}>
      <button type="button" className="dropdown-btn" onClick={() => setOpen(!open)}>
        {multi
          ? (selected.length ? selected.join(', ') : label)
          : (selected || label)}
        <span className="dropdown-arrow">▾</span>
      </button>
      {open && (
        <div className="dropdown-menu">
          {options.map(opt => (
            <div key={opt} className="dropdown-item" onClick={() => handleSelect(opt)}>
              {multi && <input type="checkbox" checked={selected.includes(opt)} readOnly style={{ marginRight: 8 }} />}
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;

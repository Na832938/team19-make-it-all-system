// src/components/common/Dropdown.jsx
import './Dropdown.css';

export default function Dropdown({ children, isOpen }) {
  return (
    <div className={`dropdown ${isOpen ? "open" : ""}`}>
      {children}
    </div>
  );
}

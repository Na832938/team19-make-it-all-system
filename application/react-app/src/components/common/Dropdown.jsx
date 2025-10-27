// src/components/common/Dropdown.jsx
import React from "react";
import './Dropdown.css';

export default function Dropdown({ children, isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="dropdown">
      {children}
    </div>
  );
}

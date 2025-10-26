import React from "react";
import './Card.css'; // move only card styles here

export default function Card({ children, vertical = true, className = "" }) {
  const layoutClass = vertical ? "card-vertical" : "card-horizontal";
  return (
    <div className={`card-container ${layoutClass} ${className}`}>
      {children}
    </div>
  );
}

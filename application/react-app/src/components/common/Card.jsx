import React from "react";
import './Card.css';

export default function Card({ children, vertical = true, useContainer = true, className = "" }) {
  const layoutClass = vertical ? "card-vertical" : "card-horizontal";
  const containerClass = useContainer ? "card-container" : "";
  
  return (
    <div className={`${containerClass} ${layoutClass} ${className}`}>
      {children}
    </div>
  );
}

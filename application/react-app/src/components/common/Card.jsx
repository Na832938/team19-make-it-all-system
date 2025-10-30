import React from "react";
import "./Card.css";

export default function Card({
  children,
  vertical = true,
  className = "",
}) {
  const layoutClass = vertical ? "card card-vertical" : "card card-horizontal";
  return (
    <div className={`${layoutClass} ${className}`.trim()}>
      {children}
    </div>
  );
}

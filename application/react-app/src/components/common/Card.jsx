import React from "react";

export default function Card({
  children,
  vertical = true,
  className = "",
  fullWidth = false
}) {
  const baseClasses = `
    bg-surface text-text-primary
    rounded-lg shadow-md
    p-lg transition-all duration-200 ease-in-out
    hover:-translate-y-1 hover:shadow-lg
    box-border
  `;

  const layoutClasses = vertical 
    ? "flex flex-col gap-md" 
    : "flex flex-row flex-wrap justify-center gap-md md:flex-nowrap";

  const widthClass = fullWidth ? "w-full col-span-full" : "";

  return (
    <div className={`${baseClasses} ${layoutClasses} ${widthClass} ${className}`.trim()}>
      {children}
    </div>
  );
}
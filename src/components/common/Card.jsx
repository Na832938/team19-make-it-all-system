import React from "react";

export default function Card({
  children,
  vertical = true,
  className = "",
  fullWidth = false
}) {
  return (
    <div className={`
      bg-white text-gray-800
      rounded-lg shadow-sm border border-gray-200
      p-6 transition-all duration-200 ease-in-out
      hover:shadow-md
      box-border
      ${vertical 
        ? "flex flex-col gap-4" 
        : "flex flex-row flex-wrap justify-center gap-4 md:flex-nowrap"
      }
      ${fullWidth ? "w-full col-span-full" : ""}
      ${className}
    `.trim()}>
      {children}
    </div>
  );
}
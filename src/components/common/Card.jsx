import React from "react";

export default function Card({
  children,
  vertical = true,
  className = "",
  fullWidth = false
}) {
  return (
    <div
      className={`
        bg-[var(--surface-colour)]
        text-[var(--text-primary)]
        border border-[var(--border-neutral)]
        rounded-lg shadow-sm p-6 box-border
        transition-all duration-200 ease-in-out hover:shadow-md
        ${vertical
          ? "flex flex-col gap-4"
          : "flex flex-row flex-wrap justify-center gap-4 md:flex-nowrap"}
        ${fullWidth ? "w-full col-span-full" : ""}
        ${className}
      `.trim()}
    >
      {children}
    </div>
  );
}

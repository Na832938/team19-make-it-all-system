// src/components/common/Badge.jsx
export default function Badge({
  text,
  bg = "var(--primary-colour)",
  color = "var(--surface-colour)"
}) {
  return (
    <span
      className="px-2 py-1 text-sm rounded-full font-medium"
      style={{ backgroundColor: bg, color }}
    >
      {text}
    </span>
  );
}

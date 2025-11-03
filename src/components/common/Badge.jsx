// src/components/common/Badge.jsx
export default function Badge({
  text,
  bg = "var(--primary-colour)",
  color = "var(--text-primary)"
}) {
  return (
    <span
      className="px-2 py-1 text-sm rounded-full font-medium"
      style={{
        backgroundColor: bg,
        color: color
      }}
    >
      {text}
    </span>
  );
}

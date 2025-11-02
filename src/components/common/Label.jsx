export default function Label({ 
  text, 
  children, 
  htmlFor,
  className = ''
}) {
  return (
    <label 
      className={`
        label-base text-responsive
        text-[var(--text-secondary)] dark:text-[var(--text-secondary)]
        ${className}
      `}
      htmlFor={htmlFor}
    >
      {text && <span className="font-medium">{text}</span>}
      {children}
    </label>
  );
}

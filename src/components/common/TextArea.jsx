export default function TextArea({ 
  value, 
  onChange, 
  placeholder, 
  rows = 4, 
  disabled = false,
  className = ''
}) {
  return (
    <textarea
      className={`
        w-full 
        rounded-md 
        p-2 
        border 
        border-[var(--border-neutral)] 
        text-[var(--text-primary)] 
        bg-[var(--surface-colour)] 
        shadow-sm 
        focus:outline-none 
        focus:ring-2 
        focus:ring-[var(--focus-colour)] 
        disabled:bg-[var(--disabled-colour)] 
        disabled:cursor-not-allowed 
        disabled:text-[var(--text-secondary)] 
        transition-all 
        duration-200 
        ease-in-out
        ${className}
      `}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
    />
  );
}

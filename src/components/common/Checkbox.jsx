export default function Checkbox({ 
  checked = false, 
  onChange, 
  label = '', 
  disabled = false,
  className = ''
}) {
  return (
    <label
      className={`
        flex items-center gap-sm
        font-ubuntu text-body
        text-[var(--text-primary)]
        dark:text-[var(--text-primary)]
        cursor-pointer
        ${disabled ? 'cursor-not-allowed text-[var(--text-secondary)] dark:text-[var(--text-secondary)]' : ''}
        ${className}
      `}
    >
      <input
        type="checkbox"
        className={`
          w-5 h-5
          border border-[var(--border-neutral)]
          dark:border-[var(--border-neutral)]
          rounded-sm
          bg-[var(--surface-colour)]
          dark:bg-[var(--surface-colour)]
          cursor-pointer
          transition-colors duration-200
          focus-visible:outline-2 focus-visible:outline-[var(--focus-colour)] focus-visible:outline-offset-2
          accent-[var(--primary-colour)]
          ${!disabled ? 'hover:border-[var(--primary-colour)]' : ''}
          ${disabled ? 'bg-[var(--disabled-colour)] dark:bg-[var(--disabled-colour)] cursor-not-allowed' : ''}
        `}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      {label && <span className="select-none">{label}</span>}
    </label>
  );
}

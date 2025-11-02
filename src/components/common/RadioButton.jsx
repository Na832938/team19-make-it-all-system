export default function RadioButton({ 
  checked = false, 
  onChange, 
  label = '', 
  disabled = false, 
  name,
  className = ''
}) {
  return (
    <label
      className={`
        flex items-center gap-sm
        font-ubuntu text-body
        text-[var(--text-primary)]
        cursor-pointer
        ${disabled ? 'cursor-not-allowed text-[var(--text-secondary)]' : ''}
        ${className}
      `}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-4 h-4
          border border-[var(--border-neutral)]
          rounded-full
          bg-[var(--surface-colour)]
          accent-[var(--primary-colour)]
          transition-all duration-200
          focus-visible:outline-2 focus-visible:outline-[var(--focus-colour)] focus-visible:outline-offset-2
          ${!disabled ? 'hover:border-[var(--primary-colour)] hover:shadow-[0_0_0_2px_rgba(11,94,215,0.15)]' : ''}
          ${disabled ? 'bg-[var(--disabled-colour)]' : ''}
        `}
      />
      {label && <span className="select-none">{label}</span>}
    </label>
  );
}

export default function Checkbox({ 
  checked = false, 
  onChange, 
  label = '', 
  disabled = false,
  className = ''
}) {
  return (
    <label className={`flex items-center gap-sm font-ubuntu text-body text-text-primary cursor-pointer ${disabled ? 'cursor-not-allowed text-text-secondary' : ''} ${className}`}>
      <input
        type="checkbox"
        className={`w-5 h-5 border border-border-neutral rounded-sm bg-surface cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 accent-primary ${!disabled && 'hover:border-primary'} ${disabled ? 'bg-disabled cursor-not-allowed' : ''}`}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      {label && <span className="select-none">{label}</span>}
    </label>
  );
}


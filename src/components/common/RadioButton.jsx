export default function RadioButton({ 
  checked = false, 
  onChange, 
  label = '', 
  disabled = false, 
  name,
  className = ''
}) {
  return (
    <label className={`flex items-center gap-sm font-ubuntu text-body text-text-primary cursor-pointer ${disabled ? 'cursor-not-allowed text-text-secondary' : ''} ${className}`}>
      <input
        type="radio"
        className={`w-4 h-4 border border-border-neutral rounded-full bg-surface accent-primary transition-all duration-200 focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 ${!disabled && 'hover:border-primary hover:shadow-[0_0_0_2px_rgba(26,115,232,0.15)]'} ${disabled ? 'bg-disabled' : ''}`}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        name={name}
      />
      {label && <span className="select-none">{label}</span>}
    </label>
  );
}
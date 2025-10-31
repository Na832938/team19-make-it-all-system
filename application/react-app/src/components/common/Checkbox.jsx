export default function Checkbox({ 
  checked = false, 
  onChange, 
  label = '', 
  disabled = false 
}) {
  return (
    <label className={`
      flex items-center gap-sm
      font-ubuntu text-body text-text-primary
      cursor-pointer
      ${disabled ? 'cursor-not-allowed text-text-secondary' : ''}
    `}>
      <input
        type="checkbox"
        className={`
          w-5 h-5
          border border-border-neutral rounded-sm
          bg-surface
          cursor-pointer
          transition-colors duration-200 ease-in-out
          focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2
          ${!disabled && 'hover:border-primary'}
          ${disabled ? 'bg-disabled border-border-neutral cursor-not-allowed' : ''}
          accent-primary
        `}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      {label && <span className="select-none flex-shrink-0">{label}</span>}
    </label>
  );
}
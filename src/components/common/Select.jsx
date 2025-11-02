export default function Select({ 
  value, 
  onChange, 
  options = [], 
  placeholder, 
  name, 
  defaultValue, 
  disabled = false,
  variant = 'default', // 'default' | 'outlined' | 'filled'
  className = '',
  ...props
}) {
  const baseClasses = `
    w-full
    max-w-[25rem]
    px-3
    py-2
    rounded-md
    text-[var(--text-primary)]
    font-sans
    text-base
    transition
    duration-200
    ease-in-out
    shadow-sm
    focus:outline-2
    focus:outline-[var(--focus-colour)]
    focus:outline-offset-2
    disabled:opacity-60
    disabled:cursor-not-allowed
    cursor-pointer
  `;

  const variantClasses = {
    default: 'bg-[var(--surface-colour)] border border-[var(--border-neutral)]',
    outlined: 'bg-[var(--surface-colour)] border border-[var(--border-neutral)]',
    filled: 'bg-[var(--secondary-colour)] border border-[var(--border-neutral)]'
  };

  const hoverClasses = disabled ? '' : 'hover:border-[var(--primary-colour)]';

  return (
    <select
      name={name}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}
      {...props}
    >
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map((opt, idx) => (
        <option key={idx} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

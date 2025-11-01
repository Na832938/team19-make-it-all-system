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
    text-textPrimary
    font-sans
    text-base
    transition
    duration-200
    ease-in-out
    shadow-sm
    focus:outline-none
    focus:ring-2
    focus:ring-primary/30
    disabled:opacity-60
    disabled:cursor-not-allowed
    cursor-pointer
  `;

  const variantClasses = {
    default: 'bg-surface border border-gray-300',
    outlined: 'bg-white border border-gray-400',
    filled: 'bg-gray-100 border border-gray-200'
  };

  const hoverClasses = disabled ? '' : 'hover:border-primary';

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

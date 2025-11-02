export default function TextInput({
  type = 'text',
  value,
  onChange,
  placeholder,
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
    focus:outline-none
    focus:ring-2
    focus:ring-[var(--focus-colour)]
    disabled:opacity-60
    disabled:cursor-not-allowed
  `;

  const variantClasses = {
    default: 'bg-[var(--surface-colour)] border border-[var(--border-neutral)]',
    outlined: 'bg-[var(--surface-colour)] border border-[var(--border-neutral)]',
    filled: 'bg-[var(--secondary-colour)] border border-[var(--border-neutral)]'
  };

  const hoverClasses = disabled ? '' : 'hover:border-[var(--primary-colour)]';

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}
      {...props}
    />
  );
}

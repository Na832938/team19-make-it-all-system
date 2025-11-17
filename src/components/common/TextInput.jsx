import PropTypes from 'prop-types';

/**
 * A text input component.
 *
 * @param {object} props - The component's props.
 * @param {string} [props.type='text'] - The type of the input.
 * @param {string} props.value - The value of the input.
 * @param {Function} props.onChange - The function to call when the input value changes.
 * @param {string} props.placeholder - The placeholder text to display.
 * @param {boolean} [props.disabled=false] - Whether the input is disabled.
 * @param {'default' | 'outlined' | 'filled'} [props.variant='default'] - The variant of the input.
 * @param {string} [props.className=''] - Additional CSS classes to apply to the input.
 * @returns {JSX.Element} The text input component.
 */
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
  const handleOnChange = (e) => {
    console.log(`TextInput value changed: ${e.target.value}`);
    if (onChange) {
      onChange(e);
    }
  };

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
      onChange={handleOnChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}
      {...props}
    />
  );
}

TextInput.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'outlined', 'filled']),
  className: PropTypes.string,
};

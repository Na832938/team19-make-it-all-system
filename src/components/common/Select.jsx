import PropTypes from 'prop-types';
import { logger } from '../../lib/logger';

/**
 * A select dropdown component.
 *
 * @param {object} props - The component's props.
 * @param {string} props.value - The current value of the select.
 * @param {Function} props.onChange - The function to call when the select value changes.
 * @param {Array<object>} [props.options=[]] - The options to display in the select.
 * @param {string} props.placeholder - The placeholder text to display.
 * @param {string} props.name - The name of the select.
 * @param {string} props.defaultValue - The default value of the select.
 * @param {boolean} [props.disabled=false] - Whether the select is disabled.
 * @param {'default' | 'outlined' | 'filled'} [props.variant='default'] - The variant of the select.
 * @param {string} [props.className=''] - Additional CSS classes to apply to the select.
 * @returns {JSX.Element} The select component.
 */
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

  const handleOnChange = (e) => {
    logger.action(`Select "${name}" changed to: ${e.target.value}`);
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
      onChange={handleOnChange}
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

Select.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
  })),
  placeholder: PropTypes.string,
  name: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'outlined', 'filled']),
  className: PropTypes.string,
};

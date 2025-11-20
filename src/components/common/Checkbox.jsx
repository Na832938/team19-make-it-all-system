import PropTypes from 'prop-types';
import { logger } from '../../lib/logger';

/**
 * A checkbox component.
 *
 * @param {object} props - The component's props.
 * @param {boolean} [props.checked=false] - Whether the checkbox is checked.
 * @param {Function} props.onChange - The function to call when the checkbox value changes.
 * @param {string} [props.label=''] - The label for the checkbox.
 * @param {boolean} [props.disabled=false] - Whether the checkbox is disabled.
 * @param {string} [props.className=''] - Additional CSS classes to apply to the checkbox.
 * @returns {JSX.Element} The checkbox component.
 */
export default function Checkbox({
  checked = false,
  onChange,
  label = '',
  disabled = false,
  className = ''
}) {

  const handleOnChange = (e) => {
    logger.action(`Checkbox "${label}" changed to: ${e.target.checked}`);
    if (onChange) {
      onChange(e);
    }
  };

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
        onChange={handleOnChange}
        disabled={disabled}
      />
      {label && <span className="select-none">{label}</span>}
    </label>
  );
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

import PropTypes from 'prop-types';
import { logger } from '../../lib/logger';

/**
 * A radio button component.
 *
 * @param {object} props - The component's props.
 * @param {boolean} [props.checked=false] - Whether the radio button is checked.
 * @param {Function} props.onChange - The function to call when the radio button value changes.
 * @param {string} [props.label=''] - The label for the radio button.
 * @param {boolean} [props.disabled=false] - Whether the radio button is disabled.
 * @param {string} props.name - The name of the radio button group.
 * @param {string} [props.className=''] - Additional CSS classes to apply to the radio button.
 * @returns {JSX.Element} The radio button component.
 */
export default function RadioButton({
  checked = false,
  onChange,
  label = '',
  disabled = false,
  name,
  className = ''
}) {

  const handleOnChange = (e) => {
    logger.action(`Radio button "${label}" changed to: ${e.target.checked}`);
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
        cursor-pointer
        ${disabled ? 'cursor-not-allowed text-[var(--text-secondary)]' : ''}
        ${className}
      `}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={handleOnChange}
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

RadioButton.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

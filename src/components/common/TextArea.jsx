import PropTypes from 'prop-types';
import { logger } from '../../lib/logger';

/**
 * A textarea component.
 *
 * @param {object} props - The component's props.
 * @param {string} props.value - The value of the textarea.
 * @param {Function} props.onChange - The function to call when the textarea value changes.
 * @param {string} props.placeholder - The placeholder text to display.
 * @param {number} [props.rows=4] - The number of rows for the textarea.
 * @param {boolean} [props.disabled=false] - Whether the textarea is disabled.
 * @param {string} [props.className=''] - Additional CSS classes to apply to the textarea.
 * @returns {JSX.Element} The textarea component.
 */
export default function TextArea({
  value,
  onChange,
  placeholder,
  rows = 4,
  disabled = false,
  className = ''
}) {

  const handleOnChange = (e) => {
    logger.action(`TextArea value changed: ${e.target.value}`);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <textarea
      className={`
        w-full
        rounded-md
        p-2
        border
        border-[var(--border-neutral)]
        text-[var(--text-primary)]
        bg-[var(--surface-colour)]
        shadow-sm
        focus:outline-none
        focus:ring-2
        focus:ring-[var(--focus-colour)]
        disabled:bg-[var(--disabled-colour)]
        disabled:cursor-not-allowed
        disabled:text-[var(--text-secondary)]
        transition-all
        duration-200
        ease-in-out
        ${className}
      `}
      value={value}
      onChange={handleOnChange}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
    />
  );
}

TextArea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

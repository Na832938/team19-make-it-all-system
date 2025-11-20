import PropTypes from 'prop-types';

/**
 * A label component for form elements.
 *
 * @param {object} props - The component's props.
 * @param {string} props.text - The text to display in the label.
 * @param {React.ReactNode} props.children - The content of the label.
 * @param {string} props.htmlFor - The ID of the element the label is associated with.
 * @param {string} [props.className=''] - Additional CSS classes to apply to the label.
 * @returns {JSX.Element} The label component.
 */
export default function Label({
  text,
  children,
  htmlFor,
  className = ''
}) {
  // Component rendering tracked via logger in development
  return (
    <label
      className={`
        label-base text-responsive
        text-[var(--text-secondary)] dark:text-[var(--text-secondary)]
        ${className}
      `}
      htmlFor={htmlFor}
    >
      {text && <span className="font-medium">{text}</span>}
      {children}
    </label>
  );
}

Label.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
  htmlFor: PropTypes.string.isRequired,
  className: PropTypes.string,
};

import PropTypes from 'prop-types';

/**
 * A dropdown component that shows or hides content.
 *
 * @param {object} props - The component's props.
 * @param {React.ReactNode} props.children - The content to display within the dropdown.
 * @param {boolean} props.isOpen - Whether the dropdown is currently open.
 * @param {string} [props.className=''] - Additional CSS classes to apply to the dropdown container.
 * @returns {JSX.Element} The dropdown component.
 */
export default function Dropdown({
  children,
  isOpen,
  className = ''
}) {
  // Component rendering tracked via logger in development
  return (
    <div className={`
      dropdown-base dropdown-responsive
      ${isOpen ? 'flex' : 'hidden'}
      ${className}
    `}>
      <div className="bg-[var(--surface-colour)] dark:bg-[var(--surface-colour)] text-[var(--text-primary)] dark:text-[var(--text-primary)] border border-[var(--border-neutral)] dark:border-[var(--border-neutral)] rounded-md shadow-sm p-2 w-full">
        {children}
      </div>
    </div>
  );
}

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

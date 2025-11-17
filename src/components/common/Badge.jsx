// src/components/common/Badge.jsx
import PropTypes from 'prop-types';

/**
 * A badge component for displaying short, important information.
 *
 * @param {object} props - The component's props.
 * @param {string} props.text - The text to display in the badge.
 * @param {string} [props.bg="var(--primary-colour)"] - The background color of the badge.
 * @param {string} [props.color="var(--text-primary)"] - The text color of the badge.
 * @returns {JSX.Element} The badge component.
 */
export default function Badge({
  text,
  bg = "var(--primary-colour)",
  color = "var(--text-primary)"
}) {
  console.log(`Rendering Badge with text: ${text}`);
  return (
    <span
      className="px-2 py-1 text-sm rounded-full font-medium"
      style={{
        backgroundColor: bg,
        color: color
      }}
    >
      {text}
    </span>
  );
}

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  bg: PropTypes.string,
  color: PropTypes.string,
};

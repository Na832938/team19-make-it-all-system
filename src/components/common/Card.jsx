import React from "react";
import PropTypes from 'prop-types';

/**
 * A card component for displaying content.
 *
 * @param {object} props - The component's props.
 * @param {React.ReactNode} props.children - The content of the card.
 * @param {boolean} [props.vertical=true] - Whether to display the content vertically.
 * @param {string} [props.className=""] - Additional CSS classes to apply to the card.
 * @param {boolean} [props.fullWidth=false] - Whether the card should take up the full width.
 * @returns {JSX.Element} The card component.
 */
export default function Card({
  children,
  vertical = true,
  className = "",
  fullWidth = false
}) {
  console.log("Rendering Card component");
  return (
    <div
      className={`
        bg-[var(--surface-colour)]
        text-[var(--text-primary)]
        border border-[var(--border-neutral)]
        rounded-lg shadow-sm p-6 box-border
        transition-all duration-200 ease-in-out hover:shadow-md
        dark:bg-[var(--surface-colour)]
        dark:text-[var(--text-primary)]
        dark:border-[var(--border-neutral)]
        ${vertical
          ? "flex flex-col gap-4"
          : "flex flex-row flex-wrap justify-center gap-4 md:flex-nowrap"}
        w-full sm:w-auto
        ${fullWidth ? "col-span-full" : ""}
        ${className}
      `.trim()}
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  vertical: PropTypes.bool,
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
};

// components/common/StatCard.jsx
import Card from "../common/Card.jsx";
import PropTypes from 'prop-types';

/**
 * A card component for displaying a statistic.
 *
 * @param {object} props - The component's props.
 * @param {string} props.title - The title of the statistic.
 * @param {React.ReactNode} props.icon - The icon for the statistic.
 * @param {React.ReactNode} props.children - The content of the statistic card.
 * @param {string} [props.variant="default"] - The variant of the card.
 * @param {string} [props.padding="medium"] - The padding of the card.
 * @param {string} [props.className=""] - Additional CSS classes to apply to the card.
 * @returns {JSX.Element} The stat card component.
 */
export default function StatCard({
  title,
  icon,
  children,
  variant = "default",
  padding = "medium",
  className = ""
}) {
  // Component rendering tracked via logger in development
  return (
    <Card variant={variant} padding={padding} className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
        {icon}
      </div>
      {children}
    </Card>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  padding: PropTypes.string,
  className: PropTypes.string,
};

import PropTypes from 'prop-types';

/**
 * A component to display a single activity item.
 *
 * @param {object} props - The component's props.
 * @param {React.ReactNode} props.icon - The icon for the activity item.
 * @param {string} props.iconBg - The background color for the icon.
 * @param {string} props.title - The title of the activity item.
 * @param {string} props.time - The time of the activity item.
 * @returns {JSX.Element} The activity item component.
 */
export default function ActivityItem({ icon, iconBg, title, time }) {
  console.log(`Rendering ActivityItem: ${title}`);
  return (
    <div className="flex items-center gap-3 p-3 bg-[var(--surface-colour)] rounded-lg border border-[var(--border-neutral)]">
      <div className={`w-8 h-8 ${iconBg} rounded-full flex items-center justify-center`}>
        <span className="text-sm text-[var(--text-primary)]">{icon}</span>
      </div>
      <div>
        <p className="font-medium text-[var(--text-primary)]">{title}</p>
        <p className="text-sm text-[var(--text-secondary)]">{time}</p>
      </div>
    </div>
  );
}

ActivityItem.propTypes = {
  icon: PropTypes.node.isRequired,
  iconBg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

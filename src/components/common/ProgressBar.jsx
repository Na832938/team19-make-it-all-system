import PropTypes from 'prop-types';

/**
 * A progress bar component.
 *
 * @param {object} props - The component's props.
 * @param {number} [props.value=0] - The current value of the progress bar.
 * @param {number} [props.max=100] - The maximum value of the progress bar.
 * @param {string} props.label - The label for the progress bar.
 * @param {string} [props.className=''] - Additional CSS classes to apply to the progress bar.
 * @returns {JSX.Element} The progress bar component.
 */
export default function ProgressBar({
  value = 0,
  max = 100,
  label,
  className = ''
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  // Component rendering tracked via logger in development

  const getColorClass = (percent) => {
    if (percent >= 80) return 'bg-green-500 dark:bg-green-600';
    if (percent >= 50) return 'bg-blue-500 dark:bg-blue-600';
    if (percent >= 30) return 'bg-yellow-400 dark:bg-yellow-500';
    return 'bg-red-500 dark:bg-red-600';
  };

  return (
    <div className={`flex flex-col gap-2 w-full max-w-[25rem] sm:max-w-full ${className}`}>
      {label && <span className="text-[var(--text-primary)] dark:text-[var(--text-secondary)] text-sm font-medium">{label}</span>}
      <div className="w-full h-3 min-h-5 bg-[var(--border-neutral)] dark:bg-[var(--border-neutral)] rounded-md shadow-sm overflow-hidden">
        <div
          className={`h-full rounded-md transition-all duration-300 ease-in-out ${getColorClass(percentage)}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs text-right text-[var(--text-secondary)] dark:text-[var(--text-primary)] sm:text-[0.75rem]">
        {Math.round(percentage)}%
      </span>
    </div>
  );
}

ProgressBar.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  label: PropTypes.string,
  className: PropTypes.string,
};

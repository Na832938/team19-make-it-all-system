import { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import Card from './Card.jsx';
import PropTypes from 'prop-types';

/**
 * A component to display project statistics using a doughnut chart.
 *
 * @param {object} props - The component's props.
 * @param {object} props.project - The project data to display.
 * @returns {JSX.Element} The stats chart component.
 */
export default function StatsChart({ project }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;
    logger.trace('StatsChart', 'creating chart', { projectTitle: project.title });

    const ctx = chartRef.current.getContext('2d');
    const rootStyles = getComputedStyle(document.documentElement);
    const isDark = document.body.classList.contains('dark') ||
                  window.matchMedia('(prefers-color-scheme: dark)').matches;

    const textColour = isDark
      ? rootStyles.getPropertyValue('--text-primary').trim()
      : rootStyles.getPropertyValue('--text-primary').trim();

    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Incomplete'],
        datasets: [
          {
            data: [project.completed, project.incomplete],
            backgroundColor: ['#198754', '#dc3545'],
            hoverBackgroundColor: ['#22c55e', '#b91c1c'],
            borderWidth: 1,
            hoverOffset: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        animation: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: textColour, font: { size: 12 } },
          },
          title: {
            display: true,
            text: project.title,
            color: textColour,
            font: { weight: 600, size: 14 },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        logger.trace('StatsChart', 'destroying chart', { projectTitle: project.title });
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [project]);

  return (
    
      <div className="relative w-full md:w-2/5 flex-shrink-0">
          <div className="w-full h-64 md:h-80"> {/* adjust height as needed */}
            <canvas ref={chartRef} className="w-full h-full" />
          </div>
       
        <div className="w-full bg-[var(--secondary-colour)] rounded-lg p-4">
          <h3 className="text-base font-semibold text-[var(--text-primary)] mb-3">
            Team member workload for {project.title}
          </h3>
          <ul className="space-y-1.5">
            {project.teamMembers.map((member, index) => (
              <li
                key={index}
                className="text-[var(--text-primary)] text-sm leading-snug"
              >
                <span className="font-medium">{member.name}:</span>{' '}
                {member.tasks.join(', ')}
              </li>
            ))}
          </ul>
        </div>
      </div>
 
  );
}

StatsChart.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.number.isRequired,
    incomplete: PropTypes.number.isRequired,
    teamMembers: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      tasks: PropTypes.arrayOf(PropTypes.string).isRequired,
    })).isRequired,
  }).isRequired,
};

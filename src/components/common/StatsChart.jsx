import { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import Card from './Card.jsx';

export default function StatsChart({ project }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(chartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Completed', 'Incomplete'],
          datasets: [{
            data: [project.completed, project.incomplete],
            backgroundColor: ['#36A2EB', '#FF6384'],
            hoverOffset: 10
          }]
        },
        options: {
          plugins: {
            legend: { position: 'bottom' },
            title: { display: true, text: project.title }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [project]);

  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="w-full md:w-2/5 min-w-[200px]">
          <canvas ref={chartRef} />
        </div>

        <div className="w-full md:w-3/5 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Team member workload for {project.title}
          </h3>
          <ul className="space-y-2">
            {project.teamMembers.map((member, index) => (
              <li key={index} className="text-gray-700">
                <span className="font-medium">{member.name}:</span>{' '}
                {member.tasks.join(', ')}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}
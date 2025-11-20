// src/components/dashboard/GraphDisplay.jsx
import Card from '../common/Card.jsx';
import StatsChart from '../common/StatsChart.jsx';
import Carousel from '../common/Carousel.jsx';
import projects from '../../data/projects.json';

/**
 * A component to display project analytics graphs.
 * @returns {JSX.Element} The graph display component.
 */
export default function GraphDisplay() {
  // Component rendering tracked via logger in development
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Project Analytics</h1>
        <p className="text-[var(--text-secondary)]">Project progress and performance metrics</p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left: Project Status */}
        <Card className="p-6 border-2 border-[var(--border-neutral)]">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Project Status</h3>
          <div className="space-y-3">
            {projects.map(project => (
              <div
                key={project.id}
                className="flex items-center justify-between p-3 border-b border-[var(--border-neutral)]"
              >
                <div className="flex-1">
                  <div className="font-medium text-sm text-[var(--text-primary)]">{project.title}</div>
                </div>
                <div className={`px-3 py-1 rounded text-sm font-medium ${
                  project.completed >= 80
                    ? 'bg-green-100 text-green-800'
                    : project.completed >= 50
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {project.completed}%
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right: Project Carousel */}
          <Card className="p-6 border-2 border-[var(--border-neutral)]">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Project Progress Overview</h3>
            <Carousel
              items={projects}
              visible={1}
              renderItem={(project) => (
                <StatsChart key={project.id} project={project} />
              )}
            />
          </Card>

      </div>
    </div>
  );
}

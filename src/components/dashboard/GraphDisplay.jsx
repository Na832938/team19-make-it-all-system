// src/components/dashboard/GraphDisplay.jsx
import Card from '../common/Card.jsx';
import StatsChart from '../common/StatsChart.jsx';
import projects from '../../data/projects.json';

export default function GraphDisplay() {
  return (
    <div className="p-6 space-y-6">
      {/* Simple Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Project Analytics</h1>
        <p className="text-[var(--text-secondary)]">Project progress and performance metrics</p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Project Progress Overview */}
        <Card className="p-6 border-2 border-[var(--border-neutral)]">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Project Progress Overview</h3>
          <div className="space-y-4">
            {projects.map(project => (
              <StatsChart key={project.id} project={project} compact={true} />
            ))}
          </div>
        </Card>

        {/* Project Status Summary */}
        <Card className="p-6 border-2 border-[var(--border-neutral)]">
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Project Status</h3>
          <div className="space-y-3">
            {projects.map(project => (
              <div key={project.id} className="flex items-center justify-between p-3 border-b border-[var(--border-neutral)]">
                <div className="flex-1">
                  <div className="font-medium text-sm text-[var(--text-primary)]">{project.title}</div>
                </div>
                <div className={`px-3 py-1 rounded text-sm font-medium ${
                  project.completed >= 80 ? 'bg-green-100 text-green-800' :
                  project.completed >= 50 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {project.completed}%
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Detailed Charts */}
      <Card className="p-6 border-2 border-[var(--border-neutral)]">
        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Detailed Progress Analysis</h3>
        <div className="space-y-4">
          {projects.slice(0, 3).map(project => (
            <StatsChart key={project.id} project={project} showDetails={true} />
          ))}
        </div>
      </Card>
    </div>
  );
}

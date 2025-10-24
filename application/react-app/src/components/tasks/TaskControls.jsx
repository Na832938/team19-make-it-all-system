// TaskControls.jsx
export default function TaskControls({ filters, onChange }) {
  return (
    <section className="controls">
      <label>
        Status:
        <select value={filters.status} onChange={e => onChange({ ...filters, status: e.target.value })}>
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </label>
      <label>
        Priority:
        <select value={filters.priority} onChange={e => onChange({ ...filters, priority: e.target.value })}>
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </label>
      <label>
        Search:
        <input type="text" value={filters.q} onChange={e => onChange({ ...filters, q: e.target.value })} placeholder="Search title..." />
      </label>
      <label>
        Sort by:
        <select value={filters.sort} onChange={e => onChange({ ...filters, sort: e.target.value })}>
          <option value="none">None</option>
          <option value="dueAsc">Due date ↑</option>
          <option value="dueDesc">Due date ↓</option>
          <option value="prioAsc">Priority (Low→High)</option>
          <option value="prioDesc">Priority (High→Low)</option>
        </select>
      </label>
    </section>
  );
}

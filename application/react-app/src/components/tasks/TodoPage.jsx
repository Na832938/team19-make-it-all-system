import { useState } from 'react';
import TaskForm from './TaskForm.jsx';
import TaskControls from './TaskControls.jsx';
import TaskList from './TaskList.jsx';
import Card from '../common/Card.jsx';
import tasks from '../../data/tasks.json';

export default function TodoPage() {
const [tasksState, setTasks] = useState(tasks);
const [editingId, setEditingId] = useState(null);
const [filters, setFilters] = useState({
status: 'All',
priority: 'All',
q: '',
sort: 'none',
});

const priorityRank = { Low: 1, Medium: 2, High: 3 };

const filteredTasks = tasksState
.filter(
(t) =>
(filters.status === 'All' || t.status === filters.status) &&
(filters.priority === 'All' || t.priority === filters.priority) &&
(!filters.q || t.title.toLowerCase().includes(filters.q.toLowerCase()))
)
.sort((a, b) => {
switch (filters.sort) {
case 'dueAsc':
return (a.dueDate || '').localeCompare(b.dueDate || '');
case 'dueDesc':
return (b.dueDate || '').localeCompare(a.dueDate || '');
case 'prioAsc':
return priorityRank[a.priority] - priorityRank[b.priority];
case 'prioDesc':
return priorityRank[b.priority] - priorityRank[a.priority];
default:
return 0;
}
});

const addTask = (task) => {
const id =
window.crypto?.randomUUID?.() ??
Date.now().toString() + Math.random().toString(16).slice(2);
setTasks([...tasksState, { ...task, id, status: 'To Do' }]);
};

const updateTask = (id, updated) =>
setTasks(tasksState.map((t) => (t.id === id ? { ...t, ...updated } : t)));

const deleteTask = (id) =>
setTasks(tasksState.filter((t) => t.id !== id));

const changeStatus = (id) => {
const cycle = ['To Do', 'In Progress', 'Done'];
const t = tasksState.find((t) => t.id === id);
if (!t) return;
const next = cycle[(cycle.indexOf(t.status) + 1) % cycle.length];
updateTask(id, { status: next });
};

return (
<div className="vertical-center" style={{ gap: 'var(--space-lg)', width: '100%' }}>
<div className="dashboard-grid" style={{ width: '100%' }}>   
   <Card>
      <div>
        <h2>Add Task</h2>
        <TaskForm onAdd={addTask} />
      </div>
    </Card>

    <Card className="full-width-card">
      <div>
        <h2>Tasks</h2>
        <div className="horizontal-center" style={{ marginBottom: '1rem', gap: 'var(--space-md)', flexWrap: 'nowrap' }}>
          <TaskControls filters={filters} onChange={setFilters} />
        </div>
        <TaskList
          tasks={tasksState}
          editingId={editingId}
          onEdit={setEditingId}
          onDelete={deleteTask}
          onSave={() => setEditingId(null)}
          onCancel={() => setEditingId(null)}
          onStatusChange={changeStatus}
        />
      </div>
    </Card>

  </div>
</div>
);
}
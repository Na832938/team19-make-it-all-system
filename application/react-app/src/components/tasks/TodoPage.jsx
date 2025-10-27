import { useState } from 'react';
import TaskForm from './TaskForm.jsx';
import TaskControls from './TaskControls.jsx';
import TaskList from './TaskList.jsx';
import Card from '../common/Card.jsx';
import './TodoPage.css';

function TodoPage() {
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [filters, setFilters] = useState({ status: 'All', priority: 'All', q: '', sort: 'none' });

  const priorityRank = { Low: 1, Medium: 2, High: 3 };

  const filteredTasks = tasks
    .filter(t => (filters.status === 'All' || t.status === filters.status) &&
                 (filters.priority === 'All' || t.priority === filters.priority) &&
                 (!filters.q || t.title.toLowerCase().includes(filters.q.toLowerCase())))
    .sort((a, b) => {
      switch (filters.sort) {
        case 'dueAsc': return (a.dueDate||'').localeCompare(b.dueDate||'');
        case 'dueDesc': return (b.dueDate||'').localeCompare(a.dueDate||'');
        case 'prioAsc': return priorityRank[a.priority]-priorityRank[b.priority];
        case 'prioDesc': return priorityRank[b.priority]-priorityRank[a.priority];
        default: return 0;
      }
    });

  const addTask = (task) => {
    const id = (window.crypto?.randomUUID?.() ?? Date.now().toString() + Math.random().toString(16).slice(2));
    setTasks([...tasks, { ...task, id, status: 'To Do' }]);
  };

  const updateTask = (id, updated) => setTasks(tasks.map(t => t.id === id ? { ...t, ...updated } : t));
  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));
  const changeStatus = (id) => {
    const cycle = ['To Do', 'In Progress', 'Done'];
    const t = tasks.find(t => t.id === id);
    if (!t) return;
    const next = cycle[(cycle.indexOf(t.status)+1)%cycle.length];
    updateTask(id, { status: next });
  };

  return (
      <div className="todo-page">
  <div className="todo-cards">

    {/* Top form card */}
    <Card className="card-vertical">
      <h2>Add Task</h2>
      <TaskForm onAdd={addTask} />
    </Card>

    {/* Full-width tasks card */}
    <Card vertical className="full-width-card">
      <h2>Tasks</h2>
      <div className="horizontal-center" style={{ marginBottom: "1rem" }}>
        <TaskControls filters={filters} onChange={setFilters} />
      </div>

      <TaskList
        tasks={filteredTasks}
        editingId={editingId}
        onEdit={setEditingId}
        onDelete={deleteTask}
        onSave={() => setEditingId(null)}
        onCancel={() => setEditingId(null)}
        onStatusChange={changeStatus}
      />
    </Card>

  </div>
</div>

    );

}

export default TodoPage;

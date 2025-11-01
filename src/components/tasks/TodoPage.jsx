import { useState } from 'react';
import TaskForm from './TaskForm.jsx';
import TaskControls from './TaskControls.jsx';
import Card from '../common/Card.jsx';
import tasks from '../../data/tasks.json';
import DataList from '../common/DataList.jsx';

export default function TodoPage() {
  const [tasksState, setTasks] = useState(tasks);
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

  const handleAddTask = async (taskData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTask = {
          ...taskData,
          id: window.crypto?.randomUUID?.() ?? Date.now().toString() + Math.random().toString(16).slice(2)
        };
        setTasks(prev => [...prev, newTask]);
        resolve(newTask);
      }, 500);
    });
  };

  const deleteTask = (id) => {
    setTasks(tasksState.filter((t) => t.id !== id));
  };

  const changeStatus = (id) => {
    const cycle = ['To Do', 'In Progress', 'Done'];
    const task = tasksState.find((t) => t.id === id);
    if (!task) return;
    const nextStatus = cycle[(cycle.indexOf(task.status) + 1) % cycle.length];
    setTasks(tasksState.map((t) => 
      t.id === id ? { ...t, status: nextStatus } : t
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-8xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600 mt-2">Manage your tasks and track progress</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="p-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Add Task</h2>
                <TaskForm onSubmit={handleAddTask} />
              </div>
            </Card>
          </div>

          <div className="md:col-span-2">
            <div className="space-y-6">
              <Card className="p-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Task List</h2>
                  <TaskControls filters={filters} onChange={setFilters} />
                </div>
              </Card>
              
              <DataList
                type="task"
                items={filteredTasks}
                title="Task List"
                onAction={(action, task) => {
                  if (action === 'delete') deleteTask(task.id);
                  if (action === 'status') changeStatus(task.id);
                }}
                variant="bordered"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
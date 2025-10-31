import { useState } from 'react';
import TaskForm from './TaskForm.jsx';
import TaskControls from './TaskControls.jsx';
import TaskList from './TaskList.jsx';
import Card from '../common/Card.jsx';
import tasks from '../../data/tasks.json';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600 mt-2">Manage your tasks and track progress</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="p-6 h-fit md:sticky md:top-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Add Task</h2>
                <TaskForm onSubmit={handleAddTask} />
              </div>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Task List</h2>
                  <TaskControls filters={filters} onChange={setFilters} />
                </div>
                
                <TaskList
                  tasks={filteredTasks}
                  onDelete={deleteTask}
                  onStatusChange={changeStatus}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
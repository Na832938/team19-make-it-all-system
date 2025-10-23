// TaskForm.jsx
export default function TaskForm({ onAdd }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.taskName.value.trim();
    const priority = e.target.priority.value;
    const dueDate = e.target.dueDate.value || null;
    if (!name) return;
    onAdd({ title: name, priority, dueDate });
    e.target.reset();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit} autoComplete="off">
      <input name="taskName" type="text" placeholder="Task name" required />
      <select name="priority" defaultValue="Medium">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input name="dueDate" type="date" />
      <button type="submit" className="btn btn-primary">Add Task</button>
    </form>
  );
}

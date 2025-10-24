// TaskItem.jsx
export default function TaskItem({ task, isEditing, onEdit, onDelete, onSave, onCancel, onStatusChange }) {
  if (isEditing) {
    return (
      <li className={`task-item status-${task.status.replace(' ', '').toLowerCase()}`}>
        <input type="text" className="input-title" defaultValue={task.title} />
        <select className="select-priority" defaultValue={task.priority}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input type="date" className="input-due" defaultValue={task.dueDate || ''} />
        <button className="btn btn-save" onClick={onSave}>Save</button>
        <button className="btn btn-cancel" onClick={onCancel}>Cancel</button>
      </li>
    );
  }

  return (
    <li className={`task-item status-${task.status.replace(' ', '').toLowerCase()}`}>
      <span className="task-title">{task.title}</span>
      <span className="task-meta">| {task.priority}{task.dueDate ? ` · Due: ${task.dueDate}` : ''}</span>
      <button className="btn btn-status" onClick={onStatusChange}>{task.status}</button>
      <button className="btn btn-edit" onClick={onEdit}>Edit</button>
      <button className="btn btn-delete" onClick={onDelete}>Delete</button>
    </li>
  );
}

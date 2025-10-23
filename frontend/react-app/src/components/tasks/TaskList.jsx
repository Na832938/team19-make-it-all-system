// TaskList.jsx
import TaskItem from './TaskItem.jsx';

export default function TaskList({ tasks, editingId, onEdit, onDelete, onSave, onCancel, onStatusChange }) {
  return (
    <ul className="task-list" aria-live="polite">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          isEditing={editingId === task.id}
          onEdit={() => onEdit(task.id)}
          onDelete={() => onDelete(task.id)}
          onSave={() => onSave(task.id)}
          onCancel={onCancel}
          onStatusChange={() => onStatusChange(task.id)}
        />
      ))}
    </ul>
  );
}

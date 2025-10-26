import TextInput from '../common/TextInput';
import Select from '../common/Select';
import Button from '../common/Button';
import './TaskItem.css';

export default function TaskItem({
  task,
  isEditing,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  onStatusChange,
}) {
  if (isEditing) {
    return (
      <li className={`task-item status-${task.status.replace(' ', '').toLowerCase()}`}>
        <TextInput
          type="text"
          defaultValue={task.title}
          className="input-title"
        />
        <Select
          className="select-priority"
          defaultValue={task.priority}
          options={[
            { value: 'Low', label: 'Low' },
            { value: 'Medium', label: 'Medium' },
            { value: 'High', label: 'High' },
          ]}
        />
        <TextInput
          type="date"
          defaultValue={task.dueDate || ''}
          className="input-due"
        />
        <Button type="primary" onClick={onSave}>
          Save
        </Button>
        <Button type="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </li>
    );
  }

  return (
    <li className={`task-item status-${task.status.replace(' ', '').toLowerCase()}`}>
      <span className="task-title">{task.title}</span>
      <span className="task-meta">
        | {task.priority}
        {task.dueDate ? ` · Due: ${task.dueDate}` : ''}
      </span>
      <Button type="secondary" onClick={onStatusChange}>
        {task.status}
      </Button>
      <Button type="primary" onClick={onEdit}>
        Edit
      </Button>
      <Button type="danger" onClick={onDelete}>
        Delete
      </Button>
    </li>
  );
}

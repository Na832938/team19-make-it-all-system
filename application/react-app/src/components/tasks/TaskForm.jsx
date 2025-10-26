import TextInput from '../common/TextInput';
import Select from '../common/Select';
import Button from '../common/Button';
import Label from '../common/Label';
import './TaskForm.css';

export default function TaskForm({ onAdd }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.taskName.value.trim();
    const priority = form.priority.value;
    const dueDate = form.dueDate.value || null;
    if (!name) return;
    onAdd({ title: name, priority, dueDate });
    form.reset();
  };

  return (
      <form className="task-form" onSubmit={handleSubmit} autoComplete="off">
        <Label text="Task name:">
          <TextInput name="taskName" type="text" placeholder="Task name" required />
        </Label>

        <Label text="Priority:">
          <Select
            name="priority"
            defaultValue="Medium"
            options={[
              { value: 'Low', label: 'Low' },
              { value: 'Medium', label: 'Medium' },
              { value: 'High', label: 'High' },
            ]}
          />
        </Label>

        <Label text="Due date:">
          <TextInput name="dueDate" type="date" />
        </Label>

        <Button type="primary">Add Task</Button>
      </form>
  );
}

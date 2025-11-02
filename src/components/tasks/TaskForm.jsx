import { useState } from 'react';
import Form from '../common/Form';
import TextInput from '../common/TextInput';
import Select from '../common/Select';
import Label from '../common/Label';

export default function TaskForm({ 
  onSubmit, 
  onCancel,
  submitText = "Add Task",
  cancelText = "Clear"
}) {
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0];
  const [dueDate, setDueDate] = useState(formattedToday);

  const sharedClass = 'bg-surface text-textPrimary border border-borderColor rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-60 disabled:cursor-not-allowed';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!taskName.trim()) {
      setMessage("Task name is required");
      setLoading(false);
      return;
    }

    try {
      const taskData = {
        title: taskName.trim(),
        priority,
        dueDate: dueDate || null,
        status: 'To Do'
      };

      await onSubmit(taskData);
      
      setTaskName('');
      setPriority('Medium');
      setDueDate('');
      setMessage("Task added successfully!");
      
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTaskName('');
    setPriority('Medium');
    setDueDate('');
    setMessage('');
    if (onCancel) onCancel();
  };

  const successClass = 'bg-green-100 text-green-800 border border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700';
  const errorClass = 'bg-red-100 text-red-800 border border-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-700';

  return (
    <Form 
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      submitText={submitText}
      cancelText={cancelText}
      loading={loading}
    >
      <Label text="Task name:" required>
        <TextInput 
          type="text" 
          placeholder="Enter task name" 
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className={`${sharedClass} dark:bg-surface-dark dark:text-textPrimary-dark dark:border-borderColor-dark`}
          required 
        />
      </Label>

      <Label text="Priority:">
        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          options={[
            { value: 'Low', label: 'Low' },
            { value: 'Medium', label: 'Medium' },
            { value: 'High', label: 'High' },
          ]}
          className={`${sharedClass} dark:bg-surface-dark dark:text-textPrimary-dark dark:border-borderColor-dark`}
        />
      </Label>

      <Label text="Due date:">
        <TextInput 
          type="date" 
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={`${sharedClass} dark:bg-surface-dark dark:text-textPrimary-dark dark:border-borderColor-dark`}
        />
      </Label>

      {message && (
        <div className={`p-3 rounded-md ${message.includes("success") ? successClass : errorClass}`}>
          {message}
        </div>
      )}
    </Form>
  );
}

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
      
      // Reset form on success
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
        />
      </Label>

          
      <Label text="Due date:">
        
        <TextInput 
          type="date" 
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </Label>

      {message && (
        <div className={`p-3 rounded-md ${
          message.includes("success") 
            ? "bg-green-100 text-green-800 border border-green-200" 
            : "bg-red-100 text-red-800 border border-red-200"
        }`}>
          {message}
        </div>
      )}
    </Form>
  );
}
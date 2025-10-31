import { useState } from 'react';
import Form from '../common/Form';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import Label from '../common/Label';

export default function TopicForm({ 
  onSubmit, 
  onCancel,
  submitText = "Create Topic",
  cancelText = "Clear"
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!title.trim()) {
      setMessage("Topic title is required");
      setLoading(false);
      return;
    }
    
    if (!description.trim()) {
      setMessage("Topic description is required");
      setLoading(false);
      return;
    }

    try {
      const topicData = {
        title: title.trim(),
        description: description.trim(),
      };

      await onSubmit(topicData);
      
      // Reset form on success
      setTitle('');
      setDescription('');
      setMessage("Topic created successfully!");
      
      setTimeout(() => setMessage(""), 1500);
    } catch (error) {
      setMessage("Failed to create topic");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
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
      <Label text="Topic title:" required>
        <TextInput
          type="text"
          placeholder="Enter topic title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Label>

      <Label text="Topic description:" required>
        <TextArea
          placeholder="Enter topic description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          required
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
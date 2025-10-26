import { useState } from 'react';
import TextInput from '../common/TextInput';
import Button from '../common/Button';
import Label from '../common/Label';
import TextArea from '../common/TextArea';
import './TopicForm.css';

export default function TopicForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setMessage('All fields are required.');
      return;
    }

    const newTopic = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
    };

    onCreate(newTopic);
    setTitle('');
    setDescription('');
    setMessage('Topic created successfully!');
    setTimeout(() => setMessage(''), 1500);
  };

  return (
    <form className="topic-form" onSubmit={handleSubmit} autoComplete="off">
      <Label text="Topic Title:">
        <TextInput
          type="text"
          placeholder="Enter topic title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Label>

      <Label text="Topic Description:">
        <TextArea
          placeholder="Enter topic description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
        />
      </Label>

      <Button type="primary">Create Topic</Button>

      {message && <p className="form-message">{message}</p>}
    </form>
  );
}

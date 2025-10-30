import { useState } from 'react';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import Button from '../common/Button';
import Label from '../common/Label';

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

    onCreate({
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
    });

    setTitle('');
    setDescription('');
    setMessage('Topic created successfully!');
    setTimeout(() => setMessage(''), 1500);
  };

  return (
    <form className="card-vertical" onSubmit={handleSubmit} autoComplete="off">
      <Label text="Topic title:">
        <TextInput
          name="topicTitle"
          type="text"
          placeholder="Enter topic title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Label>

      <Label text="Topic description:">
        <TextArea
          name="topicDescription"
          placeholder="Enter topic description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          required
        />
      </Label>

      <Button type="primary">Create Topic</Button>

      {message && <p className="form-message">{message}</p>}
    </form>
  );
}

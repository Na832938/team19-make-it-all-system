import { useState } from "react";
import "./TopicForm.css";

export default function TopicForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setMessage("All fields are required.");
      return;
    }

    const newTopic = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
    };

    onCreate(newTopic);
    setTitle("");
    setDescription("");
    setMessage("Topic created successfully!");
    setTimeout(() => setMessage(""), 1500);
  };

  return (
    <form className="topic-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Topic Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Topic Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Create Topic</button>
      {message && <p className="form-message">{message}</p>}
    </form>
  );
}

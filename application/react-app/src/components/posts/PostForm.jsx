// src/components/posts/PostForm.jsx
import { useState } from "react";
import { TextInput, TextArea, Button } from "../common";
import './PostForm.css';

export default function PostForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onCreate({ title: title.trim(), content: content.trim(), id: Date.now() });
    setTitle("");
    setContent("");
  };

  return (
    <form className="post-form" onSubmit={handleSubmit} autoComplete="off">
      <TextInput
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextArea
        rows={4}
        placeholder="Post Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <Button type="submit">
        Create Post
      </Button>
    </form>
  );
}

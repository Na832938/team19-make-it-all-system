import { useState } from "react";

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
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
      />
      <textarea
        placeholder="Post Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
      />
      <button type="submit" style={{ padding: "0.5rem 1rem" }}>Create Post</button>
    </form>
  );
}

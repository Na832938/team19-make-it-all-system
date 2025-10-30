import { useState } from "react";
import TextInput from "../common/TextInput";
import TextArea from "../common/TextArea";
import Button from "../common/Button";
import Label from "../common/Label";

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
    <form className="card-vertical" onSubmit={handleSubmit} autoComplete="off">
      <Label text="Post Title:">
        <TextInput
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Label>

      <Label text="Content:">
        <TextArea
          rows={5}
          placeholder="Write your content here"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </Label>

      <Button type="primary">Create Post</Button>
    </form>
  );
}

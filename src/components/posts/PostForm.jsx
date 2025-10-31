import { useState } from "react";
import Form from "../common/Form";
import TextInput from "../common/TextInput";
import TextArea from "../common/TextArea";
import Label from "../common/Label";

export default function PostForm({ 
  onSubmit, 
  onCancel,
  submitText = "Create Post",
  cancelText = "Clear"
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!title.trim()) {
      setMessage("Post title is required");
      setLoading(false);
      return;
    }
    
    if (!content.trim()) {
      setMessage("Post content is required");
      setLoading(false);
      return;
    }

    try {
      const newPost = {
        title: title.trim(),
        content: content.trim(),
        date: new Date().toISOString(),
        author: "Current User",
        comments: []
      };

      // Call the onSubmit prop with the post data
      await onSubmit(newPost);
      
      // Reset form on success
      setTitle("");
      setContent("");
      setMessage("Post created successfully!");
      
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setMessage("");
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
      <Label text="Post Title:" required>
        <TextInput
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Label>

      <Label text="Content:" required>
        <TextArea
          rows={5}
          placeholder="Write your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
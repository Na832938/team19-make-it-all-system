import { useState } from "react";
import PostForm from "./PostForm";
import PostList from "./PostList";

export default function PostPage() {
  const [posts, setPosts] = useState([]);

  const handleCreate = (newPost) => {
    setPosts([newPost, ...posts]); // newest on top
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h2>Topic Feed</h2>
      <PostForm onCreate={handleCreate} />
      <PostList posts={posts} />
    </div>
  );
}

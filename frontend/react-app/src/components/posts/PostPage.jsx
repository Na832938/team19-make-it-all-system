import { useState } from "react";
import PostForm from "./PostForm";
import PostList from "./PostList";
import './PostPage.css';

export default function PostPage() {
  const [posts, setPosts] = useState([]);

  const handleCreate = (newPost) => {
    setPosts([newPost, ...posts]); // newest on top
  };

  return (
    <div className="post-page">
      <h2>Topic Feed</h2>
      <PostForm onCreate={handleCreate} />
      <PostList posts={posts} />
    </div>
  );
}

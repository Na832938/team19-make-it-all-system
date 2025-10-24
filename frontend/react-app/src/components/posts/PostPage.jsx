import { useState } from "react";
import PostForm from "./PostForm";
import PostList from "./PostList";
import './PostPage.css';

export default function PostPage() {

  const [posts, setPosts] = useState([
    { id: 1, topic: "Software Development", title: "AGILE", content: "In our company we use the agile methodology to deliver great projects !" },
    { id: 2, topic: "Software Issues", title: "Update Issues", content: "I have been having issues lately after the new update on the HR software. Anyone having the same issue ?" },
    { id: 3, topic: "Printing", title: "PRINTING PAPER", content: "PLEASE REFILL PRINTER WHEN YOU USE THE LAST SHEETS OF PAPER !!!!" }
  ]);

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

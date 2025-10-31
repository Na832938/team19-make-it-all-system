import { useState } from "react";
import PostForm from "./PostForm";
import PostList from "./PostList";
import Card from "../common/Card";
import posts from "../../data/posts";

export default function PostPage() {

  const [postsState, setPosts] = useState(posts);

  const handleCreate = (newPost) => setPosts([newPost, ...posts]);

  return (
    <div className="vertical-center" style={{ gap: 'var(--space-lg)', width: '100%' }}>
      <div className="dashboard-grid" style={{ width: '100%' }}>

        <Card>
          <div>
            <h2>Create Post</h2>
            <PostForm onCreate={handleCreate} />
          </div>
        </Card>

        <Card className="full-width-card">
          <div>
            <h2>Post Feed</h2>
            <PostList posts={posts} />
          </div>
        </Card>

      </div>
    </div>
  );
}

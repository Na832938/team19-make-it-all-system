import { useState } from "react";
import PostForm from "./PostForm";
import Card from "../common/Card";
import posts from "../../data/posts";
import DataList from "../common/DataList";

export default function PostPage() {
  const [postsState, setPosts] = useState(posts);

  const handleCreatePost = async (postData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPost = {
          ...postData,
          id: Date.now().toString(),
        };
        setPosts((prev) => [newPost, ...prev]);
        resolve(newPost);
      }, 500);
    });
  };

  const handleView = (post) => console.log("View post:", post);
  const handleEdit = (post) => console.log("Edit post:", post);
  const handleDelete = (post) => {
    if (window.confirm(`Are you sure you want to delete "${post.title}"?`)) {
      setPosts(postsState.filter((p) => p.id !== post.id));
    }
  };

  const sharedCardClass =
    "bg-[var(--surface-colour)] dark:bg-[var(--surface-colour)] border border-[var(--border-neutral)] dark:border-[var(--border-neutral)] rounded-md shadow-sm dark:shadow-sm p-6";

  return (
    <div className="min-h-screen bg-[var(--surface-colour)] dark:bg-[var(--surface-colour)] py-6">
      <div className="max-w-8xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] dark:text-[var(--text-primary)]">
            Posts
          </h1>
          <p className="text-[var(--text-secondary)] dark:text-[var(--text-secondary)] mt-2">
            Share updates and engage with your team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Form Column */}
          <div className="md:col-span-1">
            <Card className={sharedCardClass}>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[var(--text-primary)] dark:text-[var(--text-primary)]">
                  Create New Post
                </h2>
                <PostForm onSubmit={handleCreatePost} />
              </div>
            </Card>
          </div>

          {/* Data List Column */}
          <div className="md:col-span-2">
            <DataList
              type="post"
              items={postsState}
              title="Posts"
              onAction={(action, post) => {
                if (action === "view") handleView(post);
                if (action === "edit") handleEdit(post);
                if (action === "delete") handleDelete(post);
              }}
              variant="default"
              className="bg-[var(--surface-colour)] dark:bg-[var(--surface-colour)] text-[var(--text-primary)] dark:text-[var(--text-primary)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

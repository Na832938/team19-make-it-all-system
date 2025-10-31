import { useState } from "react";
import PostForm from "./PostForm";
import PostList from "./PostList";
import Card from "../common/Card";
import posts from "../../data/posts";

export default function PostPage() {
  const [postsState, setPosts] = useState(posts);

  const handleCreatePost = async (postData) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPost = {
          ...postData,
          id: Date.now().toString()
        };
        setPosts(prev => [newPost, ...prev]);
        resolve(newPost);
      }, 500);
    });
  };

  const handleView = (post) => {
    console.log('View post:', post);
  };

  const handleEdit = (post) => {
    console.log('Edit post:', post);
  };

  const handleDelete = (post) => {
    if (window.confirm(`Are you sure you want to delete "${post.title}"?`)) {
      setPosts(postsState.filter(p => p.id !== post.id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Posts</h1>
          <p className="text-gray-600 mt-2">Share updates and engage with your team</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="p-6 h-fit md:sticky md:top-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Create New Post</h2>
                <PostForm onSubmit={handleCreatePost} />
              </div>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card variant="flat" className="p-0">
              <PostList 
                posts={postsState}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
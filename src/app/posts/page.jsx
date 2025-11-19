'use client';

import PostPage from '../../components/posts/PostPage.jsx';
import ProtectedRoute from '../../components/ProtectedRoute.js';

export default function PostsPage() {
  return (
    <ProtectedRoute>
      <PostPage />
    </ProtectedRoute>
  );
}

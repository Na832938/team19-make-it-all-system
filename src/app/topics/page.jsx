'use client';

import TopicPage from '../../components/topics/TopicPage.jsx';
import ProtectedRoute from '../../components/ProtectedRoute.js';

export default function TopicsPage() {
  return (
    <ProtectedRoute>
      <TopicPage />
    </ProtectedRoute>
  );
}

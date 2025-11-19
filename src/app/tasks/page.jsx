'use client';

import TodoPage from '../../components/tasks/TodoPage.jsx';
import ProtectedRoute from '../../components/ProtectedRoute.js';

export default function TasksPage() {
  return (
    <ProtectedRoute>
      <TodoPage />
    </ProtectedRoute>
  );
}

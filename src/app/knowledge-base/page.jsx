'use client';

import KnowledgeBase from '../../components/knowledge-base/KnowledgeBase.jsx';
import ProtectedRoute from '../../components/ProtectedRoute.js';

export default function KnowledgeBasePage() {
  return (
    <ProtectedRoute>
      <KnowledgeBase />
    </ProtectedRoute>
  );
}

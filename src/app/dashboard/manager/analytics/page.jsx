'use client';

import GraphDisplay from '../../../../components/dashboard/GraphDisplay.jsx';
import ProtectedRoute from '../../../../components/ProtectedRoute.js';

/**
 * Manager Analytics Page
 * 
 * Route: /dashboard/manager/analytics
 * Displays performance analytics and graphs for managers
 */
export default function ManagerAnalyticsPage() {
  return (
    <ProtectedRoute>
      <GraphDisplay />
    </ProtectedRoute>
  );
}

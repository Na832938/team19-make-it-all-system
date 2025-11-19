'use client';

import ManagerDashboard from '../../../components/dashboard/ManagerDashboard.jsx';
import ProtectedRoute from '../../../components/ProtectedRoute.js';

export default function ManagerDashboardPage() {
  return (
    <ProtectedRoute>
      <ManagerDashboard />
    </ProtectedRoute>
  );
}

'use client';

import EmployeeDashboard from '../../../components/dashboard/EmployeeDashboard.jsx';
import ProtectedRoute from '../../../components/ProtectedRoute.js';

export default function EmployeeDashboardPage() {
  return (
    <ProtectedRoute>
      <EmployeeDashboard />
    </ProtectedRoute>
  );
}

'use client';

import EmployeeDashboard from '../../../components/dashboard/EmployeeDashboard.jsx';
import ProtectedRoute from '../../../components/ProtectedRoute.js';

/**
 * Employee Dashboard Main Page
 * 
 * Route: /dashboard/employee
 * Displays main employee dashboard with overview stats
 */
export default function EmployeeDashboardPage() {
  return (
    <ProtectedRoute>
      <EmployeeDashboard />
    </ProtectedRoute>
  );
}

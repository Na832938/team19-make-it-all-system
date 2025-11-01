// src/App.js
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./lib/AuthContext";
import LoginPage from "./components/authentication/LoginPage.jsx";
import RegisterPage from "./components/authentication/RegisterPage.jsx";
import EmployeeDashboard from "./components/dashboard/EmployeeDashboard.jsx";
import ManagerDashboard from "./components/dashboard/ManagerDashboard.jsx";

// Protected Route component
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Employee Dashboard - only for employees */}
        <Route 
          path="/app" 
          element={
            <ProtectedRoute>
              {user?.role === 'Employee' ? (
                <EmployeeDashboard />
              ) : (
                <Navigate to="/manager" replace />
              )}
            </ProtectedRoute>
          } 
        />
        
        {/* Manager Dashboard - only for managers */}
        <Route 
          path="/manager" 
          element={
            <ProtectedRoute>
              {user?.role === 'Manager' ? (
                <ManagerDashboard />
              ) : (
                <Navigate to="/app" replace />
              )}
            </ProtectedRoute>
          } 
        />
        
        {/* Redirect any unknown routes to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
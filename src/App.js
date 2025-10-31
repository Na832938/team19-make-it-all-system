import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/authentication/LoginPage.jsx";
import RegisterPage from "./components/authentication/RegisterPage.jsx";
import EmployeeDashboard from "./components/dashboard/EmployeeDashboard.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/app" element={<EmployeeDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
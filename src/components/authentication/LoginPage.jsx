// src/components/authentication/LoginPage.jsx
import { useState } from "react";
import { Button, TextInput, Card, Alert, Form } from '../common';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login(formData.username, formData.password);
      
      if (result.success) {
        const redirectPath = from || result.dashboardPath;
        navigate(redirectPath, { replace: true });
      }
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md p-6">

        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>
        
        <Form 
          onSubmit={handleSubmit}
          loading={loading}
          disabled={loading}
          layout="vertical"
          variant="comfortable"
          actions={false}
        >
          <TextInput
            name="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            disabled={loading}
            autoComplete="username"
          />
          
          <TextInput
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
            autoComplete="current-password"
          />
          
          <Button 
            type="primary" 
            size="medium"
            width="full"
            disabled={loading}
            buttonType="submit"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
          
          {error && (
            <Alert
              type="error"
              message={error}
              onClose={() => setError("")}
            />
          )}
        </Form>
        
        <div className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link 
            to="/register" 
            className="text-blue-600 hover:underline font-medium"
          >
            Register here
          </Link>
        </div>

        <div className="text-xs text-gray-500 text-center mt-4">
          <p>Demo credentials:</p>
          <p><strong>Managers:</strong></p>
          <p>bwayne / batman!</p>
          <p>dprince / wonder123</p>
          <p><strong>Employees:</strong></p>
          <p>jdoe / pass1234</p>
          <p>asmith / hello2025</p>
        </div>

      </Card>
    </div>
  );
}

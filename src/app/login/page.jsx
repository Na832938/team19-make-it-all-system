'use client';

import { useState, useEffect } from "react";
import { Button, TextInput, Card, Alert, Form } from '../../components/common';
import { useAuth } from '../../lib/AuthContext';
import { logger } from '../../lib/logger';

/**
 * LoginPage
 * 
 * Team 19 - Make It All System
 * 
 * Purpose: User login interface
 * Features:
 * - Username/password authentication
 * - Role-based dashboard routing (Manager vs Employee)
 * - Error handling and loading states
 * - Redirect from protected pages with 'from' parameter
 * 
 * @returns {JSX.Element} The login page component.
 */
export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const [from, setFrom] = useState("");

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const f = params.get("from");
      if (f) setFrom(f);
    } catch {}
  }, []);

  /**
   * Handles the form submission for logging in.
   * @param {React.FormEvent} e - The form event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    logger.action('Login attempt', { username: formData.username });

    try {
      const result = await login(formData.username, formData.password);
      
      if (result.success) {
        logger.info('Login successful', { username: formData.username });
        const redirectPath = from || result.dashboardPath;
        window.location.replace(redirectPath);
      }
    } catch (err) {
      logger.error("Login failed", { error: err.message });
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles changes to the form inputs.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface dark:bg-surface transition-colors p-4">
      <Card className="w-full max-w-md p-8 bg-surface dark:bg-surface border border-borderNeutral dark:border-borderNeutral transition-colors shadow-lg rounded-xl">

        <h2 className="text-3xl font-bold text-center mb-8 text-textPrimary dark:text-textPrimary">
          Welcome Back
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
            className="bg-surface dark:bg-surface border border-borderNeutral dark:border-borderNeutral text-textPrimary dark:text-textPrimary placeholder:text-textSecondary dark:placeholder:text-textSecondary focus:border-focus dark:focus:border-focus"
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
            className="bg-surface dark:bg-surface border border-borderNeutral dark:border-borderNeutral text-textPrimary dark:text-textPrimary placeholder:text-textSecondary dark:placeholder:text-textSecondary focus:border-focus dark:focus:border-focus"
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
        
        <div className="text-center text-sm text-textSecondary dark:text-textSecondary mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-primary hover:text-primaryHover font-medium">Register here</a>
        </div>

      </Card>
    </div>
  );
}

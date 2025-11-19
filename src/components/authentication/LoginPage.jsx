// src/components/authentication/LoginPage.jsx
import { useState, useEffect } from "react";
import { Button, TextInput, Card, Alert, Form } from '../common';
import { useAuth } from '../../lib/AuthContext';

/**
 * A page for users to log in.
 * @returns {JSX.Element} The login page component.
 */
export default function LoginPage() {
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
    console.log("Attempting to log in with username:", formData.username);

    try {
      const result = await login(formData.username, formData.password);
      
      if (result.success) {
        console.log("Login successful, redirecting...");
        const redirectPath = from || result.dashboardPath;
        window.location.replace(redirectPath);
      }
    } catch (err) {
      console.error("Login failed:", err.message);
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

        <div className="text-xs text-textSecondary dark:text-textSecondary text-center mt-4">
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

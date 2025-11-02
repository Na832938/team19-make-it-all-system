import { useState } from "react";
import { Button, TextInput, Card, Alert, Form } from '../common';
import { Link, useNavigate } from 'react-router-dom';
import users from '../../data/users.json';

function validatePassword(password) {
  const minLength = /.{8,}/;
  const hasUpper = /[A-Z]/;
  const hasSpecial = /[^A-Za-z0-9]/;
  return minLength.test(password) && hasUpper.test(password) && hasSpecial.test(password);
}

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = async () => {
    setLoading(true);
    setMessage("");
    setShowAlert(false);

    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const employee = users.find(u => u.username === username.trim());
      
      if (!employee) throw new Error("Username does not match any employee.");
      if (email.toLowerCase() !== employee.email.toLowerCase()) throw new Error("Email must match the employee's registered email.");
      if (!validatePassword(password)) throw new Error("Password must be 8+ chars, include 1 uppercase and 1 special char.");
      if (employee.password && employee.password !== "") throw new Error("This account is already registered.");

      setMessage(`Registration successful for ${employee.username}. You can now login.`);
      setShowAlert(true);

      setUsername("");
      setEmail("");
      setPassword("");

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setMessage(err.message);
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
  };

  const handleChange = (field, value) => {
    if (showAlert) {
      setShowAlert(false);
      setMessage("");
    }
    switch (field) {
      case 'username': setUsername(value); break;
      case 'email': setEmail(value); break;
      case 'password': setPassword(value); break;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface dark:bg-surface transition-colors p-4">
      <Card className="w-full max-w-md p-6 bg-surface dark:bg-surface border border-borderNeutral dark:border-borderNeutral transition-colors">

        <h2 className="text-2xl font-bold text-center mb-6 text-textPrimary dark:text-textPrimary">
          Register Account
        </h2>
        
        <Form
          onSubmit={handleSubmit}
          loading={loading}
          disabled={loading}
          layout="vertical"
          spacing="normal"
          actions={false}
          className="space-y-4"
        >
          <TextInput
            type="text"
            placeholder="Username (must match employee)"
            value={username}
            onChange={e => handleChange('username', e.target.value)}
            required
            disabled={loading}
            className="bg-surface dark:bg-surface border border-borderNeutral dark:border-borderNeutral text-textPrimary dark:text-textPrimary placeholder:text-textSecondary dark:placeholder:text-textSecondary focus:border-focus dark:focus:border-focus"
          />

          <TextInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => handleChange('email', e.target.value)}
            required
            disabled={loading}
            className="bg-surface dark:bg-surface border border-borderNeutral dark:border-borderNeutral text-textPrimary dark:text-textPrimary placeholder:text-textSecondary dark:placeholder:text-textSecondary focus:border-focus dark:focus:border-focus"
          />

          <TextInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => handleChange('password', e.target.value)}
            required
            disabled={loading}
            className="bg-surface dark:bg-surface border border-borderNeutral dark:border-borderNeutral text-textPrimary dark:text-textPrimary placeholder:text-textSecondary dark:placeholder:text-textSecondary focus:border-focus dark:focus:border-focus"
          />

          <div className="text-xs text-textSecondary dark:text-textSecondary bg-surface dark:bg-surface p-3 rounded border border-borderNeutral dark:border-borderNeutral">
            <p className="font-semibold mb-1">Password Requirements:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>At least 8 characters</li>
              <li>One uppercase letter (A-Z)</li>
              <li>One special character (!@#$% etc.)</li>
            </ul>
          </div>

          <Button
            type="primary"
            size="medium"
            width="full"
            disabled={loading}
            buttonType="submit"
          >
            {loading ? "Registering..." : "Register"}
          </Button>

          {showAlert && (
            <Alert
              type={message.includes("successful") ? "success" : "error"}
              message={message}
              onClose={() => setShowAlert(false)}
            />
          )}
        </Form>

        <div className="text-center text-sm text-textSecondary dark:text-textSecondary mt-4">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-primary hover:text-primaryHover font-medium"
          >
            Login here
          </Link>
        </div>

        <div className="text-xs text-textSecondary dark:text-textSecondary text-center mt-4">
          <p className="font-semibold">Available Employees for Registration:</p>
          <p>jdoe - jdoe@company.com</p>
          <p>asmith - asmith@company.com</p>
          <p>ckent - ckent@company.com</p>
          <p>pparker - pparker@company.com</p>
          <p>sbarnes - sbarnes@company.com</p>
        </div>

      </Card>
    </div>
  );
}

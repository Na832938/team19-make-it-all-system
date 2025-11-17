import { useState, useEffect } from "react";
import { Button, TextInput, Card, Alert, Form } from '../common';
import { Link, useNavigate } from 'react-router-dom';
import usersData from '../../data/users.json';

/**
 * Validates a password based on a set of rules.
 * @param {string} password - The password to validate.
 * @returns {boolean} - Whether the password is valid.
 */
function validatePassword(password) {
  const minLength = /.{8,}/;
  const hasUpper = /[A-Z]/;
  const hasSpecial = /[^A-Za-z0-9]/;
  return minLength.test(password) && hasUpper.test(password) && hasSpecial.test(password);
}

/**
 * A page for users to register a new account.
 * @returns {JSX.Element} The register page component.
 */
export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("registeredUsers"));
    if (stored && Array.isArray(stored)) setUsers(stored);
    else setUsers(usersData);
  }, []);

  const persistUsers = (updated) => {
    setUsers(updated);
    localStorage.setItem("registeredUsers", JSON.stringify(updated));
  };

  /**
   * Handles the user registration process.
   */
  const register = async () => {
    setLoading(true);
    setMessage("");
    setShowAlert(false);
    console.log("Attempting to register user:", username);

    await new Promise(resolve => setTimeout(resolve, 1000)); // fake delay kept

    try {
      const employee = users.find(u => u.username.trim().toLowerCase() === username.trim().toLowerCase());
      if (!employee) throw new Error("Username does not match any employee.");
      if (email.toLowerCase() !== employee.email.toLowerCase())
        throw new Error("Email must match the employee's registered email.");
      if (!validatePassword(password))
        throw new Error("Password must be 8+ chars, include 1 uppercase and 1 special char.");
      if (employee.registered)
        throw new Error("This account is already registered.");

      const updatedUsers = users.map(u =>
        u.username === employee.username
          ? { ...u, registered: true, password }
          : u
      );

      persistUsers(updatedUsers);
      console.log("Registration successful for user:", username);
      setMessage(`Registration successful for ${employee.username}. You can now login.`);
      setShowAlert(true);

      setUsername("");
      setEmail("");
      setPassword("");

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error("Registration failed:", err.message);
      setMessage(err.message);
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles the form submission for registration.
   * @param {React.FormEvent} e - The form event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    register();
  };

  /**
   * Handles changes to the form inputs.
   * @param {string} field - The name of the field being changed.
   * @param {string} value - The new value of the field.
   */
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
          {users.map(u => (
            <p key={u.username}>
              {u.username} - {u.email}
            </p>
          ))}
        </div>

      </Card>
    </div>
  );
}

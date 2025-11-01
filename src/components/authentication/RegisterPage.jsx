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
      const employee = users.find(user => user.username === username.trim());
      
      if (!employee) {
        throw new Error("Username does not match any employee.");
      }

      if (email.toLowerCase() !== employee.email.toLowerCase()) {
        throw new Error("Email must match the employee's registered email.");
      }

      if (!validatePassword(password)) {
        throw new Error("Password must be 8+ characters, include 1 capital letter and 1 special character.");
      }

      if (employee.password && employee.password !== "") {
        throw new Error("This account is already registered.");
      }

      setMessage(`Registration successful for ${employee.username}. You can now login.`);
      setShowAlert(true);
      
      setUsername("");
      setEmail("");
      setPassword("");
      
      setTimeout(() => {
        navigate("/");
      }, 2000);

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
    switch (field) {
      case 'username':
        setUsername(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
    }
    if (showAlert) {
      setShowAlert(false);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Register Account</h2>
        
        <Form 
          onSubmit={handleSubmit}
          loading={loading}
          disabled={loading}
          layout="vertical"
          spacing="normal"
          actions={false} // Set to false to disable automatic button
          className="space-y-4"
        >
          <TextInput 
            type="text" 
            placeholder="Username (must match employee)" 
            value={username} 
            onChange={e => handleChange('username', e.target.value)}
            required
            disabled={loading}
          />
          
          <TextInput 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={e => handleChange('email', e.target.value)}
            required
            disabled={loading}
          />
          
          <TextInput 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={e => handleChange('password', e.target.value)}
            required
            disabled={loading}
          />

          <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
            <p className="font-semibold mb-1">Password Requirements:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>At least 8 characters</li>
              <li>One uppercase letter (A-Z)</li>
              <li>One special character (!@#$% etc.)</li>
            </ul>
          </div>
          
          {/* Add the Button back manually */}
          <Button 
            type="primary" 
            className="w-full"
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
        
        <div className="text-center text-sm text-gray-600 mt-4">
          Already have an account? <Link to="/" className="text-blue-600 hover:underline font-medium">Login here</Link>
        </div>

        <div className="text-xs text-gray-500 text-center mt-4">
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
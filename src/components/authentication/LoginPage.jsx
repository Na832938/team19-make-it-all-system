import { useState } from "react";
import { Button, TextInput, Card, Alert } from '../common';
import { Link, useNavigate } from 'react-router-dom';
import users from '../../data/users.json';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const login = () => {
    const foundUser = users.find(
      user => user.username === username.trim() && user.password === password
    );
    
    if (foundUser) {
      setMessage(`Login successful! Welcome ${foundUser.role} ${foundUser.username}.`);
      setShowAlert(true);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      navigate("/app");
    } else {
      setMessage("Invalid username or password.");
      setShowAlert(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>
        
        {/* Remove space-y-4 and let the block elements stack naturally */}
        <div>
          <TextInput
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          
          <TextInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          
          <Button 
            type="primary" 
            onClick={login}
          >
            Login
          </Button>
          
          <div className="text-center text-sm text-gray-600 mt-4">
            Don't have an account? 
            <Link 
              to="/register" 
              className="text-blue-600 hover:underline"
            >
              Register here
            </Link>
          </div>
          
          {showAlert && (
            <Alert
              type={message.includes("successful") ? "success" : "error"}
              message={message}
              onClose={() => setShowAlert(false)}
            />
          )}
        </div>
      </Card>
    </div>
  );
}
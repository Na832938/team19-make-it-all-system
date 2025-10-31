import { useState } from "react";
import { Button, TextInput, Card } from '../common';
import { Link, useNavigate } from 'react-router-dom';
import users from '../../data/users.json';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [msgColor, setMsgColor] = useState("black");
  const navigate = useNavigate();

  const login = () => {
    const foundUser = users.find(
      user => user.username === username.trim() && user.password === password
    );
    if (foundUser) {
      setMsgColor("green");
      setMessage(`Login successful! Welcome ${foundUser.role} ${foundUser.username}.`);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      navigate("/app"); }
    else {
      setMsgColor("red");
      setMessage("Invalid username or password.");
    }
  };

  return (
    <div className="vertical-center">
      <Card vertical>
          <h2>Login</h2>
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
          <Button type="primary" onClick={login}>Login</Button>
          <div className="auth-link">
            Don’t have an account? <Link to="/register">Register here</Link>
          </div>
          {message && <div className="auth-message" style={{ color: msgColor }}>{message}</div>}
        </Card>

    </div>
  );
}

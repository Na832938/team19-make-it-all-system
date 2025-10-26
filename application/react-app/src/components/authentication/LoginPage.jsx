import { useState } from "react";
import './LoginPage.css';
import { Button, TextInput } from '../common';
import { Link } from 'react-router-dom';

const users = [
  { username: "jdoe", password: "pass1234", role: "Employee", email: "jdoe@company.com" },
  { username: "asmith", password: "hello2025", role: "Employee", email: "asmith@company.com" },
  { username: "bwayne", password: "batman!", role: "Manager", email: "bwayne@company.com" },
  { username: "ckent", password: "superman!", role: "Employee", email: "ckent@company.com" },
  { username: "dprince", password: "wonder123", role: "Manager", email: "dprince@company.com" },
  { username: "tstark", password: "ironman", role: "Manager", email: "tstark@company.com" },
  { username: "pparker", password: "spidey", role: "Employee", email: "pparker@company.com" },
  { username: "nhill", password: "shield", role: "Manager", email: "nhill@company.com" },
  { username: "sbarnes", password: "winter", role: "Employee", email: "sbarnes@company.com" },
  { username: "rrichards", password: "fantastic", role: "Manager", email: "rrichards@company.com" }
];

export default function LoginPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [msgColor, setMsgColor] = useState("black");

  const login = () => {
    const foundUser = users.find(
      user => user.username === username.trim() && user.password === password
    );
    if (foundUser) {
      setMsgColor("green");
      setMessage(`Login successful! Welcome ${foundUser.role} ${foundUser.username}.`);
    } else {
      setMsgColor("red");
      setMessage("Invalid username or password.");
    }
  };

   return (
    
      <div className="vertical-center">
        <div className="card-container card-vertical">
        <h2> Login </h2>

        <TextInput type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <TextInput type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button type="primary" onClick={login}>Login</Button>
        <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          Don't have an account? <Link to="/register">Register here</Link>
        </div>

        <div className="" style={{ color: msgColor }}>{message}</div>
      </div>
    </div>

  );
}

import { useState } from "react";
import './RegisterPage.css';
import { Button, TextInput, Card} from '../common';

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
  const [msgClass, setMsgClass] = useState("");

  const register = () => {
    const employee = users.find(user => user.username === username.trim());
    if (!employee) {
      setMsgClass("message-error");
      setMessage("Username does not match any employee.");
      return;
    }

    if (email.toLowerCase() !== employee.email.toLowerCase()) {
      setMsgClass("message-error");
      setMessage("Email must match the employee's registered email.");
      return;
    }

    if (!validatePassword(password)) {
      setMsgClass("message-error");
      setMessage("Password must be 8+ chars, include 1 capital and 1 special character.");
      return;
    }

    if (employee.password && employee.password !== "") {
      setMsgClass("message-error");
      setMessage("This account is already registered.");
      return;
    }

    employee.password = password;
    setMsgClass("message-success");
    setMessage(`Registration successful for ${employee.username}.`);
  };

  return (
    <div className="vertical-center">
      <Card vertical={true} useContainer={false}>
        <h2>Register Account</h2>
        <TextInput type="text" placeholder="Username (must match employee)" value={username} onChange={e => setUsername(e.target.value)} />
        <TextInput type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <TextInput type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button type="primary" onClick={register}>Register</Button>
        {message && <div className={msgClass}>{message}</div>}
      </Card>
    </div>
  );
}

import { useState } from "react";

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
  const [msgColor, setMsgColor] = useState("black");

  const register = () => {
    const employee = users.find(user => user.username === username.trim());
    if (!employee) {
      setMsgColor("red");
      setMessage("Username does not match any employee.");
      return;
    }

    if (email.toLowerCase() !== employee.email.toLowerCase()) {
      setMsgColor("red");
      setMessage("Email must match the employee's registered email.");
      return;
    }

    if (!validatePassword(password)) {
      setMsgColor("red");
      setMessage("Password must be 8+ chars, include 1 capital and 1 special character.");
      return;
    }

    if (employee.password && employee.password !== "") {
      setMsgColor("red");
      setMessage("This account is already registered.");
      return;
    }

    employee.password = password;
    setMsgColor("green");
    setMessage(`Registration successful for ${employee.username}.`);
  };

  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      background: "#f0f2f5",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        background: "white",
        padding: "2rem",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        width: "300px",
        textAlign: "center"
      }}>
        <h2>Register Account</h2>
        <input
          type="text"
          placeholder="Username (must match employee)"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", margin: "0.5rem 0", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", margin: "0.5rem 0", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", margin: "0.5rem 0", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button
          onClick={register}
          style={{ width: "100%", padding: "0.5rem", background: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          Register
        </button>
        {message && (
          <div style={{ marginTop: "1rem", fontSize: "0.9rem", color: msgColor }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

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
    <div style={{ background: "#f0f2f5", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ background: "white", padding: "2rem", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", width: "300px", textAlign: "center" }}>
        <h2>Employee Login</h2>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} style={{ width: "100%", padding: "0.5rem", margin: "0.5rem 0", borderRadius: "5px", border: "1px solid #ccc" }} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: "100%", padding: "0.5rem", margin: "0.5rem 0", borderRadius: "5px", border: "1px solid #ccc" }} />
        <button onClick={login} style={{ width: "100%", padding: "0.5rem", background: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Login</button>
        <div style={{ marginTop: "1rem", fontSize: "0.9rem", color: msgColor }}>{message}</div>
      </div>
    </div>
  );
}

// Navbar.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown, Button } from "../common";
import "./Navbar.css";

export default function Navbar({ user }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="app-header">
      <div className="app-header-logo">
        <h1>Make it all</h1>
      </div>

      <nav className="app-header-navigation">
        {/* navigation links */}
      </nav>

      <div className="app-header-actions">
        <Button type="primary" className="user-profile" onClick={() => setOpen(!open)}>
          <span>{user.name}</span>
          <span>
            <img src="/avatar-placeholder.png" alt="avatar" />
          </span>
        </Button>

        <Dropdown isOpen={open}>
          <div className="dropdown-user-info">
            <img src="/avatar-placeholder.png" alt="avatar" />
            <span>{user.name}</span>
          </div>
          <Button onClick={handleLogout}>Logout</Button>
        </Dropdown>
      </div>
    </header>
  );
}

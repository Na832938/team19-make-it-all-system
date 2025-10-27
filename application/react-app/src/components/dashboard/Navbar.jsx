import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "../common";
import "./Navbar.css";

export default function Navbar({ user }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth (localStorage/session/etc.)
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="app-header">
      <div className="app-header-logo">
        <h1>Make it all</h1>
      </div>
      <div className="app-header-navigation">
     

      </div>
      <div className="app-header-actions">
        <button
          className="user-profile"
          onClick={() => setOpen(!open)}
        >
          <span>{user.name}</span>
          <span>
            <img src="/avatar-placeholder.png" alt="avatar" />
          </span>
        </button>
          <Dropdown isOpen={open}>
            <button onClick={handleLogout}>Logout</button>
          </Dropdown>
      </div>
    </header>
  );
}

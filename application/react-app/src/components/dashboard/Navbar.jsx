import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button.jsx";

export default function Navbar({ user }) {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="
      sticky top-0 left-0 w-full
      flex justify-between items-center
      p-md lg:plg
      bg-surface border-b border-border-neutral
      shadow-sm
      flex-wrap gap-sm
      z-50
      lg:flex-nowrap
    ">
      {/* Left section: logo + menu toggle */}
      <div className="flex items-center gap-md flex-shrink-0">
        <div className="app-header-logo">
          <h1 className="text-heading-md text-text-primary m-0 whitespace-nowrap sm:text-heading-md-sm">
            Make it all
          </h1>
        </div>
        
        {/* Hamburger menu for mobile */}
        <Button 
          type="secondary"
          className="
            lg:hidden
            sm:text-xl p-2
          "
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </Button>
      </div>

      {/* Navigation links */}
      <nav className={`
        flex items-center justify-center flex-1
        transition-all duration-300 ease-in-out
        lg:flex lg:max-h-none lg:opacity-100
        ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 lg:max-h-none lg:opacity-100'}
        w-full lg:w-auto
        flex-col lg:flex-row
        overflow-hidden
      `}>
        <a href="/dashboard" className="
          mx-md lg:mx-sm
          no-underline text-text-primary font-medium
          whitespace-nowrap
          hover:text-primary-hover
          py-sm lg:py-0 w-full lg:w-auto
          border-b border-border-neutral lg:border-none
          lg:text-left text-left
        ">
          Dashboard
        </a>
        <a href="/projects" className="
          mx-md lg:mx-sm
          no-underline text-text-primary font-medium
          whitespace-nowrap
          hover:text-primary-hover
          py-sm lg:py-0 w-full lg:w-auto
          border-b border-border-neutral lg:border-none
          lg:text-left text-left
        ">
          Projects
        </a>
        <a href="/tasks" className="
          mx-md lg:mx-sm
          no-underline text-text-primary font-medium
          whitespace-nowrap
          hover:text-primary-hover
          py-sm lg:py-0 w-full lg:w-auto
          border-b border-border-neutral lg:border-none
          lg:text-left text-left
        ">
          Tasks
        </a>
      </nav>

      {/* User actions */}
      <div className="flex items-center relative z-10 gap-sm flex-shrink-0 lg:w-auto w-full justify-between lg:justify-start">
        <Button 
          type="secondary"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-xs"
        >
          <span className="text-text-primary">{user.username}</span>
          <img 
            src="/avatar-placeholder.png" 
            alt="avatar" 
            className="w-8 h-8 rounded-lg object-cover sm:w-7 sm:h-7"
          />
        </Button>

        {/* Dropdown */}
        {open && (
          <div className="
            absolute top-full right-0 mt-1
            flex flex-col
            bg-surface border border-border-neutral rounded-md shadow-md
            p-md min-w-48 z-20
            font-ubuntu text-body
          ">
            <div className="flex flex-col items-start gap-xs p-sm text-text-primary whitespace-nowrap">
              <img 
                src="/avatar-placeholder.png" 
                alt="avatar" 
                className="w-12 h-12 rounded-lg mb-xs"
              />
              <span className="font-medium">{user.username}</span>
              <span className="text-text-secondary text-sm">{user.role}</span>
              <span className="text-text-secondary text-sm">{user.email}</span>
            </div>
            <Button 
              onClick={handleLogout}
              type="primary"
              className="mt-2"
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
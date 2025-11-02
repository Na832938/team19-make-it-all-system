import { useState, useEffect } from "react";
import Button from "../common/Button.jsx";
import useLogout from "../scripts/login.jsx";
import logo from "../../assets/logo.png";

export default function Navbar({ user, onMobileMenuToggle }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const [open, setOpen] = useState(false);
  const handleLogout = useLogout();

  return (
    <header className="sticky top-0 left-0 w-full bg-[var(--surface-colour)] border-b border-[var(--border-neutral)] shadow-lg z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center px-6 py-3">
          <div className="flex items-center gap-4">
            <Button
              onClick={onMobileMenuToggle}
              size="small"
              width="default"
              className="lg:hidden p-2 rounded-lg hover:bg-[var(--surface-colour)] transition-colors"
              variant="default"
            >
              <span className="text-xl text-[var(--text-primary)]">☰</span>
            </Button>
            
            <h1 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
              Make It All
            </h1>
          </div>

          <div className="flex items-center relative">
            <Button
              onClick={() => setOpen(!open)}
              size="medium"
              width="default"
              variant="sidebar"
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[var(--surface-colour)] hover:bg-[var(--surface-colour-hover)] border border-[var(--border-neutral)] transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <div className="text-left hidden sm:block">
                  <p className="font-semibold text-[var(--text-primary)] text-sm">{user.username}</p>
                  <p className="text-xs text-[var(--text-secondary)] capitalize">{user.role.toLowerCase()}</p>
                </div>
              </div>

              <svg
                className={`w-4 h-4 text-[var(--text-secondary)] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Button>

            {open && (
              <div className="absolute top-full right-0 mt-2 bg-[var(--surface-colour)] border border-[var(--border-neutral)] rounded-lg shadow-xl p-4 min-w-56 z-50 text-[var(--text-primary)]">
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-[var(--border-neutral)]">
                  
                  <div>
                    <p className="font-bold text-[var(--text-primary)]">{user.username}</p>
                    <p className="text-[var(--text-secondary)] text-sm capitalize">{user.role.toLowerCase()}</p>
                  </div>
                </div>

                <Button
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  type="secondary"
                  size="medium"
                  width="full"
                  className="justify-center py-2 text-sm font-semibold mb-3 bg-[var(--surface-colour)] hover:bg-[var(--surface-colour-hover)] text-[var(--text-primary)]"
                >
                  Toggle Theme
                </Button>

                <Button
                  onClick={handleLogout}
                  type="primary"
                  size="medium"
                  width="full"
                  className="justify-center py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button.jsx";
import useLogout from "../scripts/login.jsx";

export default function Navbar({ user, onMobileMenuToggle }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = useLogout();

  return (
    <header className="sticky top-0 left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 shadow-lg z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center px-6 py-3">
          <div className="flex items-center gap-4">
            <Button
              onClick={onMobileMenuToggle}
              size="small"
              width="default"
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              variant="default"
            >
              <span className="text-xl dark:text-gray-100">☰</span>
            </Button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
              Make It All
            </h1>
          </div>

          <div className="flex items-center relative">
            <Button
              onClick={() => setOpen(!open)}
              size="medium"
              width="default"
              variant="sidebar"
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <img
                  src="/avatar-placeholder.png"
                  alt="avatar"
                  className="w-8 h-8 rounded-lg object-cover border border-white shadow-sm"
                />
                <div className="text-left hidden sm:block">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{user.username}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">{user.role.toLowerCase()}</p>
                </div>
              </div>

              <svg
                className={`w-4 h-4 text-gray-500 dark:text-gray-300 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Button>

            {open && (
              <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4 min-w-56 z-50">
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100 dark:border-gray-700">
                  <img
                    src="/avatar-placeholder.png"
                    alt="avatar"
                    className="w-10 h-10 rounded-lg object-cover border border-gray-100 dark:border-gray-600"
                  />
                  <div>
                    <p className="font-bold text-gray-900 dark:text-gray-100">{user.username}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm capitalize">{user.role.toLowerCase()}</p>
                  </div>
                </div>

                <Button
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  type="secondary"
                  size="medium"
                  width="full"
                  className="justify-center py-2 text-sm font-semibold mb-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100"
                >
                  Toggle Theme
                </Button>

                <Button
                  onClick={handleLogout}
                  type="primary"
                  size="medium"
                  width="full"
                  className="justify-center py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800"
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

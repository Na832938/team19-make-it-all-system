import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button.jsx";

export default function Navbar({ user, onMobileMenuToggle }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <header className="sticky top-0 left-0 w-full bg-white border-b border-gray-300 shadow-lg z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center px-6 py-3"> {/* Reduced py-4 to py-3 */}
          {/* Logo + Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button 
              onClick={onMobileMenuToggle}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="text-xl">☰</span>
            </button>
            
            {/* Logo */}
            <h1 className="text-xl font-bold text-gray-900 tracking-tight"> {/* Reduced from text-2xl */}
              Make It All
            </h1>
          </div>

          {/* User Menu */}
          <div className="flex items-center relative">
            <button 
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all duration-200" // Reduced padding
            >
              <div className="flex items-center gap-2"> {/* Reduced gap */}
                <img 
                  src="/avatar-placeholder.png" 
                  alt="avatar" 
                  className="w-8 h-8 rounded-lg object-cover border border-white shadow-sm" // Slightly smaller
                />
                <div className="text-left hidden sm:block">
                  <p className="font-semibold text-gray-900 text-sm">{user.username}</p> {/* Smaller text */}
                  <p className="text-xs text-gray-600 capitalize">{user.role.toLowerCase()}</p>
                </div>
              </div>
              <svg 
                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} // Smaller arrow
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl p-4 min-w-56 z-50"> {/* Slightly smaller */}
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
                  <img 
                    src="/avatar-placeholder.png" 
                    alt="avatar" 
                    className="w-10 h-10 rounded-lg object-cover border border-gray-100" // Smaller
                  />
                  <div>
                    <p className="font-bold text-gray-900">{user.username}</p>
                    <p className="text-gray-600 text-sm capitalize">{user.role.toLowerCase()}</p>
                  </div>
                </div>
                
                <Button 
                  onClick={handleLogout}
                  type="primary"
                  className="w-full justify-center py-2 text-sm font-semibold" // Smaller
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
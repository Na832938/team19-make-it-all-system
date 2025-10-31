import { 
  FaHome, 
  FaTasks, 
  FaComments, 
  FaFileAlt, 
  FaBook 
} from 'react-icons/fa';

export default function Sidebar({ activeSection, setActiveSection, isSidebarOpen, onClose }) {
  const sections = [
    { key: "dashboard", label: "Dashboard", icon: FaHome },
    { key: "todo", label: "Tasks", icon: FaTasks },
    { key: "topics", label: "Topics", icon: FaComments },
    { key: "posts", label: "Posts", icon: FaFileAlt },
    { key: "KnowledgeBase", label: "Knowledge Base", icon: FaBook }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 
        w-64 h-screen
        bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        z-50
        lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Navigation</h2>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-2">
          {sections.map((s) => {
            const IconComponent = s.icon;
            return (
              <button
                key={s.key}
                onClick={() => {
                  setActiveSection(s.key);
                  onClose(); // Close sidebar on mobile after selection
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-3 rounded-lg
                  transition-all duration-200 text-left
                  hover:bg-gray-50 hover:shadow-sm
                  ${activeSection === s.key
                    ? 'bg-blue-50 border border-blue-200 text-blue-700 shadow-sm'
                    : 'text-gray-700'
                  }
                `}
              >
                <IconComponent className={`w-5 h-5 ${
                  activeSection === s.key ? 'text-blue-600' : 'text-gray-500'
                }`} />
                <span className="font-medium">{s.label}</span>
                {activeSection === s.key && (
                  <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
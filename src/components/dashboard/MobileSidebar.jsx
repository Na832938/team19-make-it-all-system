import { 
  FaHome, 
  FaTasks, 
  FaComments, 
  FaFileAlt, 
  FaBook,
  FaChartLine,
  FaTimes 
} from 'react-icons/fa';

export default function MobileSidebar({ activeSection, setActiveSection, isOpen, onClose, isManager = false }) {
  const employeeSections = [
    { key: "dashboard", label: "Dashboard", icon: FaHome },
    { key: "todo", label: "Tasks", icon: FaTasks },
    { key: "topics", label: "Topics", icon: FaComments },
    { key: "posts", label: "Posts", icon: FaFileAlt },
    { key: "KnowledgeBase", label: "Knowledge Base", icon: FaBook }
  ];

  const managerSections = [
    { key: "dashboard", label: "Dashboard", icon: FaHome },
    { key: "graphs", label: "Analytics", icon: FaChartLine }
  ];

  const sections = isManager ? managerSections : employeeSections;

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Mobile Sidebar */}
      <div className="lg:hidden fixed top-20 left-0 right-0 bg-white border-b border-gray-200 shadow-xl z-50">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Navigation</h3>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <FaTimes className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          <nav className="grid grid-cols-2 gap-2">
            {sections.map((s) => {
              const IconComponent = s.icon;
              return (
                <button
                  key={s.key}
                  onClick={() => {
                    setActiveSection(s.key);
                    onClose();
                  }}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg
                    transition-all duration-200 text-left
                    border-2
                    ${activeSection === s.key
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }
                  `}
                >
                  <IconComponent className={`w-5 h-5 ${
                    activeSection === s.key ? 'text-blue-600' : 'text-gray-500'
                  }`} />
                  <span className="font-medium text-sm">{s.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
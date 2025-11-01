import { 
  FaHome, 
  FaTasks, 
  FaComments, 
  FaFileAlt, 
  FaBook,
  FaChartLine
} from 'react-icons/fa';

import Button from '../common/Button.jsx';

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

export default function Sidebar({ activeSection, setActiveSection, sections = employeeSections, isManager = false }) {

  if (isManager) {
    sections = managerSections;
  }

  return (
    <aside className="w-full h-full bg-white border-r border-gray-200 ">
      <nav className="p-4 space-y-2">
        {sections.map((s) => {
          const IconComponent = s.icon;
          return (
            <Button
              key={s.key}
              onClick={() => setActiveSection(s.key)}
              className={`
                w-full flex items-center gap-3 px-3 py-3 rounded-lg
                transition-all duration-200 text-left
                hover:bg-gray-50
                ${activeSection === s.key
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700'
                }
              `}
            >
              <IconComponent className={`w-5 h-5 ${
                activeSection === s.key ? 'text-blue-600' : 'text-gray-500'
              }`} />
              <span className="font-medium">{s.label}</span>
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}
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
  const navSections = isManager ? managerSections : sections;

  return (
    <aside className="w-full h-full bg-white border-r border-gray-200">
      <nav className="p-4 space-y-2">
        {navSections.map((section) => {
          const IconComponent = section.icon;
          const isActive = activeSection === section.key;

          return (
            <Button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              width="sidebar"
              variant="sidebar"
              className={isActive
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }
            >
              <IconComponent
                className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}
              />
              <span className="font-medium text-sm">{section.label}</span>
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}

import { 
  FaHome, 
  FaTasks, 
  FaComments, 
  FaFileAlt, 
  FaBook,
  FaChartLine
} from 'react-icons/fa';

import Button from '../common/Button.jsx';
import PropTypes from 'prop-types';

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

/**
 * The main sidebar component.
 *
 * @param {object} props - The component's props.
 * @param {string} props.activeSection - The currently active section.
 * @param {Function} props.setActiveSection - The function to set the active section.
 * @param {Array<object>} [props.sections=employeeSections] - The sections to display in the sidebar.
 * @param {boolean} [props.isManager=false] - Whether the user is a manager.
 * @returns {JSX.Element} The sidebar component.
 */
export default function Sidebar({ activeSection, setActiveSection, sections = employeeSections, isManager = false }) {
  const navSections = isManager ? managerSections : sections;
  console.log("Rendering Sidebar");
  return (
    <aside className="w-full h-full bg-[var(--surface-colour)] border-r border-[var(--border-neutral)] text-[var(--text-primary)]">
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
                ? 'bg-[var(--surface-alt)] text-[var(--text-primary)] border-[var(--border-neutral)]'
                : 'bg-[var(--surface-colour)] text-[var(--text-secondary)] border-[var(--border-neutral)] hover:bg-[var(--surface-alt)]'
              }
            >
              <IconComponent
                className={`w-5 h-5 ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}
              />
              <span className="font-medium text-sm">{section.label}</span>
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}

Sidebar.propTypes = {
  activeSection: PropTypes.string.isRequired,
  setActiveSection: PropTypes.func.isRequired,
  sections: PropTypes.array,
  isManager: PropTypes.bool,
};

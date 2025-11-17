import { 
  FaHome, 
  FaTasks, 
  FaComments, 
  FaFileAlt, 
  FaBook,
  FaChartLine,
  FaTimes 
} from 'react-icons/fa';

import { Button } from '../common';
import PropTypes from 'prop-types';

/**
 * The sidebar component for mobile devices.
 *
 * @param {object} props - The component's props.
 * @param {string} props.activeSection - The currently active section.
 * @param {Function} props.setActiveSection - The function to set the active section.
 * @param {boolean} props.isOpen - Whether the sidebar is open.
 * @param {Function} props.onClose - The function to close the sidebar.
 * @param {boolean} [props.isManager=false] - Whether the user is a manager.
 * @returns {JSX.Element|null} The mobile sidebar component, or null if it's not open.
 */
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

  console.log("Rendering MobileSidebar");

  return (
    <>
      <div 
        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      <div className="lg:hidden fixed top-20 left-0 right-0 bg-[var(--surface-colour)] border-b border-[var(--border-neutral)] shadow-xl z-50 text-[var(--text-primary)]">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Navigation</h3>
            <Button
              onClick={onClose}
              width="sidebar"
              variant="sidebar"
            >
              <FaTimes className="w-5 h-5 text-[var(--text-secondary)]" />
            </Button>
          </div>

          <nav className="grid grid-cols-2 gap-2">
            {sections.map((section) => {
              const IconComponent = section.icon;
              const isActive = activeSection === section.key;

              return (
                <Button
                  key={section.key}
                  onClick={() => {
                    setActiveSection(section.key);
                    onClose();
                  }}
                  width="sidebar"
                  variant="sidebar"
                  className={isActive
                    ? 'bg-[var(--primary-colour)] text-white border-[var(--primary-colour)]'
                    : 'bg-[var(--surface-alt)] text-[var(--text-primary)] border-[var(--border-neutral)] hover:bg-[var(--surface-alt-hover)]'
                  }
                >
                  <IconComponent
                    className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[var(--text-secondary)]'}`}
                  />
                  <span className="font-medium text-sm">{section.label}</span>
                </Button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}

MobileSidebar.propTypes = {
  activeSection: PropTypes.string.isRequired,
  setActiveSection: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isManager: PropTypes.bool,
};

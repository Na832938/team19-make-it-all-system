import { FaBars } from 'react-icons/fa';
import logo from "../../assets/logo.png";

import PropTypes from 'prop-types';

/**
 * The header component for mobile devices.
 * @param {object} props - The component's props.
 * @param {Function} props.onMenuToggle - The function to toggle the mobile menu.
 * @returns {JSX.Element} The mobile header component.
 */
export default function MobileHeader({ onMenuToggle }) {
  console.log("Rendering MobileHeader");
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 bg-[var(--surface-colour)] border-b border-[var(--border-neutral)] z-50 p-4 text-[var(--text-primary)]">
      <div className="flex items-center justify-between">
    
        <h1 className="text-xl font-bold">Make it All</h1>
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-lg bg-[var(--surface-alt)] hover:bg-[var(--surface-alt-hover)] transition-colors"
        >
          <FaBars className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}

MobileHeader.propTypes = {
  onMenuToggle: PropTypes.func.isRequired,
};

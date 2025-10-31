import { FaBars } from 'react-icons/fa';

export default function MobileHeader({ onMenuToggle }) {
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Make it All</h1>
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <FaBars className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </header>
  );
}
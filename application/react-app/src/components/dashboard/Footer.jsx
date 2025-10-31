export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-300 py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center flex-wrap gap-2">
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} Team 19. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <button className="text-gray-500 hover:text-gray-700 text-sm">Privacy</button>
          <button className="text-gray-500 hover:text-gray-700 text-sm">Terms</button>
          <button className="text-gray-500 hover:text-gray-700 text-sm">Help</button>
        </div>
      </div>
    </footer>
  );
}
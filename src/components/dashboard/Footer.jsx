/**
 * The footer component for the application.
 * @returns {JSX.Element} The footer component.
 */
export default function Footer() {
  console.log("Rendering Footer");
  return (
    <footer className="bg-[var(--surface-colour)] border-t border-[var(--border-neutral)] py-4 mt-auto text-[var(--text-primary)]">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center flex-wrap gap-2">
        <p className="text-[var(--text-secondary)] text-sm">
          © {new Date().getFullYear()} Team 19. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm">Privacy</button>
          <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm">Terms</button>
          <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm">Help</button>
        </div>
      </div>
    </footer>
  );
}

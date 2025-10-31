export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border-neutral text-center p-md">
      <div className="max-w-7xl mx-auto flex flex-row justify-between items-center flex-wrap gap-sm sm:flex-col sm:text-center">
        <p>© {new Date().getFullYear()} Team 19. All rights reserved.</p>
        <div className="flex gap-md">
          <a href="#" className="text-text-primary text-body no-underline hover:underline">
            Privacy
          </a>
          <a href="#" className="text-text-primary text-body no-underline hover:underline">
            Terms
          </a>
          <a href="#" className="text-text-primary text-body no-underline hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
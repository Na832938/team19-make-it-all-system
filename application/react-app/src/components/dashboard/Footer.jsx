// Footer.jsx
import './Footer.css';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Team 19. All rights reserved.</p>
      </div>
    </footer>
  );
}

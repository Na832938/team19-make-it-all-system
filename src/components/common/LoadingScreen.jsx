// components/common/LoadingScreen.jsx
/**
 * A loading screen component.
 * @returns {JSX.Element} The loading screen component.
 */
export default function LoadingScreen() {
  // Component rendering tracked via logger in development
  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--surface-colour)]">
      <div className="text-lg text-[var(--text-secondary)]">Loading...</div>
    </div>
  );
}

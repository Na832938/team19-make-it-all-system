export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-surface text-textPrimary p-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-textSecondary">The page you’re looking for doesn’t exist.</p>
        <a href="/" className="text-primary hover:text-primaryHover">Go home</a>
      </div>
    </main>
  );
}

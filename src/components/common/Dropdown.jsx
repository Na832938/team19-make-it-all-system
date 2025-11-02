export default function Dropdown({ 
  children, 
  isOpen,
  className = '' 
}) {
  return (
    <div className={`
      dropdown-base dropdown-responsive
      ${isOpen ? 'flex' : 'hidden'}
      ${className}
    `}>
      <div className="bg-[var(--surface-colour)] dark:bg-[var(--surface-colour)] text-[var(--text-primary)] dark:text-[var(--text-primary)] border border-[var(--border-neutral)] dark:border-[var(--border-neutral)] rounded-md shadow-sm p-2 w-full">
        {children}
      </div>
    </div>
  );
}

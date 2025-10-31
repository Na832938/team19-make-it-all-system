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
      {children}
    </div>
  );
}
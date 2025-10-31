export default function Dropdown({ 
  children, 
  isOpen 
}) {
  return (
    <div className={`
      absolute top-[calc(100%+var(--space-xs))] right-0
      hidden flex-col
      bg-surface border border-border-neutral rounded-md shadow-md
      p-md min-w-[200px] z-20
      font-ubuntu text-body
      transition-opacity duration-200 ease-in-out transition-transform duration-200 ease-in-out
      ${isOpen ? 'flex' : 'hidden'}
      sm:right-md sm:left-md sm:min-w-auto sm:w-auto
    `}>
      {children}
    </div>
  );
}
export default function Button({ 
  type = 'primary', 
  children, 
  onClick,
  disabled = false,
  className = ''
}) {
  const baseClasses = `
    w-full max-w-[25rem] min-w-[8rem] 
    px-lg py-md h-auto flex-shrink-0 
    border border-border-neutral rounded-md
    font-ubuntu font-medium text-body leading-6
    text-center cursor-pointer
    shadow-sm transition-all duration-200 ease-in-out
    box-border
    hover:shadow-md hover:-translate-y-0.5
    focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2
    disabled:bg-disabled disabled:text-gray-500 disabled:border-gray-400 
    disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none
    md:px-md md:py-sm md:text-[0.95rem]
    sm:px-sm sm:py-xs sm:text-[0.9rem]
    ${disabled ? 'opacity-60' : ''}
    ${className}
  `;
  
  const typeClasses = {
    primary: "bg-primary hover:bg-primary-hover text-surface border-none",
    secondary: "bg-secondary hover:bg-secondary-hover text-text-primary border-border-neutral",
    danger: "bg-status-danger hover:bg-status-danger-hover text-surface border-none"
  };

  return (
    <button 
      type="button" 
      className={`${baseClasses} ${typeClasses[type]}`} 
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
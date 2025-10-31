export default function Button({ 
  type = 'primary', 
  size = 'medium',
  children, 
  onClick,
  disabled = false,
  className = ''
}) {
  const typeClasses = {
    primary: "bg-primary hover:bg-primary-hover text-surface border-none",
    secondary: "bg-secondary hover:bg-secondary-hover text-text-primary border-border-neutral",
    danger: "bg-status-danger hover:bg-status-danger-hover text-surface border-none",
    purple: "bg-purple-600 hover:bg-purple-700 text-surface border-none",
    orange: "bg-orange-600 hover:bg-orange-700 text-surface border-none",
    green: "bg-green-600 hover:bg-green-700 text-surface border-none",
    gray: "bg-gray-200 hover:bg-gray-300 text-gray-900 border-border-neutral"
  };

  const sizeClasses = {
    small: 'px-sm py-xs text-sm',
    medium: 'px-md py-sm text-body',
    large: 'px-lg py-md text-lg'
  };

  return (
    <button 
      type="button" 
      className={`btn-base btn-hover btn-focus btn-disabled responsive-padding ${typeClasses[type]} ${sizeClasses[size]} ${disabled ? 'opacity-60' : ''} ${className}`} 
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
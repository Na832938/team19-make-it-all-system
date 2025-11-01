export default function Button({ 
  type = 'primary', 
  size = 'medium',
  children, 
  onClick,
  disabled = false,
  className = '',
  buttonType = 'button',
  ...props 
}) {
  const typeClasses = {
    primary: "btn-primary", // Uses your CSS class
    secondary: "btn-secondary", 
    danger: "btn-danger",
    purple: "bg-purple-600 hover:bg-purple-700 text-white border-none", // Tailwind classes
    orange: "bg-orange-600 hover:bg-orange-700 text-white border-none",
    green: "bg-green-600 hover:bg-green-700 text-white border-none",
    gray: "bg-gray-200 hover:bg-gray-300 text-gray-900 border-border-neutral"
  };

  const sizeClasses = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };

  return (
    <button 
      type={buttonType}
      className={`btn-base ${typeClasses[type]} ${sizeClasses[size]} ${disabled ? 'opacity-60' : ''} ${className}`} 
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
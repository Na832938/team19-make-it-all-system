export default function Button({
  type = 'primary',
  size = 'medium',
  width = 'default',
  variant = 'default',
  children,
  onClick,
  disabled = false,
  className = '',
  buttonType = 'button',
  active = false,
  ...props
}) {

  const typeClasses = {
    primary: "bg-blue-600 text-white border-none hover:bg-blue-700 active:bg-blue-800",
    secondary: "bg-gray-200 text-gray-900 border-none hover:bg-gray-300 active:bg-gray-400",
    danger: "bg-red-600 text-white border-none hover:bg-red-700 active:bg-red-800",
    green: "bg-green-600 text-white border-none hover:bg-green-700 active:bg-green-800",
    gray: "bg-gray-100 text-gray-900 border-none hover:bg-gray-200 active:bg-gray-300",
    orange: "bg-orange-600 text-white border-none hover:bg-orange-700 active:bg-orange-800",
    purple: "bg-purple-600 text-white border-none hover:bg-purple-700 active:bg-purple-800",
    sidebarDefault: "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 active:bg-gray-100",
    sidebarActive: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 active:bg-blue-200"
  };

  const sizeClasses = {
    small: 'px-2 py-0.5 text-sm',
    medium: 'px-3 py-1.5 text-base',
    large: 'px-4 py-2 text-lg'
  };

  const widthClasses = {
    default: "w-full max-w-[20rem] min-w-[6rem]",
    full: "w-full",
    sidebar: "w-full"
  };

  const variantClasses = {
    default: "rounded-md shadow-sm transition-all duration-200 ease-in-out hover:brightness-95 cursor-pointer",
    sidebar: "flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-200 text-left hover:brightness-95 cursor-pointer"
  };

  const typeClass = variant === 'sidebar'
    ? active
      ? typeClasses.sidebarActive
      : typeClasses.sidebarDefault
    : typeClasses[type];

  return (
    <button
      type={buttonType}
      className={`
        ${widthClasses[width]}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${typeClass}
        ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

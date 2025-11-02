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
}) {carousel: `
  absolute z-10 rounded-full p-2 shadow
  bg-[var(--surface-colour)] text-[var(--text-primary)]
  hover:brightness-110 transition
  dark:bg-[var(--surface-colour)] dark:text-[var(--text-primary)]
`
const typeClasses = {
  primary: `
    bg-[var(--primary-colour)] text-[var(--surface-colour)] border-none
    hover:bg-[var(--primary-hover)] active:bg-[var(--focus-colour)]
    dark:bg-[var(--primary-colour)] dark:text-white
    dark:hover:bg-[var(--primary-hover)] dark:active:bg-[var(--focus-colour)]
  `,
  secondary: `
    bg-[var(--secondary-colour)] text-[var(--text-primary)] border border-[var(--border-neutral)]
    hover:bg-[var(--secondary-hover)] active:bg-[var(--border-neutral)]
    dark:bg-[var(--secondary-colour)] dark:text-[var(--text-primary)] dark:border-[var(--border-neutral)]
    dark:hover:bg-[var(--secondary-hover)] dark:active:bg-[var(--border-neutral)]
  `,
  danger: `
    bg-[var(--danger-colour)] text-[var(--surface-colour)]
    hover:bg-[var(--danger-hover)] active:bg-[var(--error-colour)]
    dark:bg-[var(--danger-colour)] dark:text-white
    dark:hover:bg-[var(--danger-hover)] dark:active:bg-[var(--error-colour)]
  `,
  green: `
    bg-[var(--success-colour)] text-[var(--surface-colour)]
    hover:brightness-110 active:brightness-90
    dark:bg-[var(--success-colour)] dark:text-white
  `,
  gray: `
    bg-[var(--secondary-colour)] text-[var(--text-secondary)] border border-[var(--border-neutral)]
    hover:bg-[var(--secondary-hover)] active:bg-[var(--border-neutral)]
    dark:bg-[var(--secondary-colour)] dark:text-[var(--text-secondary)] dark:border-[var(--border-neutral)]
    dark:hover:bg-[var(--secondary-hover)] dark:active:bg-[var(--border-neutral)]
  `,
  orange: `
    bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700
    dark:bg-orange-500 dark:text-white dark:hover:bg-orange-600 dark:active:bg-orange-700
  `,
  purple: `
    bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800
    dark:bg-purple-600 dark:text-white dark:hover:bg-purple-700 dark:active:bg-purple-800
  `,
  sidebarDefault: `
    bg-[var(--surface-colour)] text-[var(--text-secondary)] border border-[var(--border-neutral)]
    hover:bg-[var(--secondary-hover)] active:bg-[var(--border-neutral)]
    dark:bg-[var(--surface-colour)] dark:text-[var(--text-secondary)] dark:border-[var(--border-neutral)]
    dark:hover:bg-[var(--secondary-hover)] dark:active:bg-[var(--border-neutral)]
  `,
  sidebarActive: `
    bg-[var(--primary-colour)] text-[var(--surface-colour)] border border-[var(--primary-hover)]
    hover:bg-[var(--primary-hover)] active:bg-[var(--focus-colour)]
    dark:bg-[var(--primary-colour)] dark:text-white dark:border-[var(--primary-hover)]
    dark:hover:bg-[var(--primary-hover)] dark:active:bg-[var(--focus-colour)]
  `
};


  const sizeClasses = {
    small: 'px-2 py-0.5 text-sm',
    medium: 'px-3 py-1.5 text-base',
    large: 'px-4 py-2 text-lg'
  };

  const widthClasses = {
    default: 'w-full max-w-[20rem] min-w-[6rem]',
    full: 'w-full',
    sidebar: 'w-full',
    carousel: 'w-auto h-auto min-w-0 min-h-0'
  };

  const variantClasses = {
    default: 'rounded-md shadow-sm transition-all duration-200 ease-in-out hover:brightness-95 cursor-pointer',
    sidebar: 'flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-200 text-left hover:brightness-95 cursor-pointer',
    carousel: `
  absolute z-10 rounded-full p-2 shadow
  w-auto h-auto
  bg-[var(--surface-colour)] text-[var(--text-primary)]
  hover:brightness-110 transition
  dark:bg-[var(--surface-colour)] dark:text-[var(--text-primary)]
`,

  };

  const typeClass =
    variant === 'sidebar'
      ? active
        ? typeClasses.sidebarActive
        : typeClasses.sidebarDefault
      : typeClasses[type];

  const widthClass = variant === 'carousel' ? '' : widthClasses[width];

  return (
    <button
      type={buttonType}
      className={`
        ${widthClasses[variant] || widthClasses[width]}
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

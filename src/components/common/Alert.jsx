import Button from './Button';

export default function Alert({
  type = 'info', // 'info' | 'success' | 'warning' | 'error'
  title,
  message,
  onClose,
  className = '',
  showIcon = true,
  actions // Optional action buttons
}) {
  const alertConfig = {
    info: { 
      icon: 'ℹ️', 
      defaultTitle: 'Info',
      buttonType: 'secondary',
      base: 'bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-900/30 dark:text-blue-100 dark:border-blue-700'
    },
    success: { 
      icon: '✅', 
      defaultTitle: 'Success',
      buttonType: 'green',
      base: 'bg-green-50 text-green-900 border-green-200 dark:bg-green-900/30 dark:text-green-100 dark:border-green-700'
    },
    warning: { 
      icon: '⚠️', 
      defaultTitle: 'Warning', 
      buttonType: 'orange',
      base: 'bg-yellow-50 text-yellow-900 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-100 dark:border-yellow-700'
    },
    error: { 
      icon: '❌', 
      defaultTitle: 'Error',
      buttonType: 'danger',
      base: 'bg-red-50 text-red-900 border-red-200 dark:bg-red-900/30 dark:text-red-100 dark:border-red-700'
    }
  };

  const config = alertConfig[type];
  const displayTitle = title || config.defaultTitle;

  return (
    <div className={`border rounded-md p-4 ${config.base} ${className}`}>
      <div className="flex items-start">
        {showIcon && (
          <div className="flex-shrink-0 mr-3">
            <span className="text-lg">{config.icon}</span>
          </div>
        )}

        <div className="flex-1">
          <h3 className="text-sm font-semibold">{displayTitle}</h3>
          <div className="text-sm mt-1">{message}</div>

          {actions && (
            <div className="flex gap-2 mt-3">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  type={action.type || config.buttonType}
                  size="small"
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>

        {onClose && (
          <div className="flex-shrink-0 ml-3">
            <Button
              type="secondary"
              size="small"
              onClick={onClose}
              className="!min-w-0 !px-2 !py-1 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              ×
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

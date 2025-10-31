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
      buttonType: 'secondary'
    },
    success: { 
      icon: '✅', 
      defaultTitle: 'Success',
      buttonType: 'green'
    },
    warning: { 
      icon: '⚠️', 
      defaultTitle: 'Warning', 
      buttonType: 'orange'
    },
    error: { 
      icon: '❌', 
      defaultTitle: 'Error',
      buttonType: 'danger'
    }
  };

  const config = alertConfig[type];
  const displayTitle = title || config.defaultTitle;

  return (
    <div className={`alert-base alert-${type} ${className}`}>
      <div className="flex">
        {showIcon && (
          <div className="flex-shrink-0 mr-3">
            <span className="text-lg">{config.icon}</span>
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-sm font-medium">
            {displayTitle}
          </h3>
          <div className="text-sm mt-1">
            {message}
          </div>
          
          {/* Action buttons */}
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
              className="!min-w-0 !px-2 !py-1"
            >
              ×
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
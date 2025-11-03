import { FaInfoCircle, FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaTimes } from 'react-icons/fa';
import Button from './Button';

export default function Alert({
  type = 'info',
  title,
  message,
  onClose,
  className = '',
  showIcon = true,
  actions
}) {
  const alertConfig = {
    info: { 
      icon: <FaInfoCircle className="w-5 h-5" />,
      defaultTitle: 'Info',
      buttonType: 'secondary',
      base: 'bg-primary/10 text-textPrimary border-borderNeutral dark:bg-primary/20 dark:text-textPrimary dark:border-borderNeutral'
    },
    success: { 
      icon: <FaCheckCircle className="w-5 h-5" />,
      defaultTitle: 'Success',
      buttonType: 'green',
      base: 'bg-success/10 text-textPrimary border-borderNeutral dark:bg-success/20 dark:text-textPrimary dark:border-borderNeutral'
    },
    warning: { 
      icon: <FaExclamationTriangle className="w-5 h-5" />,
      defaultTitle: 'Warning',
      buttonType: 'orange',
      base: 'bg-danger/10 text-textPrimary border-borderNeutral dark:bg-danger/20 dark:text-textPrimary dark:border-borderNeutral'
    },
    error: { 
      icon: <FaTimesCircle className="w-5 h-5" />,
      defaultTitle: 'Error',
      buttonType: 'danger',
      base: 'bg-error/10 text-textPrimary border-borderNeutral dark:bg-error/20 dark:text-textPrimary dark:border-borderNeutral'
    }
  };

  const config = alertConfig[type];
  const displayTitle = title || config.defaultTitle;

  return (
    <div className={`border rounded-md p-4 ${config.base} ${className}`}>
      <div className="flex items-start">
        {showIcon && (
          <div className="flex-shrink-0 mr-3">
            {config.icon}
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
              className="!min-w-0 !px-2 !py-1 bg-surface text-textPrimary hover:bg-secondaryHover dark:bg-surface dark:text-textPrimary dark:hover:bg-secondaryHover"
            >
              <FaTimes className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

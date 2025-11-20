import { FaInfoCircle, FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaTimes } from 'react-icons/fa';
import Card from './Card.jsx';
import Button from './Button.jsx';
import PropTypes from 'prop-types';
import { logger } from '../../lib/logger';

/**
 * An alert component for displaying important messages.
 *
 * @param {object} props - The component's props.
 * @param {'info' | 'success' | 'warning' | 'error'} [props.type='info'] - The type of the alert.
 * @param {string} props.title - The title of the alert.
 * @param {string} props.message - The message of the alert.
 * @param {Function} props.onClose - The function to call when the alert is closed.
 * @param {string} [props.className=''] - Additional CSS classes to apply to the alert.
 * @param {boolean} [props.showIcon=true] - Whether to show the icon.
 * @param {Array<object>} props.actions - An array of actions to display in the alert.
 * @returns {JSX.Element} The alert component.
 */
export default function Alert({
  type = 'info',
  title,
  message,
  onClose,
  className = '',
  showIcon = true,
  actions
}) {
  logger.info(`Displaying ${type} alert: ${title}`);
  const alertConfig = {
    info: { 
      icon: <FaInfoCircle className="w-5 h-5" />,
      defaultTitle: 'Info',
      buttonType: 'secondary',
    },
    success: { 
      icon: <FaCheckCircle className="w-5 h-5" />,
      defaultTitle: 'Success',
      buttonType: 'green',
    },
    warning: { 
      icon: <FaExclamationTriangle className="w-5 h-5" />,
      defaultTitle: 'Warning',
      buttonType: 'orange',
    },
    error: { 
      icon: <FaTimesCircle className="w-5 h-5" />,
      defaultTitle: 'Error',
      buttonType: 'danger',
    }
  };

  const config = alertConfig[type];
  const displayTitle = title || config.defaultTitle;

  return (
    <Card className={`border rounded-md p-4 ${className}`}>
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
    </Card>
  );
}

Alert.propTypes = {
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  className: PropTypes.string,
  showIcon: PropTypes.bool,
  actions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.string,
  })),
};

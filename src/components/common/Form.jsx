import Button from "./Button.jsx";
import PropTypes from 'prop-types';
import { logger } from '../../lib/logger';

/**
 * A form component.
 *
 * @param {object} props - The component's props.
 * @param {React.ReactNode} props.children - The content of the form.
 * @param {Function} props.onSubmit - The function to call when the form is submitted.
 * @param {string} [props.submitText="Submit"] - The text for the submit button.
 * @param {string} [props.cancelText="Cancel"] - The text for the cancel button.
 * @param {Function} props.onCancel - The function to call when the cancel button is clicked.
 * @param {boolean} [props.loading=false] - Whether the form is in a loading state.
 * @param {boolean} [props.disabled=false] - Whether the form is disabled.
 * @param {boolean} [props.actions=true] - Whether to show the form actions (submit and cancel buttons).
 * @param {'vertical' | 'horizontal'} [props.layout='vertical'] - The layout of the form.
 * @param {'default' | 'compact' | 'comfortable'} [props.variant='default'] - The variant of the form.
 * @param {string} [props.className=""] - Additional CSS classes to apply to the form.
 * @returns {JSX.Element} The form component.
 */
export default function Form({
  children,
  onSubmit,
  submitText = "Submit",
  cancelText = "Cancel",
  onCancel,
  loading = false,
  disabled = false,
  actions = true,
  layout = "vertical", // 'vertical' | 'horizontal'
  variant = "default", // 'default' | 'compact' | 'comfortable'
  className = ""
}) {

  const handleSubmit = (e) => {
    e.preventDefault();
    logger.action('Form submitted');
    if (!loading && !disabled && onSubmit) onSubmit(e);
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    logger.action('Form cancelled');
    if (onCancel) onCancel();
  };

  const layoutClasses = {
    vertical: "flex flex-col gap-6",
    horizontal: "flex flex-col gap-6"
  };

  const actionClasses = {
    vertical: "mt-4 flex flex-col gap-2",
    horizontal: "mt-6 flex flex-row gap-4 justify-end items-center"
  };

  const widthClasses = {
    vertical: "full",
    horizontal: "default"
  };

  const variantClasses = {
    default: "p-6",
    compact: "p-4",
    comfortable: "p-8"
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        w-full 
        ${layoutClasses[layout]} 
        ${variantClasses[variant]} 
        ${className}
      `}
    >
      <div className="flex flex-col gap-4 w-full">
        {children}
      </div>

      {actions && (
        <div className={actionClasses[layout]}>
          {onCancel && (
            <Button
              type="secondary"
              onClick={handleCancelClick}
              disabled={loading || disabled}
              width={widthClasses[layout]}
            >
              {cancelText}
            </Button>
          )}

          <Button
            type="primary"
            size="medium"
            width={widthClasses[layout]}
            disabled={loading || disabled}
            buttonType="submit"
          >
            {loading ? "Loading..." : submitText}
          </Button>
        </div>
      )}
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  submitText: PropTypes.string,
  cancelText: PropTypes.string,
  onCancel: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  actions: PropTypes.bool,
  layout: PropTypes.oneOf(['vertical', 'horizontal']),
  variant: PropTypes.oneOf(['default', 'compact', 'comfortable']),
  className: PropTypes.string,
};

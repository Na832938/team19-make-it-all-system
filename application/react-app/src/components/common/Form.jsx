// Form.jsx
import Button from "./Button.jsx";

export default function Form({
  children,
  onSubmit,
  submitText = "Submit",
  cancelText = "Cancel",
  onCancel,
  loading = false,
  disabled = false,
  actions = true,
  className = ""
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    // Just prevent default and pass the event - let parent handle React state
    if (!loading && !disabled && onSubmit) {
      onSubmit(e);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    console.log("Cancel button clicked");
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`form-layout ${className}`}>
      <div className="form-field-group">
        {children}
      </div>

      {actions && (
        <div className="form-actions">
          {onCancel && (
            <Button
              type="button" // Important: type="button" to prevent form submission
              onClick={handleCancelClick}
              disabled={loading || disabled}
              className="flex-1 sm:flex-none"
            >
              {cancelText}
            </Button>
          )}
          <Button
            type="submit"
            disabled={loading || disabled}
            className="flex-1 sm:flex-none"
          >
            {loading ? "Loading..." : submitText}
          </Button>
        </div>
      )}
    </form>
  );
}
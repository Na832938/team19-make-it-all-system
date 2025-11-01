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
  layout = "vertical", // 'vertical' | 'horizontal'
  variant = "default", // 'default' | 'compact' | 'comfortable'
  className = ""
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!loading && !disabled && onSubmit) {
      onSubmit(e);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    
    if (onCancel) {
      onCancel();
    }
  };

  // Layout classes
  const layoutClasses = {
    vertical: "form-vertical",
    horizontal: "form-horizontal"
  };

  // Variant classes for spacing
  const variantClasses = {
    default: "form-default",
    compact: "form-compact", 
    comfortable: "form-comfortable"
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`form-base ${layoutClasses[layout]} ${variantClasses[variant]} ${className}`}
    >
      <div className="form-content">
        {children}
      </div>

      {actions && (
        <div className={`form-actions form-actions-${layout}`}>
          {onCancel && (
            <Button
              type="secondary"
              onClick={handleCancelClick}
              disabled={loading || disabled}
              className={layout === 'vertical' ? 'w-full' : 'flex-1'}
            >
              {cancelText}
            </Button>
          )}
          
          <Button
            type="primary"
            disabled={loading || disabled}
            className={layout === 'vertical' ? 'w-full' : 'flex-1'}
            buttonType="submit"
          >
            {loading ? "Loading..." : submitText}
          </Button>
        </div>
      )}
    </form>
  );
}
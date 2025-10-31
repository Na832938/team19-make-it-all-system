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
  layout = "vertical", // 'vertical' | 'horizontal' | 'grid'
  spacing = "normal", // 'compact' | 'normal' | 'comfortable'
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

  const layoutClasses = {
    vertical: "form-layout-vertical",
    horizontal: "form-layout-horizontal",
    grid: "form-layout-grid"
  };

  const spacingClasses = {
    compact: "form-spacing-compact",
    normal: "form-spacing-normal", 
    comfortable: "form-spacing-comfortable"
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`${layoutClasses[layout]} ${spacingClasses[spacing]} ${className}`}
    >
      <div className="form-field-group">
        {children}
      </div>

      {actions && (
        <div className={`form-actions form-actions-${layout}`}>
          {onCancel && (
            <Button
              type="button"
              onClick={handleCancelClick}
              disabled={loading || disabled}
              className={layout === 'vertical' ? 'w-full' : 'flex-1 sm:flex-none'}
            >
              {cancelText}
            </Button>
          )}
          
          <Button
            type="submit"
            disabled={loading || disabled}
            className={layout === 'vertical' ? 'w-full' : 'flex-1 sm:flex-none'}
          >
            {loading ? "Loading..." : submitText}
          </Button>
        </div>
      )}
    </form>
  );
}
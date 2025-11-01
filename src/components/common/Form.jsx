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

  const layoutClasses = {
    vertical: "flex flex-col gap-4",
    horizontal: "flex flex-row gap-4 items-center"
  };

  const variantClasses = {
    default: "p-4",
    compact: "p-2",
    comfortable: "p-6"
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full ${layoutClasses[layout]} ${variantClasses[variant]} ${className}`}
    >

      <div className="flex flex-col gap-2 w-full">
        {children}
      </div>

      {actions && (
        <div className={`mt-4 flex ${layout === 'vertical' ? 'flex-col gap-2' : 'flex-row gap-2'}`}>

          {onCancel && (
            <Button
              type="secondary"
              onClick={handleCancelClick}
              disabled={loading || disabled}
              width={layout === 'vertical' ? 'full' : 'default'}
            >
              {cancelText}
            </Button>
          )}

          <Button
            type="primary"
            size="medium"
            width={layout === 'vertical' ? 'full' : 'default'}
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

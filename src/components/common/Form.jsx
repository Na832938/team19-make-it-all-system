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
    if (!loading && !disabled && onSubmit) onSubmit(e);
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    if (onCancel) onCancel();
  };

  const layoutClasses = {
    vertical: "flex flex-col gap-6",
    horizontal: "flex flex-col gap-6" // main container still vertical for content
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
      className={`w-full ${layoutClasses[layout]} ${variantClasses[variant]} ${className}`}
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

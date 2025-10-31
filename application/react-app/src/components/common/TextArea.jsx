export default function TextArea({ 
  value, 
  onChange, 
  placeholder, 
  rows = 4, 
  disabled = false 
}) {
  return (
    <textarea
      className={`
        w-full max-w-[25rem]
        px-md py-sm
        font-ubuntu text-body
        border border-border-neutral rounded-md
        bg-secondary text-text-primary
        box-border resize-vertical
        transition-all duration-200 ease-in-out
        ${!disabled && 'hover:border-primary'}
        focus:outline-none focus:border-focus focus:bg-surface focus:shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]
        placeholder:text-text-secondary placeholder:opacity-70
        disabled:bg-disabled disabled:cursor-not-allowed
        sm:text-[0.875rem] sm:px-sm sm:py-xs
      `}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
    />
  );
}
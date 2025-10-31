export default function TextArea({ 
  value, 
  onChange, 
  placeholder, 
  rows = 4, 
  disabled = false,
  className = ''
}) {
  return (
    <textarea
      className={`input-base input-hover input-focus input-disabled responsive-text resize-vertical focus:bg-surface focus:shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
    />
  );
}
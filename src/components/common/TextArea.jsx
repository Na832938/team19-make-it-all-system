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
      className={`textarea-base textarea-hover textarea-focus textarea-disabled responsive-text ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
    />
  );
}
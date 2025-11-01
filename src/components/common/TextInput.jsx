export default function TextInput({ 
  type = 'text', 
  value, 
  onChange, 
  placeholder,
  disabled = false,
  className = '',
  ...props // Capture all other props
}) {
  return (
    <input 
      type={type} 
      className={`input-base input-hover input-focus input-disabled responsive-text ${disabled ? '' : 'hover:border-primary'} ${className}`}
      value={value} 
      onChange={onChange} 
      placeholder={placeholder}
      disabled={disabled}
      {...props} // Pass all other props
    />
  );
}
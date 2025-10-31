export default function Select({ 
  value, 
  onChange, 
  options = [], 
  placeholder, 
  name, 
  defaultValue, 
  disabled = false,
  className = ''
}) {
  return (
    <select
      name={name}
      className={`input-base input-hover input-focus input-disabled responsive-text cursor-pointer ${className}`}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      disabled={disabled}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt, idx) => (
        <option key={idx} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
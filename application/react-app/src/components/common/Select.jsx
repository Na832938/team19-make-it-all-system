import './Select.css';

export default function Select({ value, onChange, options = [], placeholder, name, defaultValue, disabled = false }) {
  return (
    <select
      name={name}
      className="select"
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

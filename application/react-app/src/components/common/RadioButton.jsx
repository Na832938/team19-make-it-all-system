import './RadioButton.css';

export default function RadioButton({ checked = false, onChange, label = '', disabled = false, name }) {
  return (
    <label className={`radio-wrapper ${disabled ? 'disabled' : ''}`}>
      <input
        type="radio"
        className="radio-input"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        name={name}
      />
      {label && <span className="radio-label">{label}</span>}
    </label>
  );
}

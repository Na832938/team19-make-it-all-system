import './Checkbox.css';

export default function Checkbox({ checked = false, onChange, label = '', disabled = false }) {
  return (
    <label className={`checkbox-wrapper ${disabled ? 'disabled' : ''}`}>
      <input
        type="checkbox"
        className="checkbox-input"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      {label && <span className="checkbox-label">{label}</span>}
    </label>
  );
}

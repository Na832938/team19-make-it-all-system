import './TextArea.css';

export default function TextArea({ value, onChange, placeholder, rows = 4, disabled = false }) {
  return (
    <TextArea
      className="textarea"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
    />
  );
}

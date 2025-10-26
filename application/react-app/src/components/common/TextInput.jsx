import './TextInput.css';

export default function TextInput({ type = 'text', value, onChange, placeholder }) {
  return (
    <input type={type} className={`text-input text-input-${type}`} value={value} onChange={onChange} placeholder={placeholder} />
  );
}

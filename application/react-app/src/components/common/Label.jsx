import './Label.css';

export default function Label({ text, children, htmlFor }) {
  return (
    <label className="label" htmlFor={htmlFor}>
      <span className="label-text">{text}</span>
      {children}
    </label>
  );
}

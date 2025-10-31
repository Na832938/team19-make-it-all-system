export default function Label({ 
  text, 
  children, 
  htmlFor,
  className = ''
}) {
  return (
    <label 
      className={`label-base text-responsive ${className}`}
      htmlFor={htmlFor}
    >
      {text && <span className="font-medium text-text-secondary">{text}</span>}
      {children}
    </label>
  );
}
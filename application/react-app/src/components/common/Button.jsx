import './Button.css';

export default function Button
({ 
  type = 'primary', 
  children, 
  onClick 
}) {
  return (
    <button 
    type="button" 
    className={`button button-${type}`} 
    onClick={onClick}>
      {children}
    </button>
  );
} 
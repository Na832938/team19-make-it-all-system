export default function TextArea({ 
  value, 
  onChange, 
  placeholder, 
  rows = 4, 
  disabled = false,
  className = ''
}) {
  return (
    <textarea
      className={`
        w-full 
        rounded-md 
        p-2 
        border 
        border-gray-300 
        text-gray-900 
        bg-white 
        shadow-sm 
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-500 
        disabled:bg-gray-100 
        disabled:cursor-not-allowed 
        disabled:text-gray-500 
        transition-all 
        duration-200 
        ease-in-out
        ${className}
      `}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
    />
  );
}

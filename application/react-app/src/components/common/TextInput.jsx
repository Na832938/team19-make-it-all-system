export default function TextInput({ 
  type = 'text', 
  value, 
  onChange, 
  placeholder 
}) {
  return (
    <input 
      type={type} 
      className={`
        w-full max-w-[25rem]
        h-[calc(var(--space-lg)+0.5rem)] flex-shrink-0
        px-md
        font-ubuntu text-body
        border border-disabled rounded-md
        bg-secondary text-text-primary
        box-border
        transition-all duration-200 ease-in-out
        focus:outline-none focus:border-focus focus:bg-surface focus:shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]
        placeholder:text-text-secondary placeholder:opacity-70
      `}
      value={value} 
      onChange={onChange} 
      placeholder={placeholder} 
    />
  );
}
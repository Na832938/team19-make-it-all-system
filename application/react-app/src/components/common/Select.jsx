export default function Select({ 
  value, 
  onChange, 
  options = [], 
  placeholder, 
  name, 
  defaultValue, 
  disabled = false 
}) {
  return (
    <select
      name={name}
      className={`
        w-full max-w-[25rem]
        px-md py-sm
        border border-border-neutral rounded-md
        font-ubuntu text-body text-text-primary
        bg-surface
        cursor-pointer
        transition-all duration-200 ease-in-out
        ${!disabled && 'hover:border-primary'}
        focus:border-focus focus:shadow-[0_0_0_2px_rgba(26,115,232,0.2)] focus:outline-none
        disabled:bg-disabled disabled:cursor-not-allowed disabled:text-text-secondary
        sm:px-sm sm:py-xs sm:text-[0.875rem]
      `}
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
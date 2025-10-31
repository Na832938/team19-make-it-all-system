export default function Label({ 
  text, 
  children, 
  htmlFor 
}) {
  return (
    <label 
      className="
        flex flex-col gap-xs
        font-ubuntu text-body text-text-primary
        w-full max-w-full box-border
        md:text-[0.95rem] md:gap-xs
      "
      htmlFor={htmlFor}
    >
      {text && <span className="font-medium text-text-secondary">{text}</span>}
      {children}
    </label>
  );
}
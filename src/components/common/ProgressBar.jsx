export default function ProgressBar({ 
  value = 0, 
  max = 100, 
  label,
  className = '' 
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  // Dynamic color based on percentage
  const getColorClass = (percent) => {
    if (percent >= 80) return 'bg-green-600';      // High progress - green
    if (percent >= 50) return 'bg-blue-600';       // Medium progress - blue
    if (percent >= 30) return 'bg-yellow-500';     // Low progress - yellow
    return 'bg-red-600';                           // Very low progress - red
  };

  return (
    <div className={`flex flex-col gap-2 w-full max-w-[25rem] sm:max-w-full ${className}`}>
      {label && <span className="text-gray-900 text-sm font-medium">{label}</span>}
      <div className="w-full h-3 min-h-5 bg-gray-200 rounded-md shadow-sm overflow-hidden">
        <div
          className={`h-full rounded-md transition-all duration-300 ease-in-out ${getColorClass(percentage)}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-gray-600 text-xs text-right sm:text-[0.75rem]">
        {Math.round(percentage)}%
      </span>
    </div>
  );
}
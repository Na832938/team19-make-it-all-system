export default function ProgressBar({ value = 0, max = 100, label }) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className="flex flex-col gap-2 w-full max-w-[25rem] sm:max-w-full">
      {label && <span className="text-gray-900 text-sm font-medium">{label}</span>}
      <div className="w-full h-3 min-h-5 bg-gray-200 rounded-md shadow-sm overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-md transition-all duration-300 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-gray-600 text-xs text-right sm:text-[0.75rem]">
        {Math.round(percentage)}%
      </span>
    </div>
  );
}
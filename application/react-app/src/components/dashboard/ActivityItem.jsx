// components/common/ActivityItem.jsx
export default function ActivityItem({ icon, iconBg, title, time }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
      <div className={`w-8 h-8 ${iconBg} rounded-full flex items-center justify-center`}>
        <span className="text-sm">{icon}</span>
      </div>
      <div>
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{time}</p>
      </div>
    </div>
  );
}
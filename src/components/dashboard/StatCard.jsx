// components/common/StatCard.jsx
import Card from "../common/Card.jsx";

export default function StatCard({ 
  title, 
  icon, 
  children, 
  variant = "default",
  padding = "medium",
  className = "" 
}) {
  return (
    <Card variant={variant} padding={padding} className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {icon}
      </div>
      {children}
    </Card>
  );
}
export default function ActivityItem({ icon, iconBg, title, time }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-[var(--surface-colour)] rounded-lg border border-[var(--border-neutral)]">
      <div className={`w-8 h-8 ${iconBg} rounded-full flex items-center justify-center`}>
        <span className="text-sm text-[var(--text-primary)]">{icon}</span>
      </div>
      <div>
        <p className="font-medium text-[var(--text-primary)]">{title}</p>
        <p className="text-sm text-[var(--text-secondary)]">{time}</p>
      </div>
    </div>
  );
}

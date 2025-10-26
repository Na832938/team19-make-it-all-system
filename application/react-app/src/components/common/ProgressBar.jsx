import './ProgressBar.css';

export default function ProgressBar({ value = 0, max = 100, label }) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className="progress-bar-wrapper">
      {label && <span className="progress-label">{label}</span>}
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="progress-percent">{Math.round(percentage)}%</span>
    </div>
  );
}

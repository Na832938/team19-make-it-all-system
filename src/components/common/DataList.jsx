// src/components/common/DataList.jsx
import ListSection from "./ListSection";

export default function DataList({
  items,
  type = "default", // 'task' | 'post' | 'topic' | 'default'
  onAction,
  title,
  emptyMessage,
  variant = "default",
  loading = false,
  className = ""
}) {

  const renderDetails = {
    task: (item) => (
      <div className="space-y-2">
        <h3 className="text-base font-medium text-[var(--text-primary)]">{item.title}</h3>
        <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            item.priority === 'High' ? 'bg-[var(--error-colour)] text-white' :
            item.priority === 'Medium' ? 'bg-[var(--danger-colour)] text-white' :
            'bg-[var(--success-colour)] text-white'
          }`}>
            {item.priority}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            item.status === 'Done' ? 'bg-[var(--success-colour)] text-white' :
            item.status === 'In Progress' ? 'bg-[var(--primary-colour)] text-white' :
            'bg-[var(--border-neutral)] text-[var(--text-primary)]'
          }`}>
            {item.status}
          </span>
          {item.dueDate && (
            <span className="text-[var(--text-secondary)]">
              Due: {new Date(item.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    ),
    
    post: (item) => (
      <div className="space-y-2">
        <h3 className="text-base font-medium text-[var(--text-primary)]">{item.title}</h3>
        <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{item.content}</p>
        <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)]">
          <span>By {item.author}</span>
          <span>{new Date(item.date).toLocaleDateString()}</span>
          {item.tags && item.tags.length > 0 && (
            <span>Tags: {item.tags.join(', ')}</span>
          )}
        </div>
      </div>
    ),
    
    topic: (item) => (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">{item.title}</h3>
        <p className="text-[var(--text-secondary)]">{item.description}</p>
      </div>
    ),
    
    default: (item) => (
      <div>
        <h3 className="text-base font-medium text-[var(--text-primary)] truncate">
          {item.title || item.name}
        </h3>
        {item.description && (
          <p className="text-sm text-[var(--text-secondary)] mt-1 line-clamp-2">
            {item.description}
          </p>
        )}
      </div>
    )
  };

  const renderActions = {
    task: (item) => (
      <>
        <button
          onClick={() => onAction?.('status', item)}
          className="px-3 py-2 text-sm rounded-md transition-colors bg-[var(--primary-colour)] text-white hover:brightness-90"
        >
          {item.status === 'To Do' ? 'Start' : 
           item.status === 'In Progress' ? 'Complete' : 'Reopen'}
        </button>
        <button
          onClick={() => onAction?.('delete', item)}
          className="px-3 py-2 text-sm rounded-md transition-colors bg-[var(--danger-colour)] text-white hover:brightness-90"
        >
          Delete
        </button>
      </>
    ),
    
    post: (item) => (
      <>
        <button
          onClick={() => onAction?.('view', item)}
          className="px-3 py-2 text-sm rounded-md transition-colors bg-[var(--secondary-colour)] text-[var(--text-primary)] hover:brightness-95"
        >
          View
        </button>
        <button
          onClick={() => onAction?.('edit', item)}
          className="px-3 py-2 text-sm rounded-md transition-colors bg-[var(--primary-colour)] text-white hover:brightness-90"
        >
          Edit
        </button>
        <button
          onClick={() => onAction?.('delete', item)}
          className="px-3 py-2 text-sm rounded-md transition-colors bg-[var(--danger-colour)] text-white hover:brightness-90"
        >
          Delete
        </button>
      </>
    ),
    
    topic: (item) => (
      <button
        onClick={() => onAction?.('select', item)}
        className="px-4 py-2 text-sm rounded-md transition-colors bg-[var(--primary-colour)] text-white hover:brightness-90"
      >
        Open
      </button>
    ),
    
    default: (item) => (
      <>
        <button
          onClick={() => onAction?.('view', item)}
          className="px-3 py-2 text-sm rounded-md transition-colors bg-[var(--secondary-colour)] text-[var(--text-primary)] hover:brightness-95"
        >
          View
        </button>
        <button
          onClick={() => onAction?.('edit', item)}
          className="px-3 py-2 text-sm rounded-md transition-colors bg-[var(--primary-colour)] text-white hover:brightness-90"
        >
          Edit
        </button>
      </>
    )
  };

  return (
    <ListSection
      title={title}
      items={items}
      variant={variant}
      loading={loading}
      className={className}
      emptyMessage={emptyMessage || `No ${type}s found.`}
      renderDetails={renderDetails[type] || renderDetails.default}
      renderActions={renderActions[type] || renderActions.default}
    />
  );
}

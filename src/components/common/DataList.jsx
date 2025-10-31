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
        <h3 className="text-base font-medium text-gray-900">{item.title}</h3>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            item.priority === 'High' ? 'bg-red-100 text-red-800' :
            item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}>
            {item.priority}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            item.status === 'Done' ? 'bg-green-100 text-green-800' :
            item.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {item.status}
          </span>
          {item.dueDate && (
            <span className="text-gray-500">
              Due: {new Date(item.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    ),
    
    post: (item) => (
      <div className="space-y-2">
        <h3 className="text-base font-medium text-gray-900">{item.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{item.content}</p>
        <div className="flex items-center gap-4 text-xs text-gray-500">
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
        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
        <p className="text-gray-600">{item.description}</p>
      </div>
    ),
    
    default: (item) => (
      <div>
        <h3 className="text-base font-medium text-gray-900 truncate">
          {item.title || item.name}
        </h3>
        {item.description && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
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
          className="px-3 py-2 text-sm bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
        >
          {item.status === 'To Do' ? 'Start' : 
           item.status === 'In Progress' ? 'Complete' : 'Reopen'}
        </button>
        <button
          onClick={() => onAction?.('delete', item)}
          className="px-3 py-2 text-sm bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
        >
          Delete
        </button>
      </>
    ),
    
    post: (item) => (
      <>
        <button
          onClick={() => onAction?.('view', item)}
          className="px-3 py-2 text-sm bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
        >
          View
        </button>
        <button
          onClick={() => onAction?.('edit', item)}
          className="px-3 py-2 text-sm bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onAction?.('delete', item)}
          className="px-3 py-2 text-sm bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
        >
          Delete
        </button>
      </>
    ),
    
    topic: (item) => (
      <button
        onClick={() => onAction?.('select', item)}
        className="px-4 py-2 text-sm bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
      >
        Open
      </button>
    ),
    
    default: (item) => (
      <>
        <button
          onClick={() => onAction?.('view', item)}
          className="px-3 py-2 text-sm bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
        >
          View
        </button>
        <button
          onClick={() => onAction?.('edit', item)}
          className="px-3 py-2 text-sm bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
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
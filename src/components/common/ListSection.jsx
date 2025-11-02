import React from "react";
import Button from "./Button.jsx";

export default function ListSection({
  title,
  items = [],
  iconUrl,
  renderDetails,
  renderActions,
  emptyMessage = "No items available.",
  variant = "default", // 'default' | 'compact' | 'bordered'
  loading = false,
  className = ""
}) {
  const variantStyles = {
    default: "space-y-3",
    compact: "space-y-2", 
    bordered: "divide-y divide-[var(--border-neutral)]"
  };

  const itemStyles = {
    default: "p-4 hover:bg-[var(--secondary-hover)] rounded-lg transition-colors duration-200",
    compact: "p-3 hover:bg-[var(--secondary-hover)] rounded-md transition-colors duration-200",
    bordered: "p-4 hover:bg-[var(--secondary-hover)] transition-colors duration-200"
  };

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-6 bg-[var(--border-neutral)] rounded w-1/4 mb-4"></div>
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center gap-4 p-4 border-b border-[var(--border-neutral)] last:border-b-0">
            <div className="w-10 h-10 bg-[var(--border-neutral)] rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-[var(--border-neutral)] rounded w-3/4"></div>
              <div className="h-3 bg-[var(--border-neutral)] rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">{title}</h2>
          {items.length > 0 && (
            <span className="px-2.5 py-1 bg-blue-900/30 text-blue-100 text-sm font-medium rounded-full">
              {items.length}
            </span>
          )}
        </div>
        
        {items.length > 0 && (
          <p className="text-sm text-[var(--text-secondary)] sm:text-right">
            {items.length} item{items.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Content */}
      {items.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-[var(--border-neutral)] rounded-full flex items-center justify-center">
            <span className="text-2xl">📝</span>
          </div>
          <p className="text-[var(--text-primary)] text-lg font-medium mb-2">No items found</p>
          <p className="text-[var(--text-secondary)] text-sm">{emptyMessage}</p>
        </div>
      ) : (
        <div className={variantStyles[variant]}>
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className={`flex items-center gap-4 ${itemStyles[variant]} ${
                variant === 'bordered' ? 'border-b border-[var(--border-neutral)] last:border-b-0' : ''
              }`}
            >
              {/* Icon/Image */}
              {iconUrl && (
                <div className="flex-shrink-0">
                  <img
                    className="w-10 h-10 rounded-lg object-cover border border-[var(--border-neutral)]"
                    src={iconUrl}
                    alt=""
                  />
                </div>
              )}

              {/* Details */}
              <div className="flex-1 min-w-0 text-[var(--text-primary)]">
                {renderDetails ? (
                  renderDetails(item)
                ) : (
                  <div>
                    <h3 className="text-base font-medium truncate">
                      {item.title || item.name}
                    </h3>
                    {item.description && (
                      <p className="text-sm mt-1 line-clamp-2 text-[var(--text-secondary)]">
                        {item.description}
                      </p>
                    )}
                    {item.date && (
                      <p className="text-xs mt-2 text-[var(--text-secondary)]">
                        {new Date(item.date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {renderActions ? (
                  renderActions(item)
                ) : (
                  <>
                    <Button
                      type="secondary"
                      size="small"
                      className="!min-w-0 !px-3 !py-2"
                      onClick={() => console.log('View', item)}
                    >
                      👁️
                    </Button>
                    <Button
                      type="secondary"
                      size="small"
                      className="!min-w-0 !px-3 !py-2"
                      onClick={() => console.log('Edit', item)}
                    >
                      ✏️
                    </Button>
                    <Button
                      type="danger"
                      size="small"
                      className="!min-w-0 !px-3 !py-2"
                      onClick={() => console.log('Delete', item)}
                    >
                      🗑️
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

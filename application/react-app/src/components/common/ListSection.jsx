import React from "react";
import Card from "./Card.jsx";
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
    bordered: "divide-y divide-gray-200"
  };

  const itemStyles = {
    default: "p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200",
    compact: "p-3 hover:bg-gray-50 rounded-md transition-colors duration-200",
    bordered: "p-4 hover:bg-gray-50 transition-colors duration-200"
  };

  if (loading) {
    return (
      <Card variant="flat" className={className}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-4 p-4 border-b border-gray-200 last:border-b-0">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card variant="flat" className={className}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          {items.length > 0 && (
            <span className="px-2.5 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {items.length}
            </span>
          )}
        </div>
        
        {items.length > 0 && (
          <p className="text-sm text-gray-600 sm:text-right">
            {items.length} item{items.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Content */}
      {items.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">📝</span>
          </div>
          <p className="text-gray-600 text-lg font-medium mb-2">No items found</p>
          <p className="text-gray-500 text-sm">{emptyMessage}</p>
        </div>
      ) : (
        <div className={variantStyles[variant]}>
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className={`flex items-center gap-4 ${itemStyles[variant]} ${
                variant === 'bordered' ? 'border-b border-gray-200 last:border-b-0' : ''
              }`}
            >
              {/* Icon/Image */}
              {iconUrl && (
                <div className="flex-shrink-0">
                  <img
                    className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                    src={iconUrl}
                    alt=""
                  />
                </div>
              )}

              {/* Details */}
              <div className="flex-1 min-w-0">
                {renderDetails ? (
                  renderDetails(item)
                ) : (
                  <div>
                    <h3 className="text-base font-medium text-gray-900 truncate">
                      {item.title || item.name}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    {item.date && (
                      <p className="text-xs text-gray-500 mt-2">
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
    </Card>
  );
}
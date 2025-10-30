import React from "react";
import './ListSection.css';

export default function ListSection({
  title,
  items = [],
  iconUrl,
  renderDetails,
  renderActions,
  emptyMessage = "No items available.",
}) {
  if (items.length === 0) {
    return (
      <div className="list-empty">
        {emptyMessage}
      </div>
    );
  }

  return (
    <section className="list-section">
      <header className="list-section-header">
        <h2>
          {title}
        </h2>
        <p className="list-count">
          {items.length} items
        </p>
      </header>

      <div className="list-card">
        {items.map((item) => (
          <div
            key={item.id}
            className="list-row"
          >
            {iconUrl && (
              <div className="list-icon">
                <img
                  src={iconUrl}
                  alt="Item icon"
                />
              </div>
            )}

            <div className="list-details">
              {renderDetails(item)}
            </div>

            <div className="list-actions">
              {renderActions ? (
                renderActions(item)
              ) : (
                <>
                  <button
                    className="icon-button"
                    title="View"
                  >
                    <i className="ph-eye"></i>
                  </button>
                  <button
                    className="icon-button"
                    title="Edit"
                  >
                    <i className="ph-pencil"></i>
                  </button>
                  <button
                    className="icon-button"
                    title="Delete"
                  >
                    <i className="ph-trash"></i>
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

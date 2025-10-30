import React from "react";
import "./ListSection.css";

export default function ListSection({
  title,
  items = [],
  iconUrl,
  renderDetails,
  renderActions,
  emptyMessage = "No items available.",
}) {
  return (
    <section className="list-section">
      <header className="list-section-header">
        <h2>{title}</h2>
        <p className="list-count">{items.length} items</p>
      </header>

      {items.length === 0 ? (
        <div className="list-empty">{emptyMessage}</div>
      ) : (
        <ul className="list-body">
          {items.map((item) => (
            <li key={item.id} className="list-item">
              {iconUrl && (
                <img className="list-icon" src={iconUrl} alt="" />
              )}
              <div className="list-details">{renderDetails(item)}</div>
              <div className="list-actions">
                {renderActions ? (
                  renderActions(item)
                ) : (
                  <>
                    <button className="icon-button" title="View">
                      <i className="ph-eye"></i>
                    </button>
                    <button className="icon-button" title="Edit">
                      <i className="ph-pencil"></i>
                    </button>
                    <button className="icon-button" title="Delete">
                      <i className="ph-trash"></i>
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

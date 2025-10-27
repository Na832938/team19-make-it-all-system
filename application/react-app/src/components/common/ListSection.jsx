// ListSection.jsx
import "./ListSection.css";

export default function ListSection({
  title,
  items,
  iconUrl,
  renderDetails,
  renderActions,
  emptyMessage,
}) {
  if (!items || items.length === 0) {
    return <div className="no-items">{emptyMessage}</div>;
  }

  return (
    <section className="list-section">
      <div className="list-section-header">
        <h2>{title}</h2>
        <div className="list-filter-info">
          <p>{items.length} items</p>
        </div>
      </div>

      <div className="list-card">
        <div className="list">
          {items.map((item) => (
            <div key={item.id} className="list-row">
              <div className="list-icon">
                <img src={iconUrl} alt="List icon" />
              </div>

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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import "./TopicList.css";

export default function TopicList({ topics, onSelect }) {
  if (!topics || topics.length === 0) {
    return <div className="no-topics">No topics available.</div>;
  }

  return (
    <section className="topic-section">
      <div className="topic-section-header">
        <h2>Available Topics</h2>
        <div className="topic-filter-options">
          <p>{topics.length} total topics</p>
        </div>
      </div>

        <div className="topic-list-table">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="topic-row"
              onClick={() => onSelect(topic.title)}
            >
              <div className="topic-icon">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
                  alt="Topic Icon"
                />
              </div>
              <dl className="topic-details">
                <div>
                  <dt>{topic.title}</dt>
                  <dd>{topic.description}</dd>
                </div>
              </dl>
              <div className="topic-action">
                <span className="topic-link">Open</span>
                <button className="icon-button">
                  <i className="ph-caret-right-bold"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
    </section>
  );
}

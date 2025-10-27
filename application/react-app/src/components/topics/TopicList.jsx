// TopicList.jsx
import ListSection from "../common/ListSection";

export default function TopicList({ topics, onSelect }) {
  return (
    <ListSection
      title="Available Topics"
      items={topics}
      iconUrl="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
      emptyMessage="No topics available."
      renderDetails={(topic) => (
        <dl className="topic-details">
          <div>
            <dt>{topic.title}</dt>
            <dd>{topic.description}</dd>
          </div>
        </dl>
      )}
      renderActions={(topic) => (
        <div className="topic-action">
          <span className="topic-link">Open</span>
          <button
            className="icon-button"
            onClick={() => onSelect(topic.title)}
            title="Open Topic"
          >
            <i className="ph-caret-right-bold"></i>
          </button>
        </div>
      )}
    />
  );
}

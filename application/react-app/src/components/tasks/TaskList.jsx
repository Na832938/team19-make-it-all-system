// TopicList.jsx
import ListSection from "../common/ListSection";

export default function TopicList({ topics, onSelect }) {
  return (
    <ListSection
      title="Available Topics"
      items={topics}
      iconUrl="https://cdn-icons-png.flaticon.com/512/4727/4727490.png"
      emptyMessage="No topics available."
      renderDetails={(topic) => (
        <>
          <dt>{topic.name}</dt>
          <dd>{topic.description}</dd>
        </>
      )}
      renderActions={(topic) => (
        <button
          className="icon-button"
          onClick={() => onSelect(topic.id)}
          title="Open Topic"
        >
          <i className="ph-arrow-right-circle"></i>
        </button>
      )}
    />
  );
}

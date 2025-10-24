import "./TopicItem.css";

export default function TopicItem({ topic, onSelect }) {
  return (
    <div className="topic-item">
      <div className="topic-title">{topic.title}</div>
      <div className="topic-description">{topic.description}</div>
      <button onClick={() => onSelect(topic.title)}>Go to Topic</button>
    </div>
  );
}

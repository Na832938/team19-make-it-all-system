import "./TopicList.css";
import TopicItem from "./TopicItem";

export default function TopicList({ topics, onSelect }) {
  if (topics.length === 0) {
    return <p className="no-topics">No topics available.</p>;
  }

  return (
    <div className="topic-list">
      {topics.map((topic) => (
        <TopicItem key={topic.id} topic={topic} onSelect={onSelect} />
      ))}
    </div>
  );
}

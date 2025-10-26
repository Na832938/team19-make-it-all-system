import "./TopicItem.css";
import {Button} from '../common';

export default function TopicItem({ topic, onSelect }) {
  return (
    <div className="topic-item">
      <div className="topic-title">{topic.title}</div>
      <div className="topic-description">{topic.description}</div>
      <Button onClick={() => onSelect(topic.title)}>Go to Topic</Button>
    </div>
  );
}

import { useState } from "react";
import TopicForm from "./TopicForm";
import TopicList from "./TopicList";
import Card from "../common/Card";

export default function TopicPage() {
  const [topics, setTopics] = useState([
    { id: 1, title: "Software Development", description: "This topic gives you Software Development tips" },
    { id: 2, title: "Software Issues", description: "This topic contains common software issues and solutions" },
    { id: 3, title: "Printing", description: "This topic helps you with anything related to printing" }
  ]);

  const handleCreateTopic = (topic) => {
    setTopics((prev) => [...prev, topic]);
  };

  const handleSelectTopic = (title) => {
    alert(`Selected topic: ${title}`);
  };

  return (
    <div className="topic-page">
      <div className="dashboard-grid">
        <div>
          <h2>Create Topic</h2>
          <TopicForm onCreate={handleCreateTopic} />
        </div>

        <Card className="card-vertical full-width-card">
          <h2>Topics</h2>
          <TopicList topics={topics} onSelect={handleSelectTopic} />
        </Card>
      </div>
    </div>
  );
}

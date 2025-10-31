import { useState } from "react";
import TopicForm from "./TopicForm";
import Card from "../common/Card";
import topicsData from "../../data/topics.json";
import DataList from "../common/DataList";

export default function TopicPage() {
  const [topics, setTopics] = useState(topicsData);

  const handleCreateTopic = async (topicData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTopic = {
          ...topicData,
          id: Date.now()
        };
        setTopics(prev => [...prev, newTopic]);
        resolve(newTopic);
      }, 500);
    });
  };

  const handleSelectTopic = (topic) => {
    alert(`Selected topic: ${topic.title}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Topics</h1>
          <p className="text-gray-600 mt-2">Discuss and explore various topics with your team</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="p-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Create Topic</h2>
                <TopicForm onSubmit={handleCreateTopic} />
              </div>
            </Card>
          </div>

          <div className="md:col-span-2">
            <div className="space-y-6">
            
              <DataList
                type="topic"
                items={topics}
                title="Discussion Topics"
                onAction={(action, topic) => {
                  if (action === 'select') handleSelectTopic(topic);
                }}
                variant="bordered"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
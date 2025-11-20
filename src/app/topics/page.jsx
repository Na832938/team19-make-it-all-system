'use client';

import { useState } from "react";
import TopicForm from "../../components/topics/TopicForm";
import Card from "../../components/common/Card";
import topicsData from "../../data/topics.json";
import DataList from "../../components/common/DataList";
import ProtectedRoute from "../../components/ProtectedRoute.js";

/**
 * TopicsPage
 * 
 * Team 19 - Make It All System
 * 
 * Route: /topics
 * Displays knowledge base topics
 * 
 * @returns {JSX.Element} The topics page component.
 */
function TopicsContent() {
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
    <div className="min-h-screen bg-[var(--surface-colour)] dark:bg-[var(--surface-colour)] py-6">
      <div className="max-w-8xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] dark:text-[var(--text-primary)]">Topics</h1>
          <p className="text-[var(--text-secondary)] dark:text-[var(--text-secondary)] mt-2">
            Discuss and explore various topics with your team
          </p>
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

export default function TopicsPage() {
  return (
    <ProtectedRoute>
      <TopicsContent />
    </ProtectedRoute>
  );
}

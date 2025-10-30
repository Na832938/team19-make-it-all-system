import { useState } from 'react';
import TopicForm from "../topics/TopicForm";
import TopicList from "../topics/TopicList";

export default function KnowledgeBase() {

  const [subject, setSubjects] = useState([
    { id: 1, Question: "How to order printing paper ?", description: "Just send an email to HR " },
    { id: 2, Question: "How to configure my microsoft account ?", description: "This should already be done. If you have any issues please contact IT support." },
    { id: 3, Question: "When are salaries paid out ?", description: "On the 25th of each month." }
  ]);

  const handleCreateSubject = (subject) => {
    setSubjects((prev) => [...prev, subject]);
  }

  const handleSelectSubject = (Question) => {
    alert(`Selected topic: ${Question}`);
  };

  return (
    <div className="topic-page">
      <h2>Subjects</h2>
      <TopicForm onCreate={handleCreateSubject} />
      <TopicList topics={subject} onSelect={handleSelectSubject} />
    </div>
  );
}
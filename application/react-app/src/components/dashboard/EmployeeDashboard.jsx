// src/components/dashboard/EmployeeDashboard.jsx
import { useState } from "react";
import { ProgressBar } from "../common";
import TodoPage from "../tasks/TodoPage.jsx";
import "./EmployeeDashboard.css";
import TopicForm from "../topics/TopicForm.jsx";
import PostList from "../posts/PostList.jsx"; // if available

export default function EmployeeDashboard() {
  const [employee] = useState({
    name: "John Doe",
    position: "Software Engineer",
    department: "Development",
  });

  const [tasks] = useState([
    { title: "Finish report", completed: true },
    { title: "Attend team meeting", completed: false },
    { title: "Update project plan", completed: true },
    { title: "Review code", completed: false },
  ]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const [topic, setTopic] = useState("");
  const [post, setPost] = useState("");

  const handlePost = () => {
    if (!topic.trim() || !post.trim()) return;
    setTopic("");
    setPost("");
  };

  const [topics, setTopics] = useState([]);
  const [posts, setPosts] = useState([]);

  const handleCreateTopic = (topic) => setTopics(prev => [...prev, topic]);
  const handleCreatePost = (post) => setPosts(prev => [post, ...prev]);


  return (
    <div className="dashboard-container vertical-center">
      <div className="horizontal-center">
        <h1 className="dashboard-header">Employee Dashboard</h1>

        {/* Progress Card */}
        <div className="card-container card-vertical">
          <h2>Task Completion Progress</h2>
          <ProgressBar value={progress} label={`${progress}%`} />
        </div>

        {/* Employee Info */}
        <div className="card-container card-vertical">
          <h2>Employee Information</h2>
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Position:</strong> {employee.position}</p>
          <p><strong>Department:</strong> {employee.department}</p>
        </div>

        {/* Task Overview */}
        <div className="card-container card-vertical">
          <h2>Task Overview</h2>
          <p>You have {totalTasks} tasks assigned.</p>
          <ul>
            {tasks.map((t, i) => (
              <li key={i}>
                {t.title} — {t.completed ? "Done" : "Pending"}
              </li>
            ))}
          </ul>
        </div>

        {/* Topic / Post Section */}
        <div className="card card-vertical">
          <h2>Topic & Post Sharing</h2>
            <TopicForm onCreate={handleCreateTopic} />
            <PostList posts={posts} />
        </div>


        {/* Task Management */}
        <div className="card-container card-vertical">
          <h2>Detailed Task Management</h2>
          <TodoPage />
        </div>
      </div>
    </div>
  );
}

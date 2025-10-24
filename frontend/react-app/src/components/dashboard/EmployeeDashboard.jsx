import { useState } from "react";
import TodoPage from "../tasks/TodoPage.jsx";
import "./EmployeeDashboard.css";

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

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Employee Dashboard</h1>

      <div className="card">
        <h2>Task Completion Progress</h2>
        <div className="progress-bar">{progress}%</div>
      </div>

      <div className="card">
        <h2>Employee Information</h2>
        <p>
          <strong>Name:</strong> {employee.name}
        </p>
        <p>
          <strong>Position:</strong> {employee.position}
        </p>
        <p>
          <strong>Department:</strong> {employee.department}
        </p>
      </div>

      <div className="card">
        <h2>Task Overview</h2>
        <p>You have {totalTasks} tasks assigned.</p>
        <ul>
          {tasks.map((t, i) => (
            <li key={i}>
              {t.title} – {t.completed ? "Done" : "Pending"}
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2>Topic & Post Sharing</h2>
        <input
          type="text"
          placeholder="Enter topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <textarea
          rows="3"
          placeholder="Write your post"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
        <button onClick={handlePost}>Share</button>
      </div>

      <div className="card">
        <h2>Detailed Task Management</h2>
        <TodoPage />
      </div>
    </div>
  );
}

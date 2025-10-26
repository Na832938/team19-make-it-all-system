// src/components/dashboard/EmployeeDashboard.jsx
import { useState } from "react";
import { ProgressBar, Card } from "../common";
import TodoPage from "../tasks/TodoPage.jsx";
import TopicForm from "../topics/TopicForm.jsx";
import PostList from "../posts/PostList.jsx";
import TaskForm from "../tasks/TaskForm.jsx";
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
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const [topics, setTopics] = useState([]);
  const [posts, setPosts] = useState([]);

  const handleCreateTopic = (topic) => setTopics(prev => [...prev, topic]);
  const handleCreatePost = (post) => setPosts(prev => [post, ...prev]);

  return (
    <div className="dashboard-container vertical-center">
      <div className="grid-container">
        <Card vertical={true}>
          <h2>Task Completion Progress</h2>
          <ProgressBar value={progress} label={`${progress}%`} />
        </Card>

        <Card vertical={true}>
          <h2>Employee Information</h2>
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Position:</strong> {employee.position}</p>
          <p><strong>Department:</strong> {employee.department}</p>
        </Card>

        <Card vertical={true}>
          <h2>Task Overview</h2>
          <p>You have {totalTasks} tasks assigned.</p>
          <ul>
            {tasks.map((t, i) => (
              <li key={i}>{t.title} — {t.completed ? "Done" : "Pending"}</li>
            ))}
          </ul>
        </Card>

        
          <Card vertical={true}>
            <h2>Topic & Post Sharing</h2>
            <TopicForm onCreate={handleCreateTopic} />
          </Card>
       

          <Card vertical={true}>
            <h2>Task Creation</h2>
            <TaskForm onCreate={handleCreateTopic} />
          </Card>
        

        <Card vertical={true}>
          <h2> Posts </h2>
          <PostList posts={posts} />
        </Card>

        <Card vertical={false} className="full-width-card">
          <h2>Detailed Task Management</h2>
          <TodoPage />
        </Card>
        
      </div>
    </div>
  );
}

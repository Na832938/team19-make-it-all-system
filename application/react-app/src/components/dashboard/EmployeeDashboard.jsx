import { useState, useEffect } from "react";
import { Card, ProgressBar, Button } from "../common";
import TodoPage from "../tasks/TodoPage.jsx";
import TopicPage from "../topics/TopicPage.jsx";
import PostPage from "../posts/PostPage.jsx";
import KnowledgeBase from "../knowledge-base/KnowledgeBase.jsx";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import "./EmployeeDashboard.css";

export default function EmployeeDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setEmployee(JSON.parse(storedUser));
    } else {
      window.location.href = "/";
    }
  }, []);

  if (!employee) {

    return <div>Loading...</div>;
    
  } else {
    console.log("Logged in user:", employee);
  }

  const tasks = [
    { title: "Finish report", completed: true },
    { title: "Attend team meeting", completed: false },
    { title: "Update project plan", completed: true },
    { title: "Review code", completed: false },
  ];

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const progress = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="app">
      <Navbar user={employee} />

      <div className="app-body">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

        <main className="app-body-main-content">
          {activeSection === "dashboard" && (
            <section className="dashboard-grid">
              <Card className="tile">
                <div className="tile-header">
                  <h3>Employee Info</h3>
                </div>
                <ul>
                  <li><strong>Name:</strong> {employee.username}</li>
                  <li><strong>Role:</strong> {employee.role}</li>
                  <li><strong>Email:</strong> {employee.email}</li>
                </ul>
              </Card>

              <Card className="tile">
                <div className="tile-header">
                  <h3>Task Overview</h3>
                </div>
                <ul>
                  {tasks.map((task, idx) => (
                    <li key={idx}>{task.title} — {task.completed ? "Done" : "Pending"}</li>
                  ))}
                </ul>
              </Card>

              <Card className="tile">
                <div className="tile-header">
                  <h3>Task Completion</h3>
                  <span>{progress}%</span>
                </div>
                <ProgressBar value={progress} label={`${progress}%`} />
                <p>Completed: {completedTasks}</p>
                <p>Pending: {totalTasks - completedTasks}</p>
              </Card>
            </section>
          )}

          {activeSection === "todo" && <TodoPage />}
          {activeSection === "topics" && <TopicPage />}
          {activeSection === "posts" && <PostPage />}
          {activeSection === "KnowledgeBase" && <KnowledgeBase />}
        </main>

        <aside className="app-body-sidebar">
          <section className="right-panel">
            <h2>Quick Actions</h2>
            <div className="action-buttons">
              <Button className="primary">Add Task</Button>
              <Button className="secondary">View Reports</Button>
            </div>
          </section>
        </aside>
      </div>

      <Footer />
    </div>
  );
}

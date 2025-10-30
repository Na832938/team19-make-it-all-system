import { useState } from "react";

import { ProgressBar, Card } from "../common";

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


  const employee = {
    name: "John Doe",
    position: "Software Engineer",
    department: "Development",
  };


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

        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />


        <main className="app-body-main-content">

          {activeSection === "dashboard" && (
            <div className="dashboard-grid">

              <Card>
                <h2>Employee Information</h2>
                <p><strong>Name:</strong> {employee.name}</p>
                <p><strong>Position:</strong> {employee.position}</p>
                <p><strong>Department:</strong> {employee.department}</p>
              </Card>


              <Card>
                <h2>Task Overview</h2>
                <p>You have {totalTasks} tasks assigned.</p>
                <ul>
                  {tasks.map((task, idx) => (
                    <li key={idx}>
                      {task.title} — {task.completed ? "Done" : "Pending"}
                    </li>
                  ))}
                </ul>
              </Card>


              <Card>
                <h2>Task Completion & Metrics</h2>
                <ProgressBar value={progress} label={`${progress}%`} />
                <p>Completed Tasks: {completedTasks}</p>
                <p>Pending Tasks: {totalTasks - completedTasks}</p>
              </Card>

            </div>
          )}


          {activeSection === "todo" && <TodoPage />}
          {activeSection === "topics" && <TopicPage />}
          {activeSection === "posts" && <PostPage />}
          {activeSection === "KnowledgeBase" && <KnowledgeBase />}

        </main>

      </div>

      <Footer />

    </div>
  );

}

import { useState, useEffect } from "react";
import TodoPage from "../tasks/TodoPage.jsx";
import TopicPage from "../topics/TopicPage.jsx";
import PostPage from "../posts/PostPage.jsx";
import KnowledgeBase from "../knowledge-base/KnowledgeBase.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Sidebar from "./Sidebar.jsx";
import MobileHeader from "./MobileHeader.jsx";
import Card from "../common/Card.jsx";
import ProgressBar from "../common/ProgressBar.jsx";
import Button from "../common/Button.jsx";
import tasks from "../../data/tasks.json";

export default function EmployeeDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [employee, setEmployee] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setEmployee(JSON.parse(storedUser));
    } else {
      window.location.href = "/";
    }
  }, []);

  if (!employee) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "Completed").length;
  const progress = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar user={employee} />
      <MobileHeader onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main Content Area */}
      <div className="flex flex-1 pt-16 lg:pt-0">
        {/* Sidebar */}
        <Sidebar 
  activeSection={activeSection} 
  setActiveSection={setActiveSection}
  isSidebarOpen={isSidebarOpen}
  onClose={() => setIsSidebarOpen(false)}
/>
        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-4 lg:p-6 min-h-screen">
          {activeSection === "dashboard" && (
            <div className="space-y-6">
              {/* Your dashboard content remains the same */}
              <Card className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome back, {employee.username}!
                </h1>
                <p className="text-gray-600">Here's your overview for today.</p>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Your cards remain the same */}
              </div>
            </div>
          )}

          {/* Page Content */}
          <div className="mt-6">
            {activeSection === "todo" && <TodoPage />}
            {activeSection === "topics" && <TopicPage />}
            {activeSection === "posts" && <PostPage />}
            {activeSection === "KnowledgeBase" && <KnowledgeBase />}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
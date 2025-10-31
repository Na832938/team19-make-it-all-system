import { useState, useEffect } from "react";
import TodoPage from "../tasks/TodoPage.jsx";
import TopicPage from "../topics/TopicPage.jsx";
import PostPage from "../posts/PostPage.jsx";
import KnowledgeBase from "../knowledge-base/KnowledgeBase.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import DashboardTabs from "./MobileHeader.jsx"; // ← NEW IMPORT
import Card from "../common/Card.jsx";
import ProgressBar from "../common/ProgressBar.jsx";
import Button from "../common/Button.jsx";
import tasks from "../../data/tasks.json";

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

      {/* Main Content Area - REMOVED SIDEBAR */}
      <div className="flex-1 pt-16">
        {/* Main Content */}
        <main className="p-6">
          {/* ADD TABS HERE */}
          <DashboardTabs 
            activeSection={activeSection} 
            setActiveSection={setActiveSection} 
          />

          {activeSection === "dashboard" && (
            <div className="space-y-6">
              {/* Welcome Header */}
              <Card className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome back, {employee.username}!
                </h1>
                <p className="text-gray-600">
                  Here's your overview for today.
                </p>
              </Card>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Employee Info Card */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Employee Info</h3>
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">
                        {employee.role.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Name:</span>
                      <span className="text-gray-900 font-semibold">{employee.username}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Role:</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">
                        {employee.role}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Email:</span>
                      <span className="text-gray-900">{employee.email}</span>
                    </div>
                  </div>
                </Card>

                {/* Task Overview Card */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Task Overview</h3>
                    <span className="text-sm text-gray-500">{tasks.length} tasks</span>
                  </div>
                  <div className="space-y-3">
                    {tasks.map((task, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className={`flex-1 ${task.status === "Completed" ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                          {task.title}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          task.status === "Completed" 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {task.status === "Completed" ? "Done" : task.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Progress Card */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Task Completion</h3>
                    <span className="text-2xl font-bold text-blue-600">{progress}%</span>
                  </div>
                  
                  <ProgressBar value={progress} />
                  
                  <div className="grid grid-cols-2 gap-4 text-center mt-4">
                    <div>
                      <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
                      <p className="text-sm text-gray-600">Completed</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-600">{totalTasks - completedTasks}</p>
                      <p className="text-sm text-gray-600">Pending</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Quick Actions Row */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button type="primary" className="flex items-center justify-center gap-2 py-3">
                    <span>➕</span>
                    Add Task
                  </Button>
                  <Button type="secondary" className="flex items-center justify-center gap-2 py-3">
                    <span>📊</span>
                    View Reports
                  </Button>
                  <Button type="primary" className="flex items-center justify-center gap-2 py-3 bg-purple-600 hover:bg-purple-700">
                    <span>💬</span>
                    New Topic
                  </Button>
                  <Button type="primary" className="flex items-center justify-center gap-2 py-3 bg-orange-600 hover:bg-orange-700">
                    <span>📚</span>
                    Knowledge Base
                  </Button>
                </div>
              </Card>
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
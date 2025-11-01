import { useState, useEffect } from "react";
import TodoPage from "../tasks/TodoPage.jsx";
import TopicPage from "../topics/TopicPage.jsx";
import PostPage from "../posts/PostPage.jsx";
import KnowledgeBase from "../knowledge-base/KnowledgeBase.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Sidebar from "./Sidebar.jsx";
import MobileSidebar from "./MobileSidebar.jsx";
import Card from "../common/Card.jsx";
import StatCard from "./StatCard.jsx";
import ActivityItem from "./ActivityItem.jsx";
import LoadingScreen from "../common/LoadingScreen.jsx";
import ProgressBar from "../common/ProgressBar.jsx";
import Button from "../common/Button.jsx";
import tasks from "../../data/tasks.json";

import {
  FaComments,
  FaBook,
  FaPlus,
  FaChartBar
} from 'react-icons/fa';

export default function EmployeeDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [employee, setEmployee] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setEmployee(JSON.parse(storedUser));
      } else {
      window.location.href = "/";
    }
    const userData = JSON.parse(storedUser);
    document.title = `Employee - ` + `${userData.username}`;
  }, []);

  if (!employee) {
    return <LoadingScreen />;
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "Completed").length;
  const progress = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const employeeIcon = (
    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
      <span className="text-blue-600 font-semibold text-sm">
        {employee.role.charAt(0)}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar 
        user={employee} 
        onMobileMenuToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />

      <div className="flex flex-1">
        <div className="hidden lg:block w-64 bg-white border-r border-gray-200">
          <Sidebar 
            activeSection={activeSection} 
            setActiveSection={setActiveSection}
          />
        </div>

        <MobileSidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />

        <main className="flex-1 lg:ml-2 p-4 lg:p-6 min-h-[calc(100vh-5rem)]">
          {activeSection === "dashboard" && (
            <div className="space-y-6 pb-8">
              <Card className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome back, {employee.username}!
                </h1>
                <p className="text-gray-600">
                  Here's your overview for today.
                </p>
              </Card>

              {/* Stats Grid - Keep the original responsive layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <StatCard title="Employee Info" icon={employeeIcon}>
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
                </StatCard>

                <StatCard 
                  title="Task Overview" 
                  icon={<span className="text-sm text-gray-500">{tasks.length} tasks</span>}
                >
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
                </StatCard>

                <StatCard 
                  title="Task Completion" 
                  icon={<span className="text-2xl font-bold text-blue-600">{progress}%</span>}
                >
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
                </StatCard>
              </div>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button type="green" className="flex items-center justify-center gap-2">
                    <FaPlus className="w-4 h-4" />
                    Add Task
                  </Button>
                  <Button type="gray" className="flex items-center justify-center gap-2">
                    <FaChartBar className="w-4 h-4" />
                    View Reports
                  </Button>
                  <Button type="purple" className="flex items-center justify-center gap-2">
                    <FaComments className="w-4 h-4" />
                    New Topic
                  </Button>
                  <Button type="orange" className="flex items-center justify-center gap-2">
                    <FaBook className="w-4 h-4" />
                    Knowledge Base
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <ActivityItem 
                    icon="✓"
                    iconBg="bg-green-100"
                    title="Completed project proposal"
                    time="2 hours ago"
                  />
                  <ActivityItem 
                    icon="+"
                    iconBg="bg-blue-100"
                    title="Added new task"
                    time="4 hours ago"
                  />
                  <ActivityItem 
                    icon="⚡"
                    iconBg="bg-yellow-100"
                    title="Started design mockups"
                    time="1 day ago"
                  />
                </div>
              </Card>
            </div>
          )}

          <div className="mt-6 pb-24">
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
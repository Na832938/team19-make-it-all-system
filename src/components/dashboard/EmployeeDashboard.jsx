import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/AuthContext";
import Navbar from "./Header.jsx";
import Footer from "./Footer.jsx";
import Sidebar from "./Sidebar.jsx";
import MobileSidebar from "./MobileSidebar.jsx";
import Card from "../common/Card.jsx";
import StatCard from "./StatCard.jsx";
import LoadingScreen from "../common/LoadingScreen.jsx";
import ProgressBar from "../common/ProgressBar.jsx";
import Button from "../common/Button.jsx";
import Badge from "../common/Badge.jsx";
import tasks from "../../data/tasks.json";

import {
  FaComments,
  FaBook,
  FaPlus,
  FaChartBar
} from 'react-icons/fa';

/**
 * EmployeeDashboard.jsx
 * 
 * Team 19 - Make It All System
 * 
 * Purpose: Main dashboard overview for employee users
 * Features:
 * - Welcome greeting with user info
 * - Quick actions with navigation links
 * - Stats display for task progress
 * - Mobile-responsive sidebar navigation
 * - Routes to separate pages for tasks, topics, posts, knowledge base
 * 
 * @returns {JSX.Element} The employee dashboard component.
 */
export default function EmployeeDashboard() {
  const router = useRouter();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <LoadingScreen />;
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "Completed").length;
  const progress = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const employeeIcon = (
    <div className="w-10 h-10 bg-[var(--secondary-colour)] rounded-lg flex items-center justify-center">
      <span className="text-[var(--primary-colour)] font-semibold text-sm">
        {user.role.charAt(0)}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--surface-colour)] flex flex-col text-[var(--text-primary)]">
      <Navbar 
        user={user} 
        onMobileMenuToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />

      <div className="flex flex-1">
        <div className="hidden lg:block w-64 bg-[var(--secondary-colour)] border-r border-[var(--border-neutral)]">
          <Sidebar />
        </div>

        <MobileSidebar 
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />

        <main className="flex-1 lg:ml-2 p-4 lg:p-6 min-h-[calc(100vh-5rem)]">
          <div className="space-y-6 pb-8">
            <Card className="p-6">
              <h1 className="text-2xl font-bold mb-2">
                Welcome back, {user.username}!
              </h1>
              <p className="text-[var(--text-secondary)]">
                Here's your overview for today.
              </p>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] gap-4 md:gap-6 lg:[&>*:nth-child(1)]:row-span-2 lg:[&>*:nth-child(3)]:col-start-2 lg:[&>*:nth-child(3)]:row-start-1">

              <StatCard title="Employee Info" icon={employeeIcon}>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-[var(--text-secondary)]">Name:</span>
                    <span className="font-semibold">{user.username}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-[var(--text-secondary)]">Role:</span>
                    <Badge text={user.role} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-[var(--text-secondary)]">Email:</span>
                    <span>{user.email}</span>
                  </div>
                </div>
              </StatCard>

              <StatCard 
                title="Task Overview" 
                icon={<span className="text-sm text-[var(--text-secondary)]">{tasks.length} tasks</span>}
              >
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {tasks.slice(0, 5).map((task, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className={`flex-1 text-sm ${task.status === "Completed" ? 'line-through text-[var(--text-secondary)]' : ''}`}>
                        {task.title}
                      </span>
                      <Badge 
                        text={task.status === "Completed" ? "Done" : task.status}
                        bg={task.status === "Completed" ? "green" : "orange"}
                      />
                    </div>
                  ))}
                </div>
              </StatCard>

              <StatCard 
                title="Task Completion" 
                icon={<span className="text-2xl font-bold text-[var(--primary-colour)]">{progress}%</span>}
              >
                <ProgressBar value={progress} />
                
                <div className="grid grid-cols-2 gap-4 text-center mt-4">
                  <div>
                    <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
                    <p className="text-sm text-[var(--text-secondary)]">Completed</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-orange-600">{totalTasks - completedTasks}</p>
                    <p className="text-sm text-[var(--text-secondary)]">Pending</p>
                  </div>
                </div>
              </StatCard>
            </div>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button 
                  type="green" 
                  onClick={() => router.push('/dashboard/employee/tasks')}
                  className="flex items-center justify-center gap-2"
                >
                  <FaPlus className="w-4 h-4" />
                  My Tasks
                </Button>
                <Button 
                  type="gray" 
                  onClick={() => router.push('/dashboard/employee/topics')}
                  className="flex items-center justify-center gap-2"
                >
                  <FaChartBar className="w-4 h-4" />
                  Topics
                </Button>
                <Button 
                  type="purple" 
                  onClick={() => router.push('/dashboard/employee/posts')}
                  className="flex items-center justify-center gap-2"
                >
                  <FaComments className="w-4 h-4" />
                  Posts
                </Button>
                <Button 
                  type="orange" 
                  onClick={() => router.push('/dashboard/employee/knowledge-base')}
                  className="flex items-center justify-center gap-2"
                >
                  <FaBook className="w-4 h-4" />
                  Knowledge Base
                </Button>
              </div>
            </Card>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}



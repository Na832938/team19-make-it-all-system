import { useState, useEffect } from 'react';
import { useAuth } from '../../lib/AuthContext';
import Navbar from './Header.jsx';
import Footer from './Footer.jsx';
import Sidebar from './Sidebar.jsx';
import MobileSidebar from './MobileSidebar.jsx';
import Card from '../common/Card.jsx';
import StatCard from './StatCard.jsx';
import ActivityItem from './ActivityItem.jsx';
import LoadingScreen from '../common/LoadingScreen.jsx';
import Button from '../common/Button.jsx';
import Badge from '../common/Badge.jsx';

import {
  FaChartBar,
  FaUsers,
  FaBullseye,
  FaChartLine,
  FaFlag
} from "react-icons/fa";

import projects from '../../data/projects.json';
import GraphDisplay from './GraphDisplay';

/**
 * The main dashboard for managers.
 * @returns {JSX.Element} The manager dashboard component.
 */
export default function ManagerDashboard() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const { user, logout } = useAuth();

  useEffect(() => {
    console.log("ManagerDashboard mounted");
    if (!user) {
      console.log("No user found, redirecting to login.");
      window.location.href = "/";
    } else if (user.role !== 'Manager') {
      console.log("User is not a manager, redirecting to employee dashboard.");
      window.location.href = "/app";
    }
    if (user) {
      document.title = `Manager - ${user.username}`;
      console.log("Current user:", user.username);
    }
  }, [user]);

  if (!user || user.role !== 'Manager') {
    return <LoadingScreen />;
  }

  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.completed >= 80).length;
  const totalTeamMembers = new Set(projects.flatMap(p => p.teamMembers?.map(m => m.name) || [])).size;

  const managerIcon = (
    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
      <span className="text-purple-600 font-semibold text-sm">
        {user.role.charAt(0)}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--surface-colour)] flex flex-col text-[var(--text-primary)]">
      <Navbar 
        user={user} 
        onMobileMenuToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        onLogout={logout}
      />

      <div className="flex flex-1">
        <div className="hidden lg:block w-64 bg-[var(--surface-colour)] border-r border-[var(--border-neutral)]">
          <Sidebar 
            activeSection={activeSection} 
            setActiveSection={setActiveSection}
            isManager={true}
          />
        </div>

        <MobileSidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
          isManager={true}
        />

        <main className="flex-1 lg:ml-2 p-4 lg:p-6 min-h-[calc(100vh-5rem)]">
          {activeSection === "dashboard" && (
            <div className="space-y-6 pb-8">
              <div className="mb-8 relative">
                <h1 className="text-3xl font-bold text-[var(--text-primary)]">Manager Dashboard</h1>
                <p className="text-[var(--text-secondary)] mt-2">Track project progress and team workload</p>
              </div>

              <Card className="p-6 bg-[var(--surface-colour)] border-l-4 border-l-purple-500">
                <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                  Welcome back, {user.username}!
                </h1>
                <p className="text-[var(--text-secondary)]">
                  Here's your management overview for today.
                </p>
              </Card>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <StatCard title="Manager Info" icon={managerIcon}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--text-secondary)] font-medium">Name:</span>
                      <span className="text-[var(--text-primary)] font-semibold">{user.username}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--text-secondary)] font-medium">Role:</span>
                      <Badge text={user.role} bg="var(--primary-colour)" color="var(--surface-colour)" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--text-secondary)] font-medium">Email:</span>
                      <span className="text-[var(--text-primary)]">{user.email}</span>
                    </div>
                  </div>
                </StatCard>

                <StatCard 
                  title="Project Overview" 
                  icon={<span className="text-sm text-purple-600 font-semibold">{totalProjects} projects</span>}
                >
                  <div className="space-y-3 max-h-40 overflow-y-auto">
                    {projects.map((project, idx) => (
                      <div key={project.id || idx} className="flex items-center justify-between py-1">
                        <span className="flex-1 text-[var(--text-primary)] font-medium text-sm truncate mr-2">
                          {project.title}
                        </span>
                        <Badge 
                          text={`${project.completed}%`} 
                          bg={
                            project.completed >= 80 
                              ? 'rgb(220 252 231)' 
                              : project.completed >= 50
                              ? 'rgb(254 249 195)' 
                              : 'rgb(254 226 226)'
                          } 
                          color={
                            project.completed >= 80 
                              ? 'rgb(22 101 52)' 
                              : project.completed >= 50
                              ? 'rgb(133 77 14)' 
                              : 'rgb(153 27 27)'
                          } 
                        />
                      </div>
                    ))}
                  </div>
                </StatCard>

                <StatCard 
                  title="Team Overview" 
                  icon={<span className="text-2xl font-bold text-blue-600">{totalTeamMembers}</span>}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--text-secondary)] text-sm">Team Members:</span>
                      <span className="font-semibold">{totalTeamMembers}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--text-secondary)] text-sm">Active Projects:</span>
                      <span className="font-semibold">{totalProjects}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--text-secondary)] text-sm">On Track:</span>
                      <span className="font-semibold text-green-600">{completedProjects}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--text-secondary)] text-sm">Needs Attention:</span>
                      <span className="font-semibold text-red-600">{totalProjects - completedProjects}</span>
                    </div>
                  </div>
                </StatCard>
              </div>

              <Card className="p-6">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 text-center">Manager Quick Actions</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 place-items-center text-center">
                      <Button type="green" className="flex flex-col items-center justify-center gap-2 w-full h-32">
                        <FaChartBar className="w-6 h-6" />
                        Generate Report
                      </Button>
                      <Button type="blue" className="flex flex-col items-center justify-center gap-2 w-full h-32">
                        <FaUsers className="w-6 h-6" />
                        Team Management
                      </Button>
                      <Button type="purple" className="flex flex-col items-center justify-center gap-2 w-full h-32">
                        <FaBullseye className="w-6 h-6" />
                        Set Goals
                      </Button>
                      <Button type="orange" className="flex flex-col items-center justify-center gap-2 w-full h-32">
                        <FaChartLine className="w-6 h-6" />
                        Performance
                      </Button>
                    </div>
                  </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Recent Management Activity</h3>
                <div className="space-y-4">
                  <ActivityItem 
                    icon={<FaChartBar className="w-5 h-5 text-blue-600" />}
                    iconBg="bg-blue-100"
                    title="Generated quarterly performance report"
                    time="2 hours ago"
                  />
                  <ActivityItem 
                    icon={<FaUsers className="w-5 h-5 text-green-600" />}
                    iconBg="bg-green-100"
                    title="Conducted team performance review"
                    time="1 day ago"
                  />
                  <ActivityItem 
                    icon={<FaFlag className="w-5 h-5 text-purple-600" />}
                    iconBg="bg-purple-100"
                    title="Set new project milestones"
                    time="2 days ago"
                  />
                </div>
              </Card>
            </div>
          )}

          {activeSection === "graphs" && <GraphDisplay />}          
        </main>
      </div>

      <Footer />
    </div>
  );
}

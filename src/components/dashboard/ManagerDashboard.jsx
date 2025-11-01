import { useState, useEffect } from 'react';
import { useAuth } from '../../lib/AuthContext'; // Add this import
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import Sidebar from './Sidebar.jsx';
import MobileSidebar from './MobileSidebar.jsx';
import Card from '../common/Card.jsx';
import StatCard from './StatCard.jsx';
import ActivityItem from './ActivityItem.jsx';
import LoadingScreen from '../common/LoadingScreen.jsx';
import Button from '../common/Button.jsx';

import projects from '../../data/projects.json';
import GraphDisplay from './GraphDisplay';

export default function ManagerDashboard() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const { user, logout } = useAuth(); // Use AuthContext instead of localStorage

  // Redirect if not authenticated or not a manager
  useEffect(() => {
    if (!user) {
      window.location.href = "/";
    } else if (user.role !== 'Manager') {
      window.location.href = "/app"; // Redirect employees to their dashboard
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar 
        user={user} 
        onMobileMenuToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        onLogout={logout} // Pass logout function
      />

      <div className="flex flex-1">
        <div className="hidden lg:block w-64 bg-white border-r border-gray-200">
          <Sidebar 
            activeSection={activeSection} 
            setActiveSection={setActiveSection}
            isManager={true} // Indicate this is manager sidebar
          />
        </div>

        <MobileSidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
          isManager={true} // Indicate this is manager sidebar
        />

        <main className="flex-1 lg:ml-2 p-4 lg:p-6 min-h-[calc(100vh-5rem)]">
          {activeSection === "dashboard" && (
            <div className="space-y-6 pb-8">
              {/* Header - Consider making this more prominent */}
              <div className="mb-8 relative">
                <h1 className="text-3xl font-bold text-gray-900">Manager Dashboard</h1>
                <p className="text-gray-600 mt-2">Track project progress and team workload</p>
              </div>

              {/* Welcome Card */}
              <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-l-purple-500">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome back, {user.username}!
                </h1>
                <p className="text-gray-600">
                  Here's your management overview for today.
                </p>
              </Card>

              {/* Manager Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <StatCard title="Manager Info" icon={managerIcon}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Name:</span>
                      <span className="text-gray-900 font-semibold">{user.username}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Role:</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-sm rounded-full font-medium">
                        {user.role}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Email:</span>
                      <span className="text-gray-900">{user.email}</span>
                    </div>
                  </div>
                </StatCard>

                <StatCard 
                  title="Project Overview" 
                  icon={<span className="text-sm text-purple-600 font-semibold">{totalProjects} projects</span>}
                >
                  <div className="space-y-3 max-h-40 overflow-y-auto"> {/* Added scroll for many projects */}
                    {projects.map((project, idx) => (
                      <div key={project.id || idx} className="flex items-center justify-between py-1">
                        <span className="flex-1 text-gray-700 font-medium text-sm truncate mr-2">
                          {project.title}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium min-w-12 text-center ${
                          project.completed >= 80 
                            ? 'bg-green-100 text-green-800' 
                            : project.completed >= 50
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {project.completed}%
                        </span>
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
                      <span className="text-gray-600 text-sm">Team Members:</span>
                      <span className="font-semibold">{totalTeamMembers}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Active Projects:</span>
                      <span className="font-semibold">{totalProjects}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">On Track:</span>
                      <span className="font-semibold text-green-600">{completedProjects}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Needs Attention:</span>
                      <span className="font-semibold text-red-600">{totalProjects - completedProjects}</span>
                    </div>
                  </div>
                </StatCard>
              </div>

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Manager Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button type="green" className="flex items-center justify-center gap-2">
                    <span>📊</span>
                    Generate Report
                  </Button>
                  <Button type="blue" className="flex items-center justify-center gap-2">
                    <span>👥</span>
                    Team Management
                  </Button>
                  <Button type="purple" className="flex items-center justify-center gap-2">
                    <span>🎯</span>
                    Set Goals
                  </Button>
                  <Button type="orange" className="flex items-center justify-center gap-2">
                    <span>📈</span>
                    Performance
                  </Button>
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Management Activity</h3>
                <div className="space-y-4">
                  <ActivityItem 
                    icon="📊"
                    iconBg="bg-blue-100"
                    title="Generated quarterly performance report"
                    time="2 hours ago"
                  />
                  <ActivityItem 
                    icon="👥"
                    iconBg="bg-green-100"
                    title="Conducted team performance review"
                    time="1 day ago"
                  />
                  <ActivityItem 
                    icon="🎯"
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
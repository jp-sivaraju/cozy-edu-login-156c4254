
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, Settings, LogOut, User, FileBarChart, GraduationCap, DollarSign, 
  Bell, Award, Bus, Users, MessageSquare, Library, Box, 
  Clock, Globe, BookOpen, Database, BarChart2, Layers, UserCheck,
  FileSpreadsheet, Calendar, FileText, LifeBuoy, Menu, ChevronDown, ChevronRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface AdminLayoutProps {
  children: React.ReactNode;
}

// Define the type for submenu items
interface SubmenuItem {
  path: string;
  label: string;
}

// Define the type for navigation items that may have submenus
interface NavigationItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  submenu?: SubmenuItem[];
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to check if a path is active
  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') {
      return true;
    }
    return path !== '/admin' && location.pathname.includes(path);
  };

  // Admin navigation items with expanded submenus
  const navItems: NavigationItem[] = [
    { path: '/admin', label: 'Dashboard', icon: <Home className="h-5 w-5" /> },
    { 
      path: '/admin/users', 
      label: 'User Management', 
      icon: <Users className="h-5 w-5" />,
      submenu: [
        { path: '/admin/users', label: 'Manage Users' },
        { path: '/admin/staff', label: 'Staff Management' },
        { path: '/admin/onboarding', label: 'Bulk Onboarding' },
      ] 
    },
    { 
      path: '/admin/curriculum-generation', 
      label: 'Academics', 
      icon: <GraduationCap className="h-5 w-5" />,
      submenu: [
        { path: '/admin/curriculum-generation', label: 'Curriculum Generation' },
        { path: '/admin/exams/schedule', label: 'Exam Schedules' },
        { path: '/admin/report-cards', label: 'Report Cards' },
        { path: '/admin/lesson-plans', label: 'Lesson Planning' },
      ]
    },
    { 
      path: '/admin/routes', 
      label: 'Transport', 
      icon: <Bus className="h-5 w-5" />,
      submenu: [
        { path: '/admin/routes', label: 'Route Definition' },
        { path: '/admin/transport/assign', label: 'Assign Transport' },
        { path: '/admin/routes/assign', label: 'Route Assignment' },
      ]
    },
    { 
      path: '/admin/financial', 
      label: 'Finance', 
      icon: <DollarSign className="h-5 w-5" />,
      submenu: [
        { path: '/admin/financial', label: 'Financial Overview' },
        { path: '/admin/fees', label: 'Fee Management' },
        { path: '/admin/concessions', label: 'Concessions' },
        { path: '/admin/fees/bulk-approve', label: 'Bulk Approvals' },
      ]
    },
    { 
      path: '/admin/hall-tickets', 
      label: 'Examinations', 
      icon: <Award className="h-5 w-5" />,
      submenu: [
        { path: '/admin/hall-tickets', label: 'Hall Tickets' },
        { path: '/admin/hall-tickets/bulk-approve', label: 'Bulk Approvals' },
      ]
    },
    { 
      path: '/admin/notifications', 
      label: 'Communications', 
      icon: <Bell className="h-5 w-5" />,
      submenu: [
        { path: '/admin/notifications', label: 'Notifications' },
        { path: '/admin/messages', label: 'Messages/Circulars' },
      ]
    },
    { 
      path: '/admin/reports', 
      label: 'Reports', 
      icon: <FileBarChart className="h-5 w-5" />,
      submenu: [
        { path: '/admin/reports', label: 'System Reports' },
        { path: '/admin/analytics', label: 'Analytics' },
      ]
    },
    { path: '/admin/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];

  // Function to handle submenu toggle
  const handleSubmenuToggle = (path: string) => {
    setOpenSubmenu(prevPath => prevPath === path ? null : path);
  };

  // Auto-open submenu based on current route
  useEffect(() => {
    // Find which parent menu contains the current path
    const currentParentMenu = navItems.find(item => 
      item.submenu?.some(subItem => location.pathname.includes(subItem.path))
    );
    
    if (currentParentMenu) {
      setOpenSubmenu(currentParentMenu.path);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex">
      {/* Mobile menu button - only visible on small screens */}
      <button 
        className="fixed top-4 right-4 z-50 md:hidden bg-white p-2 rounded-full shadow-lg border border-slate-200"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <Menu className="h-6 w-6 text-slate-700" />
      </button>

      {/* Side navigation - collapsible */}
      <aside 
        className={`${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
                  ${sidebarCollapsed ? 'w-20' : 'w-64'} 
                  fixed md:relative bg-gradient-to-b from-[#000080] to-[#000080]/90 border-r border-[#000080]/20 
                  shadow-xl h-screen transition-all duration-300 z-40`}
      >
        {/* Logo area */}
        <div className="p-4 border-b border-[#000080]/30 flex items-center justify-between">
          <Link to="/admin" className="flex items-center">
            {!sidebarCollapsed && (
              <span className="font-bold text-xl bg-gradient-to-r from-[#FF9933] to-white bg-clip-text text-transparent">
                EduSense ERP
              </span>
            )}
            {sidebarCollapsed && (
              <span className="font-bold text-xl text-white">ES</span>
            )}
          </Link>
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)} 
            className="text-[#FF9933] hover:text-white transition-colors hidden md:block"
          >
            <ChevronRight className={`h-5 w-5 transition-transform duration-300 ${sidebarCollapsed ? 'rotate-0' : 'rotate-180'}`} />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="py-6 px-3 flex flex-col h-[calc(100vh-5rem)] overflow-auto scrollbar-thin scrollbar-thumb-[#000080]/30 scrollbar-track-transparent">
          <div className="flex-1 space-y-1">
            {navItems.map((item, index) => (
              <div key={index} className="relative">
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => handleSubmenuToggle(item.path)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg mb-1 transition-all duration-200
                        ${isActive(item.path) || openSubmenu === item.path 
                          ? 'bg-[#000080]/60 text-white' 
                          : 'text-[#FF9933] hover:bg-[#000080]/40 hover:text-white'
                        }
                        ${sidebarCollapsed ? 'px-2 justify-center' : 'px-3 justify-between'}`
                      }
                    >
                      <div className="flex items-center">
                        <TooltipProvider delayDuration={300}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className={`${!sidebarCollapsed && 'mr-3'} ${isActive(item.path) || openSubmenu === item.path ? 'text-white' : 'text-[#FF9933]'}`}>
                                {item.icon}
                              </span>
                            </TooltipTrigger>
                            {sidebarCollapsed && (
                              <TooltipContent side="right" className="bg-[#000080] text-white border-[#000080]/70">
                                {item.label}
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </TooltipProvider>
                        
                        {!sidebarCollapsed && (
                          <span className="text-sm font-medium">{item.label}</span>
                        )}
                      </div>
                      {!sidebarCollapsed && (
                        <ChevronDown 
                          className={`h-4 w-4 transition-transform duration-200 ${openSubmenu === item.path ? 'rotate-180' : ''}`} 
                        />
                      )}
                    </button>
                    
                    {/* Submenu */}
                    {openSubmenu === item.path && !sidebarCollapsed && (
                      <div className="ml-6 pl-3 border-l border-[#FF9933]/40 space-y-1 animate-in slide-in-from-left-1 duration-200 py-1">
                        {item.submenu.map((subItem, idx) => (
                          <Link 
                            key={idx} 
                            to={subItem.path}
                            className={`block py-2 px-3 rounded-md text-sm ${
                              location.pathname === subItem.path 
                                ? 'bg-[#FF9933]/20 text-white font-medium' 
                                : 'text-[#FF9933]/90 hover:bg-[#000080]/30 hover:text-white'
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                    
                    {/* Collapsed sidebar tooltips for submenu */}
                    {sidebarCollapsed && openSubmenu === item.path && (
                      <div className="absolute left-full top-0 ml-2 bg-[#000080] border border-[#000080]/70 rounded-lg shadow-xl p-2 animate-in slide-in-from-left-1 z-50 min-w-[200px]">
                        <div className="py-1 font-medium text-white px-3">{item.label}</div>
                        <div className="border-t border-[#000080]/70 mt-1 pt-1">
                          {item.submenu.map((subItem, idx) => (
                            <Link 
                              key={idx} 
                              to={subItem.path}
                              className={`block py-2 px-3 rounded-md text-sm ${
                                location.pathname === subItem.path 
                                  ? 'bg-[#FF9933]/20 text-white font-medium' 
                                  : 'text-[#FF9933]/90 hover:bg-[#000080]/40 hover:text-white'
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link 
                    to={item.path}
                    className={`flex items-center p-3 rounded-lg mb-1 transition-colors
                      ${isActive(item.path) 
                        ? 'bg-[#000080]/60 text-white' 
                        : 'text-[#FF9933] hover:bg-[#000080]/40 hover:text-white'
                      }
                      ${sidebarCollapsed ? 'justify-center px-2' : 'px-3'}`
                    }
                  >
                    <TooltipProvider delayDuration={300}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className={`${!sidebarCollapsed && 'mr-3'} ${isActive(item.path) ? 'text-white' : 'text-[#FF9933]'}`}>
                            {item.icon}
                          </span>
                        </TooltipTrigger>
                        {sidebarCollapsed && (
                          <TooltipContent side="right" className="bg-[#000080] text-white border-[#000080]/70">
                            {item.label}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                    
                    {!sidebarCollapsed && (
                      <span className="text-sm font-medium">{item.label}</span>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>
          
          {/* User profile and logout */}
          <div className="pt-4 border-t border-[#000080]/30 mt-4">
            <div 
              className={`p-3 rounded-lg transition-colors text-[#FF9933] hover:bg-[#000080]/40 hover:text-white mb-2 ${sidebarCollapsed ? 'justify-center' : ''}`}
            >
              {!sidebarCollapsed ? (
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF9933] to-[#FF9933]/70 flex items-center justify-center text-white font-semibold text-sm mr-2">
                    {user?.name?.charAt(0) || 'A'}
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-sm font-medium truncate">{user?.name || 'Admin'}</div>
                    <div className="text-xs text-[#FF9933]/80 truncate">{user?.email || 'admin@edusense.com'}</div>
                  </div>
                </div>
              ) : (
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-8 h-8 mx-auto rounded-full bg-gradient-to-br from-[#FF9933] to-[#FF9933]/70 flex items-center justify-center text-white font-semibold text-sm">
                        {user?.name?.charAt(0) || 'A'}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-[#000080] text-white border-[#000080]/70">
                      <p>{user?.name || 'Admin'}</p>
                      <p className="text-xs text-[#FF9933]/80">{user?.email || 'admin@edusense.com'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            
            <Button 
              variant="ghost" 
              className={`w-full flex items-center space-x-2 text-[#FF9933] hover:bg-[#000080]/40 hover:text-white
                ${sidebarCollapsed ? 'justify-center px-2' : 'justify-start px-3'}`}
              onClick={() => {
                logout();
                toast({
                  title: "Logged out successfully",
                  description: "You have been logged out of the system",
                  duration: 3000,
                });
              }}
            >
              <LogOut className="h-4 w-4" />
              {!sidebarCollapsed && <span>Sign out</span>}
            </Button>
          </div>
        </nav>
      </aside>
      
      {/* Main content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
        <header className="bg-gradient-to-r from-[#FF9933] to-[#FFAC33] shadow-md sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
              <p className="text-white/90 text-sm">Welcome back, {user?.name || 'Admin'}</p>
            </div>
            <Button
              variant="glass"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              onClick={() => navigate('/dashboard')}
            >
              Main Dashboard
            </Button>
          </div>
        </header>
        
        <div className="p-6">
          {children}
        </div>
        
        <footer className="bg-white shadow-inner border-t border-slate-200 py-4 mt-auto">
          <div className="container mx-auto px-6 text-center text-slate-600 text-sm">
            &copy; {new Date().getFullYear()} EduSense ERP - Premium School Management System
          </div>
        </footer>
      </main>
      
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;


import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { Button } from "@/components/ui/button";
import { 
  Home, Settings, LogOut, User, FileBarChart, GraduationCap, DollarSign, 
  Bell, Award, Bus, Users, MessageSquare, Library, Box, 
  Clock, Globe, BookOpen, Database, BarChart2, Layers, UserCheck,
  FileSpreadsheet, Calendar, FileText, Book, Navigation, LifeBuoy,
  Receipt, BadgePercent, FileCheck, Ticket
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Function to check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Admin navigation items with expanded submenus
  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: <Home className="h-5 w-5 text-[#138808]" /> },
    { 
      path: '/admin/users', 
      label: 'User Management', 
      icon: <Users className="h-5 w-5 text-[#138808]" />,
      submenu: [
        { path: '/admin/users', label: 'Manage Users' },
        { path: '/admin/staff', label: 'Staff Management' },
        { path: '/admin/onboarding', label: 'Bulk Onboarding' },
      ] 
    },
    { 
      path: '/admin/curriculum-generation', 
      label: 'Academics', 
      icon: <GraduationCap className="h-5 w-5 text-[#138808]" />,
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
      icon: <Bus className="h-5 w-5 text-[#138808]" />,
      submenu: [
        { path: '/admin/routes', label: 'Route Definition' },
        { path: '/admin/transport/assign', label: 'Assign Transport' },
        { path: '/admin/routes/assign', label: 'Route Assignment' },
      ]
    },
    { 
      path: '/admin/financial', 
      label: 'Finance', 
      icon: <DollarSign className="h-5 w-5 text-[#138808]" />,
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
      icon: <Award className="h-5 w-5 text-[#138808]" />,
      submenu: [
        { path: '/admin/hall-tickets', label: 'Hall Tickets' },
        { path: '/admin/hall-tickets/bulk-approve', label: 'Bulk Approvals' },
      ]
    },
    { 
      path: '/admin/notifications', 
      label: 'Communications', 
      icon: <Bell className="h-5 w-5 text-[#138808]" />,
      submenu: [
        { path: '/admin/notifications', label: 'Notifications' },
        { path: '/admin/messages', label: 'Messages/Circulars' },
      ]
    },
    { 
      path: '/admin/reports', 
      label: 'Reports', 
      icon: <FileBarChart className="h-5 w-5 text-[#138808]" />,
      submenu: [
        { path: '/admin/reports', label: 'System Reports' },
        { path: '/admin/analytics', label: 'Analytics' },
      ]
    },
    { path: '/admin/settings', label: 'Settings', icon: <Settings className="h-5 w-5 text-[#138808]" /> },
    { 
      path: '/admin/library', 
      label: 'Library Management', 
      icon: <Library className="h-5 w-5 text-[#138808]" />,
      submenu: [
        { path: '/admin/library', label: 'Library Management' },
      ]
    },
    { 
      path: '/admin/inventory', 
      label: 'Inventory Management', 
      icon: <Box className="h-5 w-5 text-[#138808]" />,
      submenu: [
        { path: '/admin/inventory', label: 'Track Inventory' },
      ]
    },
    { 
      path: '/admin/homework', 
      label: 'Homework Management', 
      icon: <Book className="h-5 w-5 text-[#138808]" />,
      submenu: [
        { path: '/admin/homework', label: 'Homework Assignments' },
      ]
    },
    { 
      path: '/admin/payroll', 
      label: 'HR/Payroll', 
      icon: <Clock className="h-5 w-5 text-[#138808]" />,
      submenu: [
        { path: '/admin/payroll', label: 'Manage Payroll' },
      ]
    },
    { 
      path: '/admin/website', 
      label: 'School Website', 
      icon: <Globe className="h-5 w-5 text-[#138808]" />,
      submenu: [
        { path: '/admin/website', label: 'Website Content' },
      ]
    },
    { 
      path: '/admin/academic-reports', 
      label: 'Academic Reports', 
      icon: <FileBarChart className="h-5 w-5 text-[#138808]" />,
      submenu: [
        { path: '/admin/academic-reports', label: 'Performance Reports' },
      ]
    },
  ];

  // Render submenu items for navigation
  const renderSubmenu = (submenuItems: any[]) => {
    return (
      <ul className="w-full md:w-[250px] grid p-2 md:grid-cols-1">
        {submenuItems.map((item, idx) => (
          <li key={idx}>
            <Link to={item.path}>
              <Button 
                variant="ghost" 
                className={`w-full justify-start text-left ${
                  isActive(item.path) 
                    ? 'bg-[#138808]/15 text-[#000080] font-semibold' 
                    : 'text-slate-700 hover:bg-[#138808]/5 hover:text-[#000080]'
                }`}
              >
                <div>
                  <span className="block font-medium text-base">{item.label}</span>
                </div>
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex">
      {/* Side navigation */}
      <aside className="w-16 md:w-64 bg-white border-r border-[#138808]/20 shrink-0 shadow-md h-screen sticky top-0">
        <div className="p-4 border-b border-[#138808]/20">
          <Link to="/admin" className="flex items-center justify-center md:justify-start">
            <span className="font-bold text-xl text-[#FF9933] hidden md:inline">EduSense Admin</span>
            <span className="font-bold text-xl text-[#FF9933] md:hidden">EA</span>
          </Link>
        </div>
        
        <nav className="py-6 md:py-8 px-2 md:px-5 flex flex-col h-[calc(100vh-5rem)] overflow-auto">
          <ul className="space-y-3 flex-1">
            {navItems.map((item, index) => (
              <li key={index}>
                {item.submenu ? (
                  <div className="mb-1">
                    <NavigationMenu orientation="vertical">
                      <NavigationMenuList className="flex-col items-start">
                        <NavigationMenuItem className="w-full">
                          <NavigationMenuTrigger 
                            className={`w-full justify-start rounded-xl py-3 text-left ${
                              location.pathname.includes(item.path) && item.path !== '/admin' 
                                ? 'bg-[#138808]/15 text-[#000080] font-semibold border-l-4 border-[#FF9933]' 
                                : 'text-slate-700 hover:bg-[#138808]/5 hover:text-[#000080]'
                            }`}
                          >
                            <span className="flex items-center">
                              {item.icon}
                              <span className="hidden md:inline ml-3 text-lg">{item.label}</span>
                            </span>
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            {renderSubmenu(item.submenu)}
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>
                  </div>
                ) : (
                  <Link to={item.path}>
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start rounded-xl py-3 ${
                        isActive(item.path) 
                          ? 'bg-[#138808]/15 text-[#000080] font-semibold border-l-4 border-[#FF9933]' 
                          : 'text-slate-700 hover:bg-[#138808]/5 hover:text-[#000080]'
                      }`}
                    >
                      <span className="flex items-center">
                        {item.icon}
                        <span className="hidden md:inline ml-3 text-lg">{item.label}</span>
                      </span>
                    </Button>
                  </Link>
                )}
              </li>
            ))}
          </ul>
          
          <div className="pt-4 border-t border-[#138808]/20">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem className="w-full">
                  <NavigationMenuTrigger 
                    className="w-full justify-start rounded-xl py-2 text-left bg-transparent hover:bg-[#138808]/5"
                  >
                    <span className="flex items-center">
                      <User className="h-5 w-5 text-[#FF9933]" />
                      <span className="hidden md:inline ml-3 text-lg text-slate-700">{user?.name || 'Admin'}</span>
                    </span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-6 min-w-[280px] animate-fade-in">
                      <div className="mb-4 pb-4 border-b border-[#138808]/20">
                        <p className="text-xl font-bold text-[#000080]">{user?.name}</p>
                        <p className="text-base text-slate-600">{user?.email}</p>
                        <div className="mt-3 inline-flex items-center px-4 py-2 bg-[#138808]/10 rounded-full">
                          <span className="text-sm font-semibold text-[#138808] capitalize">{user?.role}</span>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-[#000080] rounded-xl border-[#138808]/30 hover:bg-[#138808]/5 hover:text-[#000080] text-base font-medium"
                        onClick={logout}
                      >
                        <LogOut className="mr-3 h-5 w-5 text-[#FF9933]" /> Sign out
                      </Button>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </nav>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-[#FF9933] shadow-md">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
              <p className="text-white/80 text-sm">Welcome back, {user?.name || 'Admin'}</p>
            </div>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 rounded-xl border border-white/30"
              onClick={() => navigate('/dashboard')}
            >
              Back to Main Dashboard
            </Button>
          </div>
        </header>
        
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
        
        <footer className="bg-white border-t border-[#138808]/10 py-4">
          <div className="container mx-auto px-6 text-center text-[#000080]/60 text-sm">
            &copy; {new Date().getFullYear()} EduSense Admin Portal. All rights reserved.
          </div>
        </footer>
      </main>
    </div>
  );
};

export default AdminLayout;

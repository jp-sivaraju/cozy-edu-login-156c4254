import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { Button } from "@/components/ui/button";
import { 
  Home, FileText, Bus, LogOut, User, Book, Calendar, Bell, ShoppingBag, HelpCircle, Award, 
  MessageSquare, BookOpen, GraduationCap, Settings, FileBarChart, DollarSign, Users, 
  Library, Box, Clock, Database, BarChart2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import confetti from 'canvas-confetti';

interface DashboardLayoutProps {
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

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [showCelebration, setShowCelebration] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  
  useEffect(() => {
    // Show confetti celebration when dashboard loads
    if (location.pathname === '/dashboard' && !showCelebration) {
      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FF9933', '#FFFFFF', '#138808'] // Tricolor theme colors
        });
        setShowCelebration(true);
      }, 500);
    }
  }, [location.pathname, showCelebration]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Role-based navigation items
  const getNavigationItems = (): NavigationItem[] => {
    const commonItems: NavigationItem[] = [
      { path: '/dashboard', label: 'Dashboard', icon: <Home className="h-5 w-5 text-[#138808]" /> },
      { path: '/schedule', label: 'Schedule', icon: <Calendar className="h-5 w-5 text-[#138808]" /> },
      { path: '/diary', label: 'Diary', icon: <Book className="h-5 w-5 text-[#138808]" /> },
    ];

    if (!user) return commonItems;

    if (user.role === 'parent') {
      return [
        ...commonItems,
        { path: '/fees', label: 'Fees', icon: <FileText className="h-5 w-5 text-[#138808]" /> },
        { path: '/transport', label: 'Transport', icon: <Bus className="h-5 w-5 text-[#138808]" /> },
        { path: '/reports', label: 'Progress Reports', icon: <FileBarChart className="h-5 w-5 text-[#138808]" /> },
        { path: '/leaves', label: 'Leave Management', icon: <Clock className="h-5 w-5 text-[#138808]" /> },
        { path: '/notifications', label: 'Notifications', icon: <Bell className="h-5 w-5 text-[#138808]" /> },
        { path: '/store', label: 'School Store', icon: <ShoppingBag className="h-5 w-5 text-[#138808]" /> },
        { path: '/student-profile', label: 'Student Profile', icon: <Award className="h-5 w-5 text-[#138808]" /> },
        { path: '/calendar', label: 'Event Calendar', icon: <Calendar className="h-5 w-5 text-[#138808]" /> },
        { path: '/feedback', label: 'Feedback', icon: <MessageSquare className="h-5 w-5 text-[#138808]" /> },
        { path: '/ptm', label: 'Parent Teacher Meetings', icon: <Users className="h-5 w-5 text-[#138808]" /> },
        { path: '/hall-tickets', label: 'Hall Tickets', icon: <BookOpen className="h-5 w-5 text-[#138808]" /> },
        { path: '/help', label: 'Help & Support', icon: <HelpCircle className="h-5 w-5 text-[#138808]" /> },
      ];
    }

    if (user.role === 'teacher') {
      return [
        ...commonItems,
        { path: '/teacher/attendance', label: 'Attendance', icon: <FileText className="h-5 w-5 text-[#138808]" /> },
        { path: '/teacher/grades', label: 'Grades', icon: <Award className="h-5 w-5 text-[#138808]" /> },
        { path: '/teacher/communication', label: 'Communication', icon: <MessageSquare className="h-5 w-5 text-[#138808]" /> },
      ];
    }

    if (user.role === 'driver') {
      return [
        { path: '/driver/tracking', label: 'Tracking', icon: <Bus className="h-5 w-5 text-[#138808]" /> },
        { path: '/driver/notifications', label: 'Notifications', icon: <Bell className="h-5 w-5 text-[#138808]" /> },
      ];
    }

    // Admin items with expanded menu - Already implemented in AdminLayout
    return [
      { path: '/admin', label: 'Admin Dashboard', icon: <Home className="h-5 w-5 text-[#138808]" /> },
    ];
  };

  const navItems = getNavigationItems();

  // Render submenu items for admin navigation
  const renderSubmenu = (submenuItems: SubmenuItem[]) => {
    return (
      <ul className="w-full md:w-[250px] grid p-2 md:grid-cols-1 bg-white shadow-lg rounded-lg border border-[#138808]/20">
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

  // Function to handle submenu toggle
  const handleSubmenuToggle = (path: string) => {
    setOpenSubmenu(prevPath => prevPath === path ? null : path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Top navigation */}
      <header className="bg-[#FF9933] shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center">
            <span className="font-bold text-2xl text-white tracking-wide">EduSense</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-white/20 text-white hover:bg-white/30 rounded-xl border border-white/30">
                      <div className="flex items-center">
                        <User className="mr-2 h-5 w-5" />
                        <span className="text-lg font-medium">{user?.name || 'User'}</span>
                      </div>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="absolute right-0 top-full min-w-[280px] z-50 bg-white shadow-lg rounded-lg border border-[#138808]/20">
                      <div className="p-4">
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
          </div>
        </div>
      </header>
      
      {/* Side navigation */}
      <div className="flex h-[calc(100vh-4rem)]">
        <aside className="w-16 md:w-64 bg-white border-r border-[#138808]/20 shrink-0 shadow-md">
          <nav className="py-6 md:py-8 px-2 md:px-5 flex flex-col h-full">
            <ul className="space-y-2 flex-1 overflow-y-auto">
              {navItems.map((item, index) => (
                <li key={index} className="relative">
                  {item.submenu ? (
                    <div className="mb-1">
                      <NavigationMenu orientation="vertical">
                        <NavigationMenuList className="flex-col items-start">
                          <NavigationMenuItem className="w-full">
                            <NavigationMenuTrigger 
                              className={`w-full justify-start rounded-xl py-2.5 text-left ${
                                location.pathname.includes(item.path) 
                                  ? 'bg-[#138808]/15 text-[#000080] font-semibold border-l-4 border-[#FF9933]' 
                                  : 'text-slate-700 hover:bg-[#138808]/5 hover:text-[#000080]'
                              }`}
                              onClick={() => handleSubmenuToggle(item.path)}
                            >
                              <span className="flex items-center">
                                {item.icon}
                                <span className="hidden md:inline ml-3 text-base">{item.label}</span>
                              </span>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="absolute left-full top-0 min-w-[200px] md:min-w-[250px] z-50 bg-white shadow-lg rounded-lg border border-[#138808]/20">
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
                        className={`w-full justify-start rounded-xl py-2.5 ${
                          isActive(item.path) 
                            ? 'bg-[#138808]/15 text-[#000080] font-semibold border-l-4 border-[#FF9933]' 
                            : 'text-slate-700 hover:bg-[#138808]/5 hover:text-[#000080]'
                        }`}
                      >
                        <span className="flex items-center">
                          {item.icon}
                          <span className="hidden md:inline ml-3 text-base">{item.label}</span>
                        </span>
                      </Button>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            
            <div className="pt-4 border-t border-[#138808]/20">
              <Button
                variant="ghost"
                className="w-full justify-start text-slate-600 hover:bg-[#138808]/5 hover:text-[#000080] rounded-xl py-2.5"
                onClick={logout}
              >
                <LogOut className="h-5 w-5 text-[#FF9933] mr-3" />
                <span className="hidden md:inline text-base">Logout</span>
              </Button>
            </div>
          </nav>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto bg-gradient-to-b from-white to-slate-50 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

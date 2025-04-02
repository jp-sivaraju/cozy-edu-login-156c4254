
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { Button } from "@/components/ui/button";
import { MapPin, Bell, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import confetti from 'canvas-confetti';

interface DriverDashboardLayoutProps {
  children: React.ReactNode;
}

const DriverDashboardLayout: React.FC<DriverDashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [showCelebration, setShowCelebration] = useState(false);
  
  useEffect(() => {
    // Show confetti celebration when dashboard first loads
    if (location.pathname === '/driver/tracking' && !showCelebration) {
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
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

  // Navigation items for driver
  const navigationItems = [
    { path: '/driver/tracking', label: 'Tracking', icon: <MapPin className="h-5 w-5 text-[#138808]" /> },
    { path: '/driver/notifications', label: 'Notifications', icon: <Bell className="h-5 w-5 text-[#138808]" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Top navigation */}
      <header className="bg-[#FF9933] shadow-lg border-b border-[#138808]/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/driver/tracking" className="flex items-center">
            <span className="font-bold text-2xl text-white tracking-wide">EduSense Driver</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-white/20 text-white hover:bg-white/30 rounded-xl border border-white/30">
                    <div className="flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      <span className="text-lg font-medium">{user?.name || 'Driver'}</span>
                    </div>
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
        </div>
      </header>
      
      {/* Side navigation */}
      <div className="flex h-[calc(100vh-4rem)]">
        <aside className="w-16 md:w-64 bg-white border-r border-[#138808]/20 shrink-0 shadow-md">
          <nav className="py-6 md:py-8 px-2 md:px-5 flex flex-col h-full">
            <ul className="space-y-3 flex-1">
              {navigationItems.map((item) => (
                <li key={item.path}>
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
                </li>
              ))}
            </ul>
            
            <div className="pt-4 border-t border-[#138808]/20">
              <Button
                variant="ghost"
                className="w-full justify-start text-slate-600 hover:bg-[#138808]/5 hover:text-[#000080] rounded-xl py-3"
                onClick={logout}
              >
                <LogOut className="h-5 w-5 text-[#FF9933] mr-3" />
                <span className="hidden md:inline text-lg">Logout</span>
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

export default DriverDashboardLayout;

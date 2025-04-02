
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { Button } from "@/components/ui/button";
import { MapPin, Bell, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface DriverDashboardLayoutProps {
  children: React.ReactNode;
}

const DriverDashboardLayout: React.FC<DriverDashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Navigation items for driver
  const navigationItems = [
    { path: '/driver/tracking', label: 'Tracking', icon: <MapPin className="h-5 w-5 text-[#138808]" /> },
    { path: '/driver/notifications', label: 'Notifications', icon: <Bell className="h-5 w-5 text-[#138808]" /> },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top navigation */}
      <header className="bg-[#FF9933]/95 shadow-md border-b border-[#138808]/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/driver/tracking" className="flex items-center">
            <span className="font-bold text-2xl text-white">EduSense Driver</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-white/10 text-white hover:bg-white/20 rounded-xl">
                    <div className="flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      <span className="text-lg">{user?.name || 'Driver'}</span>
                    </div>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-4 min-w-[240px]">
                      <div className="mb-3 pb-3 border-b border-[#138808]/20">
                        <p className="text-lg font-medium text-[#000080]">{user?.name}</p>
                        <p className="text-base text-slate-500">{user?.email}</p>
                        <div className="mt-2 inline-block px-3 py-1 bg-[#138808]/10 rounded-full text-sm font-medium text-[#138808]">
                          {user?.role}
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-[#000080] rounded-xl border-[#138808]/20 hover:bg-[#138808]/5 hover:text-[#000080] text-base"
                        onClick={logout}
                      >
                        <LogOut className="mr-2 h-5 w-5 text-[#FF9933]" /> Sign out
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
        <aside className="w-16 md:w-60 bg-white border-r border-[#138808]/20 shrink-0">
          <nav className="py-4 md:py-6 px-2 md:px-4 flex flex-col h-full">
            <ul className="space-y-2 flex-1">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start rounded-xl py-2.5 ${
                        isActive(item.path) 
                          ? 'bg-[#138808]/10 text-[#000080] font-medium' 
                          : 'text-slate-600 hover:bg-[#138808]/5 hover:text-[#000080]'
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
                className="w-full justify-start text-slate-600 hover:bg-[#138808]/5 hover:text-[#000080] rounded-xl py-2.5"
                onClick={logout}
              >
                <LogOut className="h-5 w-5 text-[#FF9933] mr-3" />
                <span className="hidden md:inline text-lg">Logout</span>
              </Button>
            </div>
          </nav>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DriverDashboardLayout;

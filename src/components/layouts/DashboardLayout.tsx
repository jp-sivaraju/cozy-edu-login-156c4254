
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { Button } from "@/components/ui/button";
import { Home, FileText, Bus, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top navigation */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center">
            <span className="font-bold text-xl text-[#000080]">EduSense</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-white">
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>{user?.name || 'User'}</span>
                    </div>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-4 min-w-[220px]">
                      <div className="mb-2 pb-2 border-b border-slate-100">
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-sm text-slate-500">{user?.email}</p>
                        <div className="mt-1 inline-block px-2 py-1 bg-[#138808]/10 rounded-full text-xs font-medium text-[#138808]">
                          {user?.role}
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-slate-700"
                        onClick={logout}
                      >
                        <LogOut className="mr-2 h-4 w-4" /> Sign out
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
        <aside className="w-16 md:w-56 bg-white border-r border-slate-200 shrink-0">
          <nav className="py-4 md:py-6 px-2 md:px-4 flex flex-col h-full">
            <ul className="space-y-1 flex-1">
              <li>
                <Link to="/dashboard">
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start ${isActive('/dashboard') ? 'bg-slate-100' : ''}`}
                  >
                    <Home className="h-4 w-4 md:mr-2" />
                    <span className="hidden md:inline">Dashboard</span>
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/fees">
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start ${isActive('/fees') ? 'bg-slate-100' : ''}`}
                  >
                    <FileText className="h-4 w-4 md:mr-2" />
                    <span className="hidden md:inline">Fees</span>
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/transport">
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start ${isActive('/transport') ? 'bg-slate-100 text-[#FF9933]' : ''}`}
                  >
                    <Bus className="h-4 w-4 md:mr-2" />
                    <span className="hidden md:inline">Transport</span>
                  </Button>
                </Link>
              </li>
              {/* Additional menu items can be added here */}
            </ul>
            
            <div className="pt-4 border-t border-slate-200">
              <Button
                variant="ghost"
                className="w-full justify-start text-slate-700"
                onClick={logout}
              >
                <LogOut className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </div>
          </nav>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

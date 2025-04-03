
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from '@/components/ui/sheet';
import {
  Users,
  UserPlus,
  FileSpreadsheet,
  GraduationCap,
  Calendar,
  FileText,
  Book,
  Bus,
  Navigation,
  LifeBuoy,
  DollarSign,
  Receipt,
  BadgePercent,
  FileCheck,
  Ticket,
  Bell,
  MessageSquare,
  BarChart2,
  AreaChart,
  Settings,
  Library,
  Box,
  Home,
  Clock,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Globe,
  FileBarChart,
  LogOut,
  User,
  Search,
} from "lucide-react";
import Logo from '@/components/Logo';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface AdminLayoutProps {
  children: React.ReactNode;
}

interface NavItemProps {
  title: string;
  path: string;
  icon: React.ReactNode;
  badge?: number | string;
  isActive?: boolean;
}

interface NavGroupProps {
  title: string;
  icon: React.ReactNode;
  children: NavItemProps[];
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  // Handle group toggle
  const toggleGroup = (title: string) => {
    setOpenGroups(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };
  
  // Define navigation groups with their items
  const navGroups: NavGroupProps[] = [
    {
      title: "Administration",
      icon: <Users className="h-5 w-5" />,
      children: [
        { title: "User Management", path: "/admin/users", icon: <Users className="h-5 w-5" />, badge: 14 },
        { title: "Staff Management", path: "/admin/staff", icon: <UserPlus className="h-5 w-5" /> },
        { title: "Bulk Onboarding", path: "/admin/onboarding", icon: <FileSpreadsheet className="h-5 w-5" /> },
      ]
    },
    {
      title: "Academics",
      icon: <GraduationCap className="h-5 w-5" />,
      children: [
        { title: "Curriculum Generation", path: "/admin/curriculum-generation", icon: <GraduationCap className="h-5 w-5" /> },
        { title: "Exam Schedules", path: "/admin/exams/schedule", icon: <Calendar className="h-5 w-5" /> },
        { title: "Report Cards", path: "/admin/report-cards", icon: <FileText className="h-5 w-5" /> },
        { title: "Lesson Planning", path: "/admin/lesson-plans", icon: <Book className="h-5 w-5" /> },
      ]
    },
    {
      title: "Transport",
      icon: <Bus className="h-5 w-5" />,
      children: [
        { title: "Route Definition", path: "/admin/routes", icon: <Navigation className="h-5 w-5" /> },
        { title: "Assign Transport", path: "/admin/transport/assign", icon: <Bus className="h-5 w-5" /> },
        { title: "Route Assignment", path: "/admin/routes/assign", icon: <LifeBuoy className="h-5 w-5" /> },
      ]
    },
    {
      title: "Finance",
      icon: <DollarSign className="h-5 w-5" />,
      children: [
        { title: "Financial Overview", path: "/admin/financial", icon: <DollarSign className="h-5 w-5" /> },
        { title: "Fee Management", path: "/admin/fees", icon: <Receipt className="h-5 w-5" /> },
        { title: "Concessions", path: "/admin/concessions", icon: <BadgePercent className="h-5 w-5" /> },
        { title: "Bulk Approvals", path: "/admin/fees/bulk-approve", icon: <FileCheck className="h-5 w-5" /> },
      ]
    },
    {
      title: "Examinations",
      icon: <Ticket className="h-5 w-5" />,
      children: [
        { title: "Hall Tickets", path: "/admin/hall-tickets", icon: <Ticket className="h-5 w-5" /> },
        { title: "Bulk Approvals", path: "/admin/hall-tickets/bulk-approve", icon: <FileCheck className="h-5 w-5" /> },
      ]
    },
    {
      title: "Communications",
      icon: <Bell className="h-5 w-5" />,
      children: [
        { title: "Notifications", path: "/admin/notifications", icon: <Bell className="h-5 w-5" /> },
        { title: "Messages/Circulars", path: "/admin/messages", icon: <MessageSquare className="h-5 w-5" /> },
      ]
    },
    {
      title: "Reports",
      icon: <BarChart2 className="h-5 w-5" />,
      children: [
        { title: "System Reports", path: "/admin/reports", icon: <BarChart2 className="h-5 w-5" /> },
        { title: "Analytics", path: "/admin/analytics", icon: <AreaChart className="h-5 w-5" /> },
      ]
    },
    {
      title: "Additional Features",
      icon: <Library className="h-5 w-5" />,
      children: [
        { title: "Library Management", path: "/admin/library", icon: <Library className="h-5 w-5" /> },
        { title: "Inventory Management", path: "/admin/inventory", icon: <Box className="h-5 w-5" /> },
        { title: "Homework Management", path: "/admin/homework", icon: <Home className="h-5 w-5" /> },
        { title: "HR/Payroll", path: "/admin/payroll", icon: <Clock className="h-5 w-5" /> },
        { title: "School Website", path: "/admin/website", icon: <Globe className="h-5 w-5" /> },
        { title: "Academic Reports", path: "/admin/academic-reports", icon: <FileBarChart className="h-5 w-5" /> },
      ]
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      children: [
        { title: "School Settings", path: "/admin/settings", icon: <Settings className="h-5 w-5" /> },
      ]
    },
  ];
  
  // Automatically open group for active path
  useEffect(() => {
    navGroups.forEach(group => {
      const hasActivePath = group.children.some(item => isActive(item.path));
      if (hasActivePath && !openGroups.includes(group.title)) {
        setOpenGroups(prev => [...prev, group.title]);
      }
    });
  }, [location.pathname]);
  
  // Filter navigation items based on search
  const filteredNavGroups = searchQuery.length > 0 
    ? navGroups.map(group => ({
        ...group,
        children: group.children.filter(item => 
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(group => group.children.length > 0)
    : navGroups;

  const NavItem = ({ title, path, icon, badge, isActive }: NavItemProps) => (
    <Link 
      to={path} 
      className={`flex items-center justify-between px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200
        ${isActive 
          ? 'bg-[#138808]/15 text-[#000080] font-semibold border-l-4 border-[#FF9933]' 
          : 'text-[#000080]/80 hover:bg-[#FF9933]/5 hover:text-[#000080]'
        }`}
    >
      <div className="flex items-center space-x-3">
        <div className={`${isActive ? 'text-[#FF9933]' : 'text-[#138808]'}`}>
          {icon}
        </div>
        <span>{title}</span>
      </div>
      {badge && (
        <span className="px-2 py-0.5 bg-[#FF9933]/20 text-[#FF9933] text-xs font-bold rounded-full">
          {badge}
        </span>
      )}
    </Link>
  );
  
  const NavGroup = ({ title, icon, children }: NavGroupProps) => {
    const isOpen = openGroups.includes(title);
    const hasActivePath = children.some(item => isActive(item.path));
    
    return (
      <Collapsible open={isOpen} onOpenChange={() => toggleGroup(title)} className="w-full">
        <CollapsibleTrigger className="w-full">
          <div className={`flex items-center justify-between px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200
              ${hasActivePath 
                ? 'bg-[#138808]/10 text-[#000080]' 
                : 'text-[#000080]/80 hover:bg-[#FF9933]/5'}`}>
            <div className="flex items-center space-x-3">
              <div className={`${hasActivePath ? 'text-[#FF9933]' : 'text-[#138808]'}`}>
                {icon}
              </div>
              <span>{title}</span>
            </div>
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="ml-4 mt-1 space-y-1 border-l border-[#138808]/20 pl-4">
          {children.map((item) => (
            <NavItem 
              key={item.path} 
              title={item.title} 
              path={item.path} 
              icon={item.icon}
              badge={item.badge}
              isActive={isActive(item.path)}
            />
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  };
  
  const MobileNav = () => (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="h-6 w-6 text-[#138808]" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] bg-white border-r border-[#138808]/20">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-[#138808]/20">
            <Logo />
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-5 w-5 text-[#138808]" />
            </Button>
          </div>
          
          <div className="p-4 border-b border-[#138808]/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#FF9933]/20 flex items-center justify-center">
                <User className="h-5 w-5 text-[#FF9933]" />
              </div>
              <div>
                <p className="font-bold text-[#000080]">{user?.name}</p>
                <p className="text-sm text-[#000080]/70">{user?.role}</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-b border-[#138808]/20">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-[#138808]/60" />
              <input
                type="text"
                placeholder="Search modules..."
                className="w-full bg-white border border-[#138808]/30 rounded-lg pl-9 pr-4 py-2 text-[#000080] placeholder:text-[#000080]/40 focus:outline-none focus:ring-2 focus:ring-[#138808]/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-auto p-4 space-y-2">
            <Button
              variant="glass"
              className="w-full justify-start mb-2"
              onClick={() => {
                navigate("/admin");
                setIsMobileMenuOpen(false);
              }}
            >
              <Home className="h-5 w-5 text-[#138808] mr-3" />
              Dashboard Home
            </Button>
            
            {filteredNavGroups.map((group) => (
              <NavGroup 
                key={group.title}
                title={group.title}
                icon={group.icon}
                children={group.children}
              />
            ))}
          </div>
          
          <div className="p-4 border-t border-[#138808]/20">
            <Button 
              variant="outline" 
              className="w-full justify-start text-[#000080] border-[#FF9933]/30 hover:bg-[#FF9933]/5"
              onClick={() => {
                logout();
                setIsMobileMenuOpen(false);
              }}
            >
              <LogOut className="mr-3 h-5 w-5 text-[#FF9933]" />
              Logout
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-[#138808]/20 py-4 px-6 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <MobileNav />
            <Link to="/admin" className="hidden md:block">
              <Logo />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center px-4 py-2 bg-white border border-[#138808]/20 rounded-lg shadow-sm">
            <Search className="h-4 w-4 text-[#138808]/60 mr-2" />
            <input
              type="text"
              placeholder="Search modules..."
              className="bg-transparent border-none text-[#000080] placeholder:text-[#000080]/40 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center space-x-1">
              <div className="inline-flex items-center px-3 py-1 bg-[#138808]/10 rounded-full">
                <span className="text-sm text-[#138808] font-medium capitalize">{user?.role}</span>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#000080]">{user?.name}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={logout}
              className="rounded-full h-10 w-10 border-[#FF9933] hover:bg-[#FF9933]/5"
            >
              <LogOut className="h-5 w-5 text-[#FF9933]" />
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-white border-r border-[#138808]/20 overflow-y-auto">
          <div className="p-4">
            <Button
              variant="glass"
              className="w-full justify-start mb-4"
              onClick={() => navigate("/admin")}
            >
              <Home className="h-5 w-5 text-[#138808] mr-3" />
              Dashboard Home
            </Button>
            
            <div className="space-y-2">
              {filteredNavGroups.map((group) => (
                <NavGroup 
                  key={group.title}
                  title={group.title}
                  icon={group.icon}
                  children={group.children}
                />
              ))}
            </div>
          </div>
        </aside>
        
        {/* Content */}
        <main className="flex-1 overflow-auto animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

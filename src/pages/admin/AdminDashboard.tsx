
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
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
  UserCheck,
  Globe,
  FileBarChart,
} from "lucide-react";
import confetti from 'canvas-confetti';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Admin Dashboard stats data
const dashboardStats = [
  { title: "Total Students", value: "1,246", change: "+12%", trend: "up" },
  { title: "Total Staff", value: "87", change: "+3%", trend: "up" },
  { title: "Fee Collection", value: "₹12.8L", change: "+8%", trend: "up" },
  { title: "Transportation", value: "28 Routes", change: "+2", trend: "up" },
  { title: "Pending Actions", value: "14", change: "-5", trend: "down" },
  { title: "System Health", value: "98%", change: "+1%", trend: "up" },
];

// Dummy recent notifications
const recentNotifications = [
  { id: 1, title: "New Student Registration", time: "10 mins ago", description: "A new student has been registered in Class 8B" },
  { id: 2, title: "Fee Payment Reminder", time: "2 hours ago", description: "Fee payment reminder sent to 28 students" },
  { id: 3, title: "Staff Meeting", time: "5 hours ago", description: "Staff meeting scheduled for tomorrow at 10 AM" },
  { id: 4, title: "New Curriculum Generated", time: "Yesterday", description: "Science curriculum for Class 9 has been generated" },
];

// Module card data structure
interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  isPriority?: boolean;
  count?: number;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedTab, setSelectedTab] = useState("overview");
  
  useEffect(() => {
    // Trigger confetti animation on load
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF9933', '#FFFFFF', '#138808']
      });
    }, 800);
    
    // Hide welcome message after 5 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  // Admin modules
  const adminModules: ModuleCardProps[] = [
    { 
      title: "User Management", 
      description: "Manage users and roles", 
      icon: <Users className="h-6 w-6 text-[#138808]" />, 
      path: "/admin/users",
      isPriority: true,
      count: 14
    },
    { 
      title: "Staff Management", 
      description: "Manage school staff", 
      icon: <UserCheck className="h-6 w-6 text-[#138808]" />, 
      path: "/admin/staff" 
    },
    { 
      title: "Bulk Onboarding", 
      description: "Upload Excel file for multiple users", 
      icon: <FileSpreadsheet className="h-6 w-6 text-[#138808]" />, 
      path: "/admin/onboarding" 
    },
  ];

  // Academic modules
  const academicModules: ModuleCardProps[] = [
    { 
      title: "Curriculum Generation", 
      description: "Generate AI-driven curricula", 
      icon: <GraduationCap className="h-6 w-6 text-[#138808]" />, 
      path: "/admin/curriculum-generation",
      isPriority: true
    },
    { 
      title: "Exam Schedules", 
      description: "Create and manage exam schedules", 
      icon: <Calendar className="h-6 w-6 text-[#138808]" />, 
      path: "/admin/exams/schedule" 
    },
    { 
      title: "Report Cards", 
      description: "Generate and view report cards", 
      icon: <FileText className="h-6 w-6 text-[#138808]" />, 
      path: "/admin/report-cards" 
    },
    { 
      title: "Lesson Planning", 
      description: "Create and manage lesson plans", 
      icon: <Book className="h-6 w-6 text-[#138808]" />, 
      path: "/admin/lesson-plans" 
    },
  ];

  // Transport modules
  const transportModules: ModuleCardProps[] = [
    { 
      title: "Route Definition", 
      description: "Create routes with stops", 
      icon: <Navigation className="h-6 w-6 text-[#138808]" />, 
      path: "/admin/routes" 
    },
    { 
      title: "Assign Transport", 
      description: "Assign routes to students", 
      icon: <Bus className="h-6 w-6 text-[#138808]" />, 
      path: "/admin/transport/assign" 
    },
    { 
      title: "Route Assignment", 
      description: "Assign routes to drivers", 
      icon: <LifeBuoy className="h-6 w-6 text-[#138808]" />, 
      path: "/admin/routes/assign" 
    },
  ];

  // Finance modules
  const financeModules: ModuleCardProps[] = [
    { 
      title: "Financial Overview", 
      description: "View financial reports and analytics", 
      icon: <DollarSign className="h-6 w-6 text-[#138808]" />, 
      path: "/admin/financial",
      isPriority: true 
    },
    { 
      title: "Fee Management", 
      description: "View and approve fee payments", 
      icon: <Receipt className="h-6 w-6 text-[#138808]" />, 
      path: "/admin/fees" 
    },
    { 
      title: "Concessions", 
      description: "Apply and manage fee discounts", 
      icon: <BadgePercent className="h-6 w-6 text-[#138808]" />, 
      path: "/admin/concessions" 
    },
    { 
      title: "Bulk Approvals", 
      description: "Approve fees via Excel upload", 
      icon: <FileCheck className="h-6 w-6 text-[#138808]" />, 
      path: "/admin/fees/bulk-approve" 
    },
  ];

  // Examination modules
  const examinationModules: ModuleCardProps[] = [
    { 
      title: "Hall Tickets", 
      description: "Generate and manage hall tickets", 
      icon: <Ticket className="h-6 w-6 text-[#138808]" />, 
      path: "/admin/hall-tickets" 
    },
    { 
      title: "Bulk Approvals", 
      description: "Approve hall tickets via Excel upload", 
      icon: <FileCheck className="h-6 w-6 text-[#138808]" />, 
      path: "/admin/hall-tickets/bulk-approve" 
    },
  ];

  // Communication modules
  const communicationModules: ModuleCardProps[] = [
    { 
      title: "Notifications", 
      description: "Send and view notification history", 
      icon: <Bell className="h-6 w-6 text-[#138808]" />, 
      path: "/admin/notifications" 
    },
    { 
      title: "Messages/Circulars", 
      description: "Send messages and circulars to users", 
      icon: <MessageSquare className="h-6 w-6 text-[#138808]" />, 
      path: "/admin/messages" 
    },
  ];

  // Report modules
  const reportModules: ModuleCardProps[] = [
    { 
      title: "System Reports", 
      description: "Generate and view system reports", 
      icon: <BarChart2 className="h-6 w-6 text-[#138808]" />, 
      path: "/admin/reports" 
    },
    { 
      title: "Analytics", 
      description: "View analytics and trends", 
      icon: <AreaChart className="h-6 w-6 text-[#138808]" />, 
      path: "/admin/analytics" 
    },
  ];

  // Settings modules
  const settingsModules: ModuleCardProps[] = [
    { 
      title: "School Settings", 
      description: "Configure school parameters", 
      icon: <Settings className="h-6 w-6 text-[#138808]" />, 
      path: "/admin/settings" 
    },
  ];

  // Additional MCB modules
  const mcbModules: ModuleCardProps[] = [
    { 
      title: "Library Management", 
      description: "Manage library books", 
      icon: <Library className="h-6 w-6 text-[#138808]" />, 
      path: "/admin/library" 
    },
    { 
      title: "Inventory Management", 
      description: "Track school inventory", 
      icon: <Box className="h-6 w-6 text-[#138808]" />, 
      path: "/admin/inventory" 
    },
    { 
      title: "Homework Management", 
      description: "View and manage homework assignments", 
      icon: <Home className="h-6 w-6 text-[#138808]" />, 
      path: "/admin/homework" 
    },
    { 
      title: "HR/Payroll", 
      description: "Manage staff payroll and benefits", 
      icon: <Clock className="h-6 w-6 text-[#138808]" />, 
      path: "/admin/payroll" 
    },
    { 
      title: "School Website", 
      description: "Manage school website content", 
      icon: <Globe className="h-6 w-6 text-[#138808]" />, 
      path: "/admin/website" 
    },
    { 
      title: "Academic Reports", 
      description: "View academic performance reports", 
      icon: <FileBarChart className="h-6 w-6 text-[#138808]" />, 
      path: "/admin/academic-reports" 
    },
  ];

  // Component for module cards
  const ModuleCard = ({ title, description, icon, path, isPriority, count }: ModuleCardProps) => {
    return (
      <Card className="h-full overflow-hidden animate-fade-in border border-[#138808]/30 hover:border-[#138808] transition-all duration-300">
        <CardHeader className={`pb-3 ${isPriority ? "bg-[#FF9933]/10" : ""}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {icon}
              <CardTitle className="text-xl font-bold text-[#000080]">{title}</CardTitle>
            </div>
            {isPriority && (
              <span className="px-2 py-1 bg-[#FF9933]/20 text-[#FF9933] text-xs font-bold rounded-full">
                Priority
              </span>
            )}
            {count && (
              <span className="px-2 py-1 bg-[#138808]/20 text-[#138808] text-xs font-bold rounded-full">
                {count}
              </span>
            )}
          </div>
          <CardDescription className="text-[#000080]/70 text-base">{description}</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-full flex items-end">
            <Button
              variant="tricolor"
              className="w-full mt-4"
              onClick={() => navigate(path)}
            >
              Open {title}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderModuleGrid = (modules: ModuleCardProps[], title: string) => (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-4 text-[#FF9933] border-b-2 border-[#138808]/30 pb-2">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {modules.map((module) => (
          <ModuleCard
            key={module.title}
            title={module.title}
            description={module.description}
            icon={module.icon}
            path={module.path}
            isPriority={module.isPriority}
            count={module.count}
          />
        ))}
      </div>
    </div>
  );

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    if (value !== "overview") {
      // Trigger a more subtle confetti effect on tab change
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.2 },
        colors: ['#138808']
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 pb-12">
      {showWelcome && (
        <div className="fixed top-10 right-10 z-50 bg-white/90 backdrop-blur-md shadow-lg border-l-4 border-[#FF9933] p-4 rounded-lg animate-fade-in">
          <h3 className="text-lg font-bold text-[#000080]">Welcome back, {user?.name}!</h3>
          <p className="text-[#000080]/80">You have 14 pending actions to review today</p>
        </div>
      )}
      
      <div className="container mx-auto px-4 pt-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-[#FF9933] mb-2">Admin Dashboard</h1>
          <p className="text-lg text-[#000080]/80">Comprehensive school management platform</p>
        </header>
        
        <Tabs value={selectedTab} onValueChange={handleTabChange} className="mb-10">
          <TabsList className="mb-4 bg-white border border-[#138808]/20 p-1 shadow-sm">
            <TabsTrigger value="overview" className="text-[#000080] data-[state=active]:bg-[#FF9933]/10 data-[state=active]:text-[#000080] data-[state=active]:font-bold">
              Overview
            </TabsTrigger>
            <TabsTrigger value="all" className="text-[#000080] data-[state=active]:bg-[#FF9933]/10 data-[state=active]:text-[#000080] data-[state=active]:font-bold">
              All Modules
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {dashboardStats.map((stat, index) => (
                <Card key={index} className="border border-[#138808]/30 shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl font-bold text-[#000080]">{stat.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <p className="text-4xl font-bold text-[#FF9933]">{stat.value}</p>
                      <div className={`flex items-center px-3 py-1 rounded-full text-white ${stat.trend === "up" ? "bg-[#138808]" : "bg-red-500"}`}>
                        <span className="text-sm font-medium">{stat.change}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
              <div className="lg:col-span-2">
                <Card className="border border-[#138808]/30 shadow-md h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl font-bold text-[#000080]">Priority Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {adminModules.filter(m => m.isPriority).concat(
                        academicModules.filter(m => m.isPriority),
                        financeModules.filter(m => m.isPriority)
                      ).map((module, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-[#FF9933]/5 rounded-lg border border-[#138808]/20">
                          <div className="flex items-center gap-3">
                            {module.icon}
                            <div>
                              <h3 className="font-bold text-[#000080]">{module.title}</h3>
                              <p className="text-sm text-[#000080]/70">{module.description}</p>
                            </div>
                          </div>
                          <Button 
                            variant="green" 
                            size="sm"
                            onClick={() => navigate(module.path)}
                          >
                            Open
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="border border-[#138808]/30 shadow-md h-full">
                  <CardHeader className="pb-2 border-b border-[#138808]/10">
                    <CardTitle className="text-2xl font-bold text-[#000080]">Recent Notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      {recentNotifications.map((notification) => (
                        <div key={notification.id} className="border-b border-[#138808]/10 pb-3 last:border-0">
                          <h3 className="font-bold text-[#FF9933]">{notification.title}</h3>
                          <p className="text-sm text-[#000080]/70">{notification.description}</p>
                          <p className="text-xs text-[#138808] font-medium mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="glass" className="w-full" onClick={() => navigate("/admin/notifications")}>
                      View All Notifications
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
            
            {renderModuleGrid(adminModules.filter(m => m.isPriority)
              .concat(academicModules.filter(m => m.isPriority))
              .concat(financeModules.filter(m => m.isPriority)), 
              "Quick Access")}
          </TabsContent>
          
          <TabsContent value="all" className="animate-fade-in">
            {renderModuleGrid(adminModules, "Administration")}
            {renderModuleGrid(academicModules, "Academics")}
            {renderModuleGrid(transportModules, "Transport")}
            {renderModuleGrid(financeModules, "Finance")}
            {renderModuleGrid(examinationModules, "Examinations")}
            {renderModuleGrid(communicationModules, "Communications")}
            {renderModuleGrid(reportModules, "Reports")}
            {renderModuleGrid(settingsModules, "Settings")}
            {renderModuleGrid(mcbModules, "Additional Features")}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;

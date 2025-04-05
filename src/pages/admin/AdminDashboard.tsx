
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, TricolorCard, PremiumCard, GlassCard 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  Users, UserPlus, FileSpreadsheet, GraduationCap, Calendar, FileText, Book, Bus, 
  Navigation, LifeBuoy, DollarSign, Receipt, BadgePercent, FileCheck, Ticket, Bell, 
  MessageSquare, BarChart2, AreaChart, Settings, Library, Box, Home, Clock, UserCheck, 
  Globe, FileBarChart, TrendingUp, ArrowUpRight, ArrowDownRight, PieChart, LineChart,
  CheckCircle2, AlertTriangle, BarChart, Activity, CircleDollarSign, Info
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart as RechartsLineChart,
  Line,
  Legend
} from 'recharts';
import confetti from 'canvas-confetti';
import { useToast } from "@/hooks/use-toast";

// Define data types
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  color: string;
}

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  isPriority?: boolean;
  count?: number;
  completion?: number;
}

// Refactor the ChartData interface to be more flexible
interface ChartData {
  name: string;
  [key: string]: any;
  value: number;
}

// Financial data with value property added
const financialData: ChartData[] = [
  { name: 'Apr', income: 320000, expenses: 240000, profit: 80000, value: 320000 },
  { name: 'May', income: 380000, expenses: 260000, profit: 120000, value: 380000 },
  { name: 'Jun', income: 450000, expenses: 290000, profit: 160000, value: 450000 },
  { name: 'Jul', income: 420000, expenses: 270000, profit: 150000, value: 420000 },
  { name: 'Aug', income: 520000, expenses: 320000, profit: 200000, value: 520000 },
  { name: 'Sep', income: 590000, expenses: 350000, profit: 240000, value: 590000 },
];

// Attendance data with value property added
const attendanceData: ChartData[] = [
  { name: 'Mon', present: 92, absent: 8, value: 92 },
  { name: 'Tue', present: 95, absent: 5, value: 95 },
  { name: 'Wed', present: 90, absent: 10, value: 90 },
  { name: 'Thu', present: 93, absent: 7, value: 93 },
  { name: 'Fri', present: 96, absent: 4, value: 96 },
];

// Grade trends data with value property added
const gradeTrends: ChartData[] = [
  { name: 'Class 6', science: 78, math: 82, english: 75, social: 73, value: 78 },
  { name: 'Class 7', science: 75, math: 80, english: 77, social: 72, value: 75 },
  { name: 'Class 8', science: 82, math: 85, english: 80, social: 78, value: 82 },
  { name: 'Class 9', science: 80, math: 78, english: 82, social: 76, value: 80 },
  { name: 'Class 10', science: 85, math: 88, english: 83, social: 80, value: 85 },
];

// No changes needed for feeCollectionData as it already has the value property
const feeCollectionData: ChartData[] = [
  { name: 'Paid', value: 76 },
  { name: 'Pending', value: 18 },
  { name: 'Defaulted', value: 6 },
];

// New data for school performance
const performanceData: ChartData[] = [
  { name: 'Academics', value: 87 },
  { name: 'Sports', value: 78 },
  { name: 'Arts', value: 72 },
  { name: 'Extracurricular', value: 83 },
  { name: 'Overall', value: 85 },
];

// Data for student enrollment trends
const enrollmentData: ChartData[] = [
  { name: '2020', value: 980, boys: 520, girls: 460 },
  { name: '2021', value: 1050, boys: 560, girls: 490 },
  { name: '2022', value: 1120, boys: 590, girls: 530 },
  { name: '2023', value: 1190, boys: 620, girls: 570 },
  { name: '2024', value: 1246, boys: 650, girls: 596 },
];

// Colors for charts
const COLORS = ['#FF9933', '#FFFFFF', '#138808', '#000080', '#8884d8', '#82ca9d'];
const PIE_COLORS = ['#4ade80', '#fbbf24', '#f87171'];
const TRICOLOR_GRADIENTS = ['from-[#FF9933] to-[#FFAC33]', 'from-[#138808] to-[#1DA010]', 'from-[#000080] to-[#0000A0]'];

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeAlerts, setActiveAlerts] = useState(6);
  
  useEffect(() => {
    // Set a tiny delay to allow the component to render fully before animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
      
      // Trigger a small confetti effect on dashboard load
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF9933', '#FFFFFF', '#138808']
      });
      
      // Show welcome toast
      toast({
        title: "Welcome to Admin Dashboard",
        description: "You have 6 new notifications to review",
        variant: "default",
      });
    }, 500);
    
    return () => clearTimeout(timer);
  }, [toast]);

  // Key statistics with trend indicators
  const statsCards: StatCardProps[] = [
    { 
      title: "Total Students", 
      value: "1,246", 
      change: "+12%", 
      trend: "up", 
      icon: <Users className="h-8 w-8" />,
      color: "from-[#FF9933] to-[#FFAC33]"
    },
    { 
      title: "Total Staff", 
      value: "87", 
      change: "+3%", 
      trend: "up", 
      icon: <UserCheck className="h-8 w-8" />,
      color: "from-[#138808] to-[#1DA010]"
    },
    { 
      title: "Fee Collection", 
      value: "₹12.8L", 
      change: "+8%", 
      trend: "up", 
      icon: <CircleDollarSign className="h-8 w-8" />,
      color: "from-[#000080] to-[#0000A0]"
    },
    { 
      title: "Attendance", 
      value: "94%", 
      change: "+2%", 
      trend: "up", 
      icon: <CheckCircle2 className="h-8 w-8" />,
      color: "from-[#FF9933] to-[#FFAC33]"
    },
    { 
      title: "Pending Actions", 
      value: "14", 
      change: "-5", 
      trend: "down", 
      icon: <AlertTriangle className="h-8 w-8" />,
      color: "from-[#138808] to-[#1DA010]"
    },
    { 
      title: "System Health", 
      value: "98%", 
      change: "+1%", 
      trend: "up", 
      icon: <Activity className="h-8 w-8" />,
      color: "from-[#000080] to-[#0000A0]"
    },
  ];
  
  // Admin modules
  const adminModules: ModuleCardProps[] = [
    { 
      title: "User Management", 
      description: "Manage users and roles", 
      icon: <Users className="h-6 w-6 text-[#FF9933]" />, 
      path: "/admin/users",
      isPriority: true,
      count: 14,
      completion: 85
    },
    { 
      title: "Staff Management", 
      description: "Manage school staff", 
      icon: <UserCheck className="h-6 w-6 text-[#138808]" />, 
      path: "/admin/staff",
      completion: 72
    },
    { 
      title: "Financial Overview", 
      description: "View financial reports and analytics", 
      icon: <DollarSign className="h-6 w-6 text-[#000080]" />, 
      path: "/admin/financial",
      isPriority: true,
      completion: 90
    },
    { 
      title: "Curriculum Generation", 
      description: "Generate AI-driven curricula", 
      icon: <GraduationCap className="h-6 w-6 text-[#FF9933]" />, 
      path: "/admin/curriculum-generation",
      isPriority: true,
      completion: 68
    },
    { 
      title: "Transport", 
      description: "Manage routes and assignments", 
      icon: <Bus className="h-6 w-6 text-[#138808]" />, 
      path: "/admin/routes",
      completion: 76
    },
    { 
      title: "Notifications", 
      description: "Send notifications to users", 
      icon: <Bell className="h-6 w-6 text-[#000080]" />, 
      path: "/admin/notifications",
      count: 8,
      completion: 94
    },
  ];

  // Dummy recent notifications
  const recentNotifications = [
    { id: 1, title: "New Student Registration", time: "10 mins ago", description: "A new student has been registered in Class 8B", priority: "normal" },
    { id: 2, title: "Fee Payment Reminder", time: "2 hours ago", description: "Fee payment reminder sent to 28 students", priority: "high" },
    { id: 3, title: "Staff Meeting", time: "5 hours ago", description: "Staff meeting scheduled for tomorrow at 10 AM", priority: "normal" },
    { id: 4, title: "System Update", time: "Yesterday", description: "System will be down for maintenance on Sunday from 2-4 AM", priority: "high" },
    { id: 5, title: "New Curriculum Approved", time: "Yesterday", description: "New science curriculum for Class 9 has been approved", priority: "normal" },
    { id: 6, title: "Transport Route Changed", time: "2 days ago", description: "Route #3 has been modified due to road construction", priority: "high" },
  ];

  // Dummy KPIs
  const keyPerformanceIndicators = [
    { label: "Fee Collection", target: "₹15L", achieved: "₹12.8L", percentage: 85 },
    { label: "Attendance Rate", target: "95%", achieved: "94%", percentage: 99 },
    { label: "Academic Performance", target: "85%", achieved: "82%", percentage: 96 },
    { label: "Transport Efficiency", target: "100%", achieved: "94%", percentage: 94 },
    { label: "Parent Satisfaction", target: "90%", achieved: "87%", percentage: 97 },
  ];

  // Dummy recent activities
  const recentActivities = [
    { action: "User Login", user: "Rahul Sharma", role: "Teacher", time: "5 minutes ago" },
    { action: "Grade Updated", user: "Priya Patel", role: "Teacher", time: "30 minutes ago" },
    { action: "Fee Payment", user: "Arjun Singh", role: "Parent", time: "1 hour ago" },
    { action: "Attendance Marked", user: "Meera Reddy", role: "Teacher", time: "2 hours ago" },
    { action: "Leave Request", user: "Vikram Joshi", role: "Staff", time: "3 hours ago" },
  ];

  // Pending approvals
  const pendingApprovals = [
    { type: "Leave Request", from: "Anjali Mehta", days: "3 days", status: "Pending" },
    { type: "Fee Concession", from: "Raj Kumar", amount: "₹5,000", status: "Pending" },
    { type: "Transport Change", from: "Neha Singh", route: "Route #2 to #5", status: "Pending" },
    { type: "Document Verification", from: "Kamal Verma", document: "Transfer Certificate", status: "Pending" },
  ];

  // Stat Card Component
  const StatCard = ({ title, value, change, trend, icon, color }: StatCardProps) => (
    <Card className={`border-0 shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-[0.03]`}></div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-medium text-[#000080]">{title}</CardTitle>
          </div>
          <div className={`p-2 rounded-full bg-gradient-to-br ${color} text-white`}>
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end">
          <div className="text-3xl font-bold bg-gradient-to-br from-[#000080] to-[#000080]/80 bg-clip-text text-transparent">
            {value}
          </div>
          <div className={`flex items-center px-2 py-1 rounded-full text-sm font-medium ${
            trend === 'up' 
              ? 'text-[#138808] bg-[#138808]/10' 
              : trend === 'down' 
                ? 'text-[#FF9933] bg-[#FF9933]/10'
                : 'text-[#000080] bg-[#000080]/10'
          }`}>
            {trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
            <span>{change}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Module Card Component
  const ModuleCard = ({ title, description, icon, path, isPriority, count, completion }: ModuleCardProps) => (
    <TricolorCard className={`h-full overflow-hidden transition-all duration-300 hover:shadow-lg
      ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: '50ms' }}
    >
      <CardHeader className={`pb-3 ${isPriority ? "bg-gradient-to-r from-[#FF9933]/5 to-[#FFAC33]/5" : ""}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white border border-[#138808]/20">
              {icon}
            </div>
            <CardTitle className="text-lg font-medium text-[#000080]">{title}</CardTitle>
          </div>
          <div className="flex gap-2">
            {isPriority && (
              <span className="px-2 py-1 bg-[#FF9933]/10 text-[#FF9933] text-xs font-medium rounded-full border border-[#FF9933]/20">
                Priority
              </span>
            )}
            {count !== undefined && (
              <span className="px-2 py-1 bg-[#000080]/10 text-[#000080] text-xs font-medium rounded-full border border-[#000080]/20">
                {count}
              </span>
            )}
          </div>
        </div>
        <CardDescription className="mt-1 text-[#000080]/70">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {completion !== undefined && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-[#000080]/70">Completion</span>
              <span className="text-[#000080]">{completion}%</span>
            </div>
            <Progress value={completion} className="h-2" 
              style={{
                background: "linear-gradient(to right, #ddd, #eee)",
                "--progress-background": `linear-gradient(to right, #FF9933, #FFAC33)`
              } as any}
            />
          </div>
        )}
        <Button
          variant="tricolor"
          onClick={() => navigate(path)}
          className="w-full"
        >
          Open {title}
        </Button>
      </CardContent>
    </TricolorCard>
  );

  // Alert Card Component
  const AlertCard = () => (
    <Card className="border-2 border-[#FF9933]/20 bg-gradient-to-br from-[#FF9933]/5 to-transparent">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-[#FF9933]" />
          <CardTitle className="text-lg font-medium text-[#FF9933]">Active Alerts</CardTitle>
          <span className="inline-flex justify-center items-center w-6 h-6 rounded-full bg-[#FF9933] text-white text-xs font-bold">
            {activeAlerts}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentNotifications.slice(0, 3).map((notification, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-[#FF9933]/10">
            <div className="mt-1 flex-shrink-0">
              <div className={`h-2 w-2 rounded-full ${notification.priority === 'high' ? 'bg-[#FF9933]' : 'bg-[#138808]'}`} />
            </div>
            <div>
              <h4 className="font-medium text-[#000080]">{notification.title}</h4>
              <p className="text-sm text-[#000080]/70 mt-1">{notification.description}</p>
              <p className="text-xs text-[#000080]/50 mt-1">{notification.time}</p>
            </div>
          </div>
        ))}
        <Button 
          variant="saffron" 
          className="w-full"
          onClick={() => navigate('/admin/notifications')}
        >
          View All Alerts
        </Button>
      </CardContent>
    </Card>
  );

  // Function for handling tab changes
  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    
    // Small confetti effect on tab change
    if (value !== "overview") {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.2 },
        colors: ['#FF9933', '#FFFFFF', '#138808']
      });
    }
  };

  return (
    <div className="min-h-screen pb-12">
      <div className="container mx-auto">
        <header className={`mb-8 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FF9933] to-[#FF9933]/80 bg-clip-text text-transparent mb-2">
            Administrative Dashboard
          </h1>
          <p className="text-[#000080]/80">
            Comprehensive school management platform with real-time insights and analytics
          </p>
        </header>
        
        <Tabs value={selectedTab} onValueChange={handleTabChange} className="mb-10">
          <TabsList className="mb-4 p-1 bg-white border border-[#138808]/20 shadow-sm rounded-lg w-full flex justify-between md:w-auto md:inline-flex">
            <TabsTrigger 
              value="overview" 
              className="text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF9933] data-[state=active]:to-[#FFAC33] data-[state=active]:text-white rounded-md flex-1 md:flex-initial"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="modules" 
              className="text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#138808] data-[state=active]:to-[#1DA010] data-[state=active]:text-white rounded-md flex-1 md:flex-initial"
            >
              All Modules
            </TabsTrigger>
            <TabsTrigger 
              value="reports" 
              className="text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#000080] data-[state=active]:to-[#0000A0] data-[state=active]:text-white rounded-md flex-1 md:flex-initial"
            >
              Reports & Analytics
            </TabsTrigger>
            <TabsTrigger 
              value="activities" 
              className="text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF9933] data-[state=active]:to-[#FFAC33] data-[state=active]:text-white rounded-md flex-1 md:flex-initial"
            >
              Activities
            </TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 animate-in fade-in duration-300">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {statsCards.map((stat, index) => (
                <StatCard 
                  key={index} 
                  title={stat.title} 
                  value={stat.value} 
                  change={stat.change} 
                  trend={stat.trend} 
                  icon={stat.icon}
                  color={stat.color}
                />
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Financial Chart */}
              <PremiumCard className="p-6 lg:col-span-2">
                <h3 className="text-xl font-bold text-[#000080] mb-4 flex items-center gap-2">
                  <CircleDollarSign className="h-5 w-5 text-[#FF9933]" />
                  Financial Trends
                </h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsAreaChart
                      data={financialData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FF9933" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#FF9933" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#000080" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#000080" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#138808" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#138808" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: '#000080', fontSize: 12 }} 
                        axisLine={{ stroke: '#e2e8f0' }}
                      />
                      <YAxis 
                        tick={{ fill: '#000080', fontSize: 12 }} 
                        axisLine={{ stroke: '#e2e8f0' }}
                        tickFormatter={(value) => `₹${value/1000}k`}
                      />
                      <RechartsTooltip formatter={(value: any) => [`₹${value.toLocaleString()}`, '']} />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="income" 
                        stroke="#FF9933" 
                        fillOpacity={1} 
                        fill="url(#colorIncome)" 
                        name="Income"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="expenses" 
                        stroke="#000080" 
                        fillOpacity={1} 
                        fill="url(#colorExpenses)" 
                        name="Expenses"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="profit" 
                        stroke="#138808" 
                        fillOpacity={1} 
                        fill="url(#colorProfit)" 
                        name="Profit"
                      />
                    </RechartsAreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button 
                    variant="glass-saffron"
                    size="sm"
                    onClick={() => navigate('/admin/financial')}
                  >
                    View Full Report
                  </Button>
                </div>
              </PremiumCard>
              
              {/* Alerts Section */}
              <AlertCard />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* KPI Tracking */}
              <GlassCard className="p-6 lg:col-span-2">
                <h3 className="text-xl font-bold text-[#000080] mb-4 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-[#138808]" />
                  Key Performance Indicators
                </h3>
                <div className="space-y-5">
                  {keyPerformanceIndicators.map((kpi, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="text-[#000080] font-medium">{kpi.label}</div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-[#000080]/70">Target: {kpi.target}</span>
                          <span className="text-[#138808] font-medium">Achieved: {kpi.achieved}</span>
                        </div>
                      </div>
                      <div className="relative h-2 w-full bg-[#F3F4F6] rounded-full overflow-hidden">
                        <div 
                          className="absolute h-full top-0 left-0 rounded-full"
                          style={{
                            width: `${kpi.percentage}%`,
                            background: kpi.percentage >= 90 
                              ? 'linear-gradient(to right, #138808, #138808)' 
                              : kpi.percentage >= 70 
                                ? 'linear-gradient(to right, #FF9933, #FFAC33)' 
                                : 'linear-gradient(to right, #FF0000, #FF5555)',
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
              
              {/* Fee Collection Chart */}
              <Card className="border-0 shadow-md">
                <CardHeader className="pb-2 border-b border-[#138808]/10">
                  <CardTitle className="text-lg font-medium text-[#000080] flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-[#FF9933]" />
                    Fee Collection
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={feeCollectionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={70}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {feeCollectionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                        <RechartsTooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-[#138808]/10">
                  <Button 
                    variant="glass-saffron"
                    size="sm"
                    className="w-full"
                    onClick={() => navigate('/admin/fees')}
                  >
                    Manage Fee Collection
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Quick Access Modules */}
            <div>
              <h3 className="text-xl font-bold text-[#000080] mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5 text-[#000080]" />
                Quick Access
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {adminModules.map((module, index) => (
                  <ModuleCard
                    key={index}
                    title={module.title}
                    description={module.description}
                    icon={module.icon}
                    path={module.path}
                    isPriority={module.isPriority}
                    count={module.count}
                    completion={module.completion}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Modules Tab */}
          <TabsContent value="modules" className="space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...adminModules, 
                { 
                  title: "Exam Management", 
                  description: "Manage exam schedules and results", 
                  icon: <FileCheck className="h-6 w-6 text-[#FF9933]" />, 
                  path: "/admin/exams/schedule",
                  isPriority: false,
                  count: 0,
                  completion: 82
                },
                { 
                  title: "Library", 
                  description: "Manage books and resources", 
                  icon: <Book className="h-6 w-6 text-[#138808]" />, 
                  path: "/admin/library",
                  isPriority: false,
                  count: 0,
                  completion: 65
                },
                { 
                  title: "Analytics", 
                  description: "View performance analytics", 
                  icon: <BarChart className="h-6 w-6 text-[#000080]" />, 
                  path: "/admin/analytics",
                  isPriority: false,
                  count: 0,
                  completion: 70
                },
                { 
                  title: "School Settings", 
                  description: "Configure school parameters", 
                  icon: <Settings className="h-6 w-6 text-[#FF9933]" />, 
                  path: "/admin/settings",
                  isPriority: false,
                  count: 0,
                  completion: 88
                },
                { 
                  title: "System Reports", 
                  description: "Generate and view system reports", 
                  icon: <FileBarChart className="h-6 w-6 text-[#138808]" />, 
                  path: "/admin/reports",
                  isPriority: false,
                  count: 0,
                  completion: 73
                },
                { 
                  title: "Hall Tickets", 
                  description: "Manage exam hall tickets", 
                  icon: <Ticket className="h-6 w-6 text-[#000080]" />, 
                  path: "/admin/hall-tickets",
                  isPriority: false,
                  count: 0,
                  completion: 60
                },
              ].map((module, index) => (
                <ModuleCard
                  key={index}
                  title={module.title}
                  description={module.description}
                  icon={module.icon}
                  path={module.path}
                  isPriority={module.isPriority}
                  count={module.count}
                  completion={module.completion}
                />
              ))}
            </div>
          </TabsContent>
          
          {/* Reports & Analytics Tab */}
          <TabsContent value="reports" className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Attendance Chart */}
              <Card className="border-0 shadow-md">
                <CardHeader className="pb-2 border-b border-[#138808]/10">
                  <CardTitle className="text-lg font-medium text-[#000080] flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#138808]" />
                    Daily Attendance Trends
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={attendanceData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        barSize={36}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" tick={{ fill: '#000080', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#000080', fontSize: 12 }} />
                        <RechartsTooltip />
                        <Legend />
                        <Bar dataKey="present" stackId="a" fill="#138808" name="Present" />
                        <Bar dataKey="absent" stackId="a" fill="#FF9933" name="Absent" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Student Enrollment Trends */}
              <Card className="border-0 shadow-md">
                <CardHeader className="pb-2 border-b border-[#138808]/10">
                  <CardTitle className="text-lg font-medium text-[#000080] flex items-center gap-2">
                    <Users className="h-5 w-5 text-[#000080]" />
                    Student Enrollment Trends
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={enrollmentData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        barSize={30}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" tick={{ fill: '#000080', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#000080', fontSize: 12 }} />
                        <RechartsTooltip />
                        <Legend />
                        <Bar dataKey="boys" fill="#000080" name="Boys" />
                        <Bar dataKey="girls" fill="#FF9933" name="Girls" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Academic Performance Chart */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2 border-b border-[#138808]/10">
                <CardTitle className="text-lg font-medium text-[#000080] flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#138808]" />
                  Academic Performance by Class
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={gradeTrends}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" tick={{ fill: '#000080', fontSize: 12 }} />
                      <YAxis tick={{ fill: '#000080', fontSize: 12 }} domain={[40, 100]} />
                      <RechartsTooltip />
                      <Legend />
                      <Line type="monotone" dataKey="science" stroke="#FF9933" activeDot={{ r: 8 }} name="Science" />
                      <Line type="monotone" dataKey="math" stroke="#138808" name="Math" />
                      <Line type="monotone" dataKey="english" stroke="#000080" name="English" />
                      <Line type="monotone" dataKey="social" stroke="#9333EA" name="Social Studies" />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* School Performance Overview */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2 border-b border-[#138808]/10">
                <CardTitle className="text-lg font-medium text-[#000080] flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-[#FF9933]" />
                  School Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={performanceData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      barSize={50}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" tick={{ fill: '#000080', fontSize: 12 }} />
                      <YAxis tick={{ fill: '#000080', fontSize: 12 }} domain={[0, 100]} />
                      <RechartsTooltip />
                      <Legend />
                      <Bar dataKey="value" name="Performance Score">
                        {performanceData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={index % 3 === 0 ? '#FF9933' : index % 3 === 1 ? '#138808' : '#000080'} 
                          />
                        ))}
                      </Bar>
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Generate Reports Card */}
            <Card className="border-0 shadow-md bg-gradient-to-r from-white to-[#F9F9F9] border border-[#138808]/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#000080] mb-2">Generate Custom Reports</h3>
                    <p className="text-[#000080]/70 mb-4">Create detailed custom reports for any time period or department</p>
                    <Button 
                      variant="tricolor"
                      onClick={() => navigate("/admin/reports")}
                    >
                      Generate Reports
                    </Button>
                  </div>
                  <div className="hidden md:block">
                    <FileBarChart className="h-24 w-24 text-[#138808]/20" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Activities Tab */}
          <TabsContent value="activities" className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card className="border-0 shadow-md">
                <CardHeader className="pb-2 border-b border-[#138808]/10">
                  <CardTitle className="text-lg font-medium text-[#000080] flex items-center gap-2">
                    <Activity className="h-5 w-5 text-[#FF9933]" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-[#138808]/10">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="p-4 hover:bg-[#F3F4F6] transition-colors">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-[#000080]">{activity.action}</h4>
                            <p className="text-sm text-[#000080]/70 mt-1">
                              {activity.user} <span className="text-[#138808]">({activity.role})</span>
                            </p>
                          </div>
                          <span className="text-xs text-[#000080]/50">{activity.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-[#138808]/10">
                  <Button 
                    variant="glass-blue"
                    size="sm"
                    className="w-full"
                  >
                    View All Activities
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Pending Approvals */}
              <Card className="border-0 shadow-md">
                <CardHeader className="pb-2 border-b border-[#138808]/10">
                  <CardTitle className="text-lg font-medium text-[#000080] flex items-center gap-2">
                    <Clock className="h-5 w-5 text-[#138808]" />
                    Pending Approvals
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-[#138808]/10">
                    {pendingApprovals.map((approval, index) => (
                      <div key={index} className="p-4 hover:bg-[#F3F4F6] transition-colors">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-[#000080] flex items-center gap-1">
                              <span className="inline-block w-2 h-2 rounded-full bg-[#FF9933]"></span>
                              {approval.type}
                            </h4>
                            <p className="text-sm text-[#000080]/70 mt-1">
                              From: <span className="text-[#000080]">{approval.from}</span>
                            </p>
                            <p className="text-sm text-[#000080]/70 mt-1">
                              {approval.days || approval.amount || approval.route || approval.document}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className="px-2 py-1 text-xs bg-[#FF9933]/10 text-[#FF9933] rounded-full">
                              {approval.status}
                            </span>
                            <div className="flex gap-1 mt-2">
                              <Button 
                                variant="glass-green" 
                                size="sm" 
                                className="px-2 py-1 h-auto text-xs"
                              >
                                Approve
                              </Button>
                              <Button 
                                variant="glass-saffron" 
                                size="sm" 
                                className="px-2 py-1 h-auto text-xs"
                              >
                                Reject
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-[#138808]/10">
                  <Button 
                    variant="glass-blue"
                    size="sm"
                    className="w-full"
                  >
                    View All Pending Approvals
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* System Information */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2 border-b border-[#138808]/10">
                <CardTitle className="text-lg font-medium text-[#000080] flex items-center gap-2">
                  <Info className="h-5 w-5 text-[#000080]" />
                  System Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-[#F3F4F6] rounded-lg">
                    <h4 className="text-sm font-medium text-[#000080]/70">System Version</h4>
                    <p className="text-lg font-bold text-[#000080]">EduSense 2.3.5</p>
                  </div>
                  <div className="p-4 bg-[#F3F4F6] rounded-lg">
                    <h4 className="text-sm font-medium text-[#000080]/70">Database Status</h4>
                    <p className="text-lg font-bold text-[#138808]">Healthy</p>
                  </div>
                  <div className="p-4 bg-[#F3F4F6] rounded-lg">
                    <h4 className="text-sm font-medium text-[#000080]/70">Last Backup</h4>
                    <p className="text-lg font-bold text-[#000080]">Today, 3:45 AM</p>
                  </div>
                  <div className="p-4 bg-[#F3F4F6] rounded-lg">
                    <h4 className="text-sm font-medium text-[#000080]/70">Storage Used</h4>
                    <p className="text-lg font-bold text-[#FF9933]">452 GB / 1 TB</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-base font-medium text-[#000080] mb-3">System Health</h4>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#000080]/70">Database Performance</span>
                        <span className="text-[#000080]">98%</span>
                      </div>
                      <div className="relative h-2 w-full bg-[#F3F4F6] rounded-full overflow-hidden">
                        <div className="absolute h-full top-0 left-0 rounded-full bg-[#138808]" style={{ width: '98%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#000080]/70">Server Load</span>
                        <span className="text-[#000080]">42%</span>
                      </div>
                      <div className="relative h-2 w-full bg-[#F3F4F6] rounded-full overflow-hidden">
                        <div className="absolute h-full top-0 left-0 rounded-full bg-[#138808]" style={{ width: '42%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#000080]/70">Storage Utilization</span>
                        <span className="text-[#000080]">45%</span>
                      </div>
                      <div className="relative h-2 w-full bg-[#F3F4F6] rounded-full overflow-hidden">
                        <div className="absolute h-full top-0 left-0 rounded-full bg-[#138808]" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-[#138808]/10">
                <Button 
                  variant="glass-blue"
                  size="sm"
                >
                  Run System Diagnostics
                </Button>
              </CardFooter>
            </Card>
            
            {/* Quick Tools */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="premium" className="h-auto py-6 flex flex-col items-center">
                <FileBarChart className="h-8 w-8 mb-2" />
                <span>Generate Report</span>
              </Button>
              <Button variant="premium-green" className="h-auto py-6 flex flex-col items-center">
                <Bell className="h-8 w-8 mb-2" />
                <span>Send Notification</span>
              </Button>
              <Button variant="premium-dark" className="h-auto py-6 flex flex-col items-center">
                <UserPlus className="h-8 w-8 mb-2" />
                <span>Add New User</span>
              </Button>
              <Button variant="tricolor" className="h-auto py-6 flex flex-col items-center">
                <Settings className="h-8 w-8 mb-2" />
                <span>System Settings</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;

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
  CheckCircle2, AlertTriangle, BarChart, Activity, CircleDollarSign
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
}

// Financial data now conforms to ChartData
const financialData: ChartData[] = [
  { name: 'Apr', income: 320000, expenses: 240000, profit: 80000, value: 320000 },
  { name: 'May', income: 380000, expenses: 260000, profit: 120000, value: 380000 },
  { name: 'Jun', income: 450000, expenses: 290000, profit: 160000, value: 450000 },
  { name: 'Jul', income: 420000, expenses: 270000, profit: 150000, value: 420000 },
  { name: 'Aug', income: 520000, expenses: 320000, profit: 200000, value: 520000 },
  { name: 'Sep', income: 590000, expenses: 350000, profit: 240000, value: 590000 },
];

// Attendance data now conforms to ChartData
const attendanceData: ChartData[] = [
  { name: 'Mon', present: 92, absent: 8, value: 92 },
  { name: 'Tue', present: 95, absent: 5, value: 95 },
  { name: 'Wed', present: 90, absent: 10, value: 90 },
  { name: 'Thu', present: 93, absent: 7, value: 93 },
  { name: 'Fri', present: 96, absent: 4, value: 96 },
];

// Grade trends data now conforms to ChartData
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

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
const PIE_COLORS = ['#4ade80', '#fbbf24', '#f87171'];

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Set a tiny delay to allow the component to render fully before animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
      
      // Trigger a small confetti effect on dashboard load
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4f46e5', '#3b82f6', '#0ea5e9']
      });
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Key statistics with trend indicators
  const statsCards: StatCardProps[] = [
    { 
      title: "Total Students", 
      value: "1,246", 
      change: "+12%", 
      trend: "up", 
      icon: <Users className="h-8 w-8" />,
      color: "from-blue-500 to-indigo-600"
    },
    { 
      title: "Total Staff", 
      value: "87", 
      change: "+3%", 
      trend: "up", 
      icon: <UserCheck className="h-8 w-8" />,
      color: "from-emerald-500 to-teal-600"
    },
    { 
      title: "Fee Collection", 
      value: "₹12.8L", 
      change: "+8%", 
      trend: "up", 
      icon: <CircleDollarSign className="h-8 w-8" />,
      color: "from-amber-500 to-orange-600"
    },
    { 
      title: "Attendance", 
      value: "94%", 
      change: "+2%", 
      trend: "up", 
      icon: <CheckCircle2 className="h-8 w-8" />,
      color: "from-green-500 to-emerald-600"
    },
    { 
      title: "Pending Actions", 
      value: "14", 
      change: "-5", 
      trend: "down", 
      icon: <AlertTriangle className="h-8 w-8" />,
      color: "from-rose-500 to-pink-600"
    },
    { 
      title: "System Health", 
      value: "98%", 
      change: "+1%", 
      trend: "up", 
      icon: <Activity className="h-8 w-8" />,
      color: "from-purple-500 to-violet-600"
    },
  ];
  
  // Admin modules
  const adminModules: ModuleCardProps[] = [
    { 
      title: "User Management", 
      description: "Manage users and roles", 
      icon: <Users className="h-6 w-6 text-blue-700" />, 
      path: "/admin/users",
      isPriority: true,
      count: 14,
      completion: 85
    },
    { 
      title: "Staff Management", 
      description: "Manage school staff", 
      icon: <UserCheck className="h-6 w-6 text-emerald-700" />, 
      path: "/admin/staff",
      completion: 72
    },
    { 
      title: "Financial Overview", 
      description: "View financial reports and analytics", 
      icon: <DollarSign className="h-6 w-6 text-amber-700" />, 
      path: "/admin/financial",
      isPriority: true,
      completion: 90
    },
    { 
      title: "Curriculum Generation", 
      description: "Generate AI-driven curricula", 
      icon: <GraduationCap className="h-6 w-6 text-indigo-700" />, 
      path: "/admin/curriculum-generation",
      isPriority: true,
      completion: 68
    },
    { 
      title: "Transport", 
      description: "Manage routes and assignments", 
      icon: <Bus className="h-6 w-6 text-orange-700" />, 
      path: "/admin/routes",
      completion: 76
    },
    { 
      title: "Notifications", 
      description: "Send notifications to users", 
      icon: <Bell className="h-6 w-6 text-purple-700" />, 
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
  ];

  // Dummy KPIs
  const keyPerformanceIndicators = [
    { label: "Fee Collection", target: "₹15L", achieved: "₹12.8L", percentage: 85 },
    { label: "Attendance Rate", target: "95%", achieved: "94%", percentage: 99 },
    { label: "Academic Performance", target: "85%", achieved: "82%", percentage: 96 },
    { label: "Transport Efficiency", target: "100%", achieved: "94%", percentage: 94 },
  ];

  // Stat Card Component
  const StatCard = ({ title, value, change, trend, icon, color }: StatCardProps) => (
    <Card className={`border-0 shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-[0.03]`}></div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-medium text-slate-700">{title}</CardTitle>
          </div>
          <div className={`p-2 rounded-full bg-gradient-to-br ${color} text-white`}>
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end">
          <div className="text-3xl font-bold bg-gradient-to-br from-slate-700 to-slate-900 bg-clip-text text-transparent">
            {value}
          </div>
          <div className={`flex items-center px-2 py-1 rounded-full text-sm font-medium ${
            trend === 'up' 
              ? 'text-emerald-700 bg-emerald-50' 
              : trend === 'down' 
                ? 'text-rose-700 bg-rose-50'
                : 'text-amber-700 bg-amber-50'
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
    <Card className={`h-full overflow-hidden transition-all duration-300 hover:shadow-lg border-0 shadow-md
      ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: '50ms' }}
    >
      <CardHeader className={`pb-3 ${isPriority ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100" : ""}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-100 border border-slate-200">
              {icon}
            </div>
            <CardTitle className="text-lg font-medium text-slate-800">{title}</CardTitle>
          </div>
          <div className="flex gap-2">
            {isPriority && (
              <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full border border-amber-200">
                Priority
              </span>
            )}
            {count && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full border border-blue-200">
                {count}
              </span>
            )}
          </div>
        </div>
        <CardDescription className="mt-1 text-slate-600 text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {completion !== undefined && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-600">Completion</span>
              <span className="text-slate-800">{completion}%</span>
            </div>
            <Progress value={completion} className="h-2" 
              style={{
                background: "linear-gradient(to right, #ddd, #eee)",
                "--progress-background": `linear-gradient(to right, #3b82f6, #6366f1)`
              } as any}
            />
          </div>
        )}
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-sm"
          onClick={() => navigate(path)}
        >
          Open {title}
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
        colors: ['#4f46e5', '#3b82f6', '#0ea5e9']
      });
    }
  };

  return (
    <div className="min-h-screen pb-12">
      <div className="container mx-auto">
        <header className={`mb-8 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent mb-2">
            Administrative Dashboard
          </h1>
          <p className="text-slate-600">
            Comprehensive school management platform with real-time insights and analytics
          </p>
        </header>
        
        <Tabs value={selectedTab} onValueChange={handleTabChange} className="mb-10">
          <TabsList className="mb-4 p-1 bg-white border border-slate-200 shadow-sm rounded-lg">
            <TabsTrigger 
              value="overview" 
              className="text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-md"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="modules" 
              className="text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-md"
            >
              All Modules
            </TabsTrigger>
            <TabsTrigger 
              value="reports" 
              className="text-sm font-medium data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-md"
            >
              Reports & Analytics
            </TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
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
            
            {/* Financial Chart */}
            <PremiumCard className="p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Financial Trends</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsAreaChart
                    data={financialData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: '#64748b', fontSize: 12 }} 
                      axisLine={{ stroke: '#cbd5e1' }}
                    />
                    <YAxis 
                      tick={{ fill: '#64748b', fontSize: 12 }} 
                      axisLine={{ stroke: '#cbd5e1' }}
                      tickFormatter={(value) => `₹${value/1000}k`}
                    />
                    <RechartsTooltip formatter={(value: any) => [`₹${value.toLocaleString()}`, '']} />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="income" 
                      stroke="#3b82f6" 
                      fillOpacity={1} 
                      fill="url(#colorIncome)" 
                      name="Income"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="expenses" 
                      stroke="#ef4444" 
                      fillOpacity={1} 
                      fill="url(#colorExpenses)" 
                      name="Expenses"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="profit" 
                      stroke="#22c55e" 
                      fillOpacity={1} 
                      fill="url(#colorProfit)" 
                      name="Profit"
                    />
                  </RechartsAreaChart>
                </ResponsiveContainer>
              </div>
            </PremiumCard>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* KPI Tracking */}
              <GlassCard className="p-6 lg:col-span-2">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Key Performance Indicators</h3>
                <div className="space-y-5">
                  {keyPerformanceIndicators.map((kpi, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="text-slate-700 font-medium">{kpi.label}</div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-slate-500">Target: {kpi.target}</span>
                          <span className="text-emerald-600 font-medium">Achieved: {kpi.achieved}</span>
                        </div>
                      </div>
                      <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="absolute h-full top-0 left-0 rounded-full"
                          style={{
                            width: `${kpi.percentage}%`,
                            background: kpi.percentage >= 90 
                              ? 'linear-gradient(to right, #22c55e, #16a34a)' 
                              : kpi.percentage >= 70 
                                ? 'linear-gradient(to right, #f59e0b, #d97706)' 
                                : 'linear-gradient(to right, #ef4444, #dc2626)',
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
              
              {/* Notifications */}
              <Card className="lg:col-span-1 border-0 shadow-md">
                <CardHeader className="pb-2 border-b">
                  <CardTitle className="text-lg font-medium text-slate-800">Recent Notifications</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-100">
                    {recentNotifications.map((notification) => (
                      <div key={notification.id} className="p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start gap-2">
                          <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                            notification.priority === 'high' ? 'bg-rose-500' : 'bg-blue-500'
                          }`}></div>
                          <div>
                            <h4 className="font-medium text-slate-800">{notification.title}</h4>
                            <p className="text-sm text-slate-600 mt-1">{notification.description}</p>
                            <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t">
                  <Button 
                    variant="ghost" 
                    className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    onClick={() => navigate("/admin/notifications")}
                  >
                    View All Notifications
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Quick Access Modules */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Quick Access</h3>
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
                  icon: <FileCheck className="h-6 w-6 text-rose-700" />, 
                  path: "/admin/exams/schedule",
                  isPriority: false,
                  count: 0,
                  completion: 82
                },
                { 
                  title: "Library", 
                  description: "Manage books and resources", 
                  icon: <Book className="h-6 w-6 text-teal-700" />, 
                  path: "/admin/library",
                  isPriority: false,
                  count: 0,
                  completion: 65
                },
                { 
                  title: "Analytics", 
                  description: "View performance analytics", 
                  icon: <BarChart className="h-6 w-6 text-violet-700" />, 
                  path: "/admin/analytics",
                  isPriority: false,
                  count: 0,
                  completion: 70
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
                <CardHeader className="pb-2 border-b">
                  <CardTitle className="text-lg font-medium text-slate-800">Daily Attendance Trends</CardTitle>
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
                        <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                        <RechartsTooltip />
                        <Legend />
                        <Bar dataKey="present" stackId="a" fill="#22c55e" name="Present" />
                        <Bar dataKey="absent" stackId="a" fill="#ef4444" name="Absent" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Fee Collection Chart */}
              <Card className="border-0 shadow-md">
                <CardHeader className="pb-2 border-b">
                  <CardTitle className="text-lg font-medium text-slate-800">Fee Collection Status</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={feeCollectionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
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
              </Card>
            </div>
            
            {/* Academic Performance Chart */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-lg font-medium text-slate-800">Academic Performance by Class</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={gradeTrends}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
                      <YAxis tick={{ fill: '#64748b', fontSize: 12 }} domain={[40, 100]} />
                      <RechartsTooltip />
                      <Legend />
                      <Line type="monotone" dataKey="science" stroke="#3b82f6" activeDot={{ r: 8 }} name="Science" />
                      <Line type="monotone" dataKey="math" stroke="#22c55e" name="Math" />
                      <Line type="monotone" dataKey="english" stroke="#f59e0b" name="English" />
                      <Line type="monotone" dataKey="social" stroke="#8b5cf6" name="Social Studies" />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Generate Reports Card */}
            <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Generate Custom Reports</h3>
                    <p className="text-slate-600 mb-4">Create detailed custom reports for any time period or department</p>
                    <Button 
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-sm"
                      onClick={() => navigate("/admin/reports")}
                    >
                      Generate Reports
                    </Button>
                  </div>
                  <div className="hidden md:block">
                    <BarChart2 className="h-24 w-24 text-blue-200" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;

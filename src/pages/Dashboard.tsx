
import React, { useEffect, useState } from 'react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { LogOutIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

// Define dashboard features based on role
const dashboardFeatures: Record<UserRole, {title: string, items: {name: string, description: string, link: string, icon: string, priority?: boolean}[]}> = {
  parent: {
    title: "Parent Dashboard",
    items: [
      {
        name: "Student Diary",
        description: "View daily diary entries and important notes",
        link: "/diary",
        icon: "📝",
        priority: true
      },
      {
        name: "Fees Payment",
        description: "View and pay school fees",
        link: "/fees",
        icon: "💰",
        priority: true
      },
      {
        name: "Transport",
        description: "Track school bus and view route details",
        link: "/transport",
        icon: "🚌"
      },
      {
        name: "Smart Alerts",
        description: "AI-driven alerts about your child",
        link: "/alerts",
        icon: "🔔"
      },
      {
        name: "Notifications",
        description: "School announcements and updates",
        link: "/notifications",
        icon: "📢",
        priority: true
      },
      {
        name: "Progress Reports",
        description: "Academic performance and AI trends",
        link: "/reports",
        icon: "📊"
      },
      {
        name: "Schedule",
        description: "Class timetable and daily schedule",
        link: "/schedule",
        icon: "📅"
      },
      {
        name: "Student Profile",
        description: "Student details and career predictions",
        link: "/student-profile",
        icon: "👤"
      },
      {
        name: "Event Calendar",
        description: "School events and important dates",
        link: "/calendar",
        icon: "🗓️"
      },
      {
        name: "Leave Management",
        description: "Apply for and track leave requests",
        link: "/leaves",
        icon: "🏠"
      },
      {
        name: "School Store",
        description: "Purchase uniforms and books",
        link: "/store",
        icon: "🛒"
      },
      {
        name: "Feedback",
        description: "Share your thoughts with the school",
        link: "/feedback",
        icon: "📝"
      },
      {
        name: "Help & Support",
        description: "FAQs and contact information",
        link: "/help",
        icon: "❓"
      },
      {
        name: "Hall Tickets",
        description: "Download exam hall tickets",
        link: "/hall-tickets",
        icon: "🎫"
      },
      {
        name: "Parent-Teacher Meetings",
        description: "Schedule and feedback for PTMs",
        link: "/ptm",
        icon: "👨‍👩‍👧‍👦"
      }
    ]
  },
  teacher: {
    title: "Teacher Dashboard",
    items: [
      {
        name: "Attendance Entry",
        description: "Mark student attendance",
        link: "/teacher/attendance",
        icon: "✓",
        priority: true
      },
      {
        name: "Diary Management",
        description: "Create and view student diary entries",
        link: "/teacher/diary",
        icon: "📝",
        priority: true
      },
      {
        name: "Grade Management",
        description: "Enter and view student grades",
        link: "/teacher/grades",
        icon: "📊",
        priority: true
      },
      {
        name: "Assessments",
        description: "Generate and manage AI-driven assessments",
        link: "/teacher/assessments",
        icon: "📚"
      },
      {
        name: "Student Performance",
        description: "View detailed student analytics",
        link: "/teacher/performance",
        icon: "📈"
      },
      {
        name: "Parent Communication",
        description: "Message parents and send updates",
        link: "/teacher/communication",
        icon: "✉️"
      },
      {
        name: "Lesson Planning",
        description: "Create and manage lesson plans",
        link: "/teacher/lessons",
        icon: "📚"
      },
      {
        name: "Schedule",
        description: "View class timetables and schedule",
        link: "/schedule",
        icon: "📅"
      },
      {
        name: "Notifications",
        description: "School announcements and updates",
        link: "/notifications",
        icon: "📢"
      }
    ]
  },
  admin: {
    title: "Admin Dashboard",
    items: [
      {
        name: "User Management",
        description: "Manage users and roles",
        link: "/admin/users",
        icon: "👥",
        priority: true
      },
      {
        name: "School Settings",
        description: "Configure school parameters",
        link: "/admin/settings",
        icon: "⚙️"
      },
      {
        name: "Financial Overview",
        description: "View financial reports and analytics",
        link: "/admin/financial",
        icon: "💹",
        priority: true
      },
      {
        name: "Staff Management",
        description: "Manage school staff",
        link: "/admin/staff",
        icon: "👨‍🏫"
      },
      {
        name: "System Reports",
        description: "Generate and view system reports",
        link: "/admin/reports",
        icon: "📑"
      }
    ]
  },
  driver: {
    title: "Driver Dashboard",
    items: [
      {
        name: "Tracking",
        description: "View and update your current route",
        link: "/driver/tracking",
        icon: "🚌",
        priority: true
      },
      {
        name: "Notifications",
        description: "View important updates and alerts",
        link: "/driver/notifications",
        icon: "🔔"
      }
    ]
  }
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    if (!hasAnimated) {
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF9933', '#FFFFFF', '#138808']
        });
        setHasAnimated(true);
      }, 800);
    }
  }, [hasAnimated]);
  
  if (!user) {
    return null; // Should be handled by protected route
  }
  
  const features = dashboardFeatures[user.role];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <header className="bg-white shadow-md border-b border-[#138808]/20">
        <div className="container mx-auto py-4 px-6 flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-bold text-lg text-[#000080]">{user.name}</p>
              <div className="inline-flex items-center px-3 py-1 bg-[#138808]/10 rounded-full mt-1">
                <span className="text-sm text-[#138808] font-medium capitalize">{user.role}</span>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={logout}
              className="rounded-full h-10 w-10 border-[#FF9933] hover:bg-[#FF9933]/5"
            >
              <LogOutIcon className="h-5 w-5 text-[#FF9933]" />
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-10 px-6 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2 text-[#FF9933]">{features.title}</h1>
        <p className="text-[#000080] mb-8 text-lg">Welcome back! Here's your dashboard.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.items.map((item, index) => (
            <Link 
              to={item.link} 
              key={index}
              className="block"
            >
              <div className={`rounded-xl border ${item.priority ? 'border-[#138808]' : 'border-[#138808]/30'} 
                bg-white p-6 shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col`}>
                <div className="flex items-start mb-4">
                  <span className="text-3xl mr-4">{item.icon}</span>
                  <h2 className="text-xl font-bold text-[#000080]">{item.name}</h2>
                  {item.priority && (
                    <span className="ml-auto px-2 py-1 bg-[#FF9933]/10 text-[#FF9933] text-xs font-medium rounded-full">
                      Priority
                    </span>
                  )}
                </div>
                <p className="text-[#000080]/80 mb-6 text-base">
                  {item.description}
                </p>
                <div className="mt-auto">
                  <Button 
                    variant="tricolor" 
                    size="lg"
                    className="w-full"
                  >
                    Open {item.name}
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

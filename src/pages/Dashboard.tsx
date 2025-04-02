import React from 'react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { LogOutIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

// Define dashboard features based on role
const dashboardFeatures: Record<UserRole, {title: string, items: {name: string, description: string, link: string, icon: string}[]}> = {
  parent: {
    title: "Parent Dashboard",
    items: [
      {
        name: "Student Diary",
        description: "View daily diary entries and important notes",
        link: "/diary",
        icon: "📝"
      },
      {
        name: "Fees Payment",
        description: "View and pay school fees",
        link: "/fees",
        icon: "💰"
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
        icon: "📢"
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
        icon: "✓"
      },
      {
        name: "Grade Management",
        description: "Enter and view student grades",
        link: "/teacher/grades",
        icon: "📊"
      },
      {
        name: "Lesson Planning",
        description: "Create and manage lesson plans",
        link: "/teacher/lessons",
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
        icon: "👥"
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
        icon: "💹"
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
        icon: "🚌"
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
  
  if (!user) {
    return null; // Should be handled by protected route
  }
  
  const features = dashboardFeatures[user.role];
  
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-4 px-6 flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-slate-500 capitalize">{user.role}</p>
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={logout}
              className="rounded-full h-10 w-10"
            >
              <LogOutIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-6">
        <h1 className="text-3xl font-bold mb-8">{features.title}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.items.map((item, index) => (
            <Link 
              to={item.link} 
              key={index}
              className="block"
            >
              <div className="edu-card hover:shadow-lg transition-shadow h-full">
                <div className="flex items-start mb-4">
                  <span className="text-3xl mr-3">{item.icon}</span>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                </div>
                <p className="text-slate-500 mb-4">
                  {item.description}
                </p>
                <Button className="edu-button-secondary w-full mt-auto">
                  Open {item.name}
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

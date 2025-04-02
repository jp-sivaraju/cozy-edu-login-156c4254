
import React from 'react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { LogOutIcon } from 'lucide-react';

// Define dashboard features based on role
const dashboardFeatures: Record<UserRole, {title: string, items: string[]}> = {
  parent: {
    title: "Parent Dashboard",
    items: [
      "Student Progress",
      "Fees Payment",
      "Attendance Report",
      "Events Calendar",
      "Teacher Communication"
    ]
  },
  teacher: {
    title: "Teacher Dashboard",
    items: [
      "Attendance Entry",
      "Grade Management",
      "Lesson Planning",
      "Student Performance",
      "Parent Communication"
    ]
  },
  admin: {
    title: "Admin Dashboard",
    items: [
      "User Management",
      "School Settings",
      "Financial Overview",
      "Staff Management",
      "System Reports"
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
            <div 
              key={index} 
              className="edu-card hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-4">{item}</h2>
              <p className="text-slate-500 mb-4">
                Access and manage {item.toLowerCase()} information.
              </p>
              <Button className="edu-button-secondary">
                View {item}
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

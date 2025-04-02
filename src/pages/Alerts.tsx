
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Mock API call
const fetchAlerts = async () => {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data
  return [
    { 
      id: 'alert001', 
      type: 'attendance',
      title: "Attendance Alert", 
      description: "Ravi has been absent for 3 days this month. Is everything okay?",
      createdAt: "2023-10-15T10:30:00Z"
    },
    { 
      id: 'alert002', 
      type: 'academic',
      title: "Academic Performance", 
      description: "Ravi's mathematics scores have dropped by 15%. Consider scheduling a meeting with the teacher.",
      createdAt: "2023-10-10T14:20:00Z"
    },
    { 
      id: 'alert003', 
      type: 'health',
      title: "Health Check Reminder", 
      description: "Ravi's annual health check is due next week. Please ensure he attends.",
      createdAt: "2023-10-05T09:15:00Z"
    }
  ];
};

const Alerts = () => {
  const [activeTab, setActiveTab] = useState("recent");
  const { user } = useAuth();
  
  const { data: alerts = [], isLoading, error } = useQuery({
    queryKey: ['alerts'],
    queryFn: fetchAlerts
  });

  // Filter alerts by type
  const recentAlerts = alerts.filter(alert => 
    new Date(alert.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );
  
  const academicAlerts = alerts.filter(alert => alert.type === 'academic');
  const attendanceAlerts = alerts.filter(alert => alert.type === 'attendance');
  const healthAlerts = alerts.filter(alert => alert.type === 'health');

  const renderAlerts = (alertList: any[]) => {
    if (alertList.length === 0) {
      return (
        <div className="text-center py-8 text-slate-400">
          <Bell className="mx-auto h-12 w-12 mb-2 opacity-20" />
          <p>No alerts in this category</p>
        </div>
      );
    }

    return alertList.map(alert => (
      <Alert key={alert.id} className="mb-4 border-l-4 border-[#FF9933]">
        <AlertTitle className="text-[#000080] font-medium">
          {alert.title}
        </AlertTitle>
        <AlertDescription className="text-slate-700">
          {alert.description}
        </AlertDescription>
        <p className="text-xs text-slate-500 mt-2">
          {new Date(alert.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </Alert>
    ));
  };

  return (
    <DashboardLayout>
      <div className="container p-6">
        <h1 className="text-3xl font-bold text-[#138808] mb-2">Smart Alerts</h1>
        <p className="text-slate-500 mb-6">
          AI-driven insights to help you stay informed about {user?.name}'s education
        </p>
        
        <Tabs defaultValue="recent" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-slate-100">
            <TabsTrigger 
              value="recent"
              className={`flex-1 ${activeTab === "recent" ? "bg-[#FF9933] text-white" : ""}`}
            >
              Recent Alerts
            </TabsTrigger>
            <TabsTrigger 
              value="academic"
              className={`flex-1 ${activeTab === "academic" ? "bg-[#FF9933] text-white" : ""}`}
            >
              Academic
            </TabsTrigger>
            <TabsTrigger 
              value="attendance"
              className={`flex-1 ${activeTab === "attendance" ? "bg-[#FF9933] text-white" : ""}`}
            >
              Attendance
            </TabsTrigger>
            <TabsTrigger 
              value="health"
              className={`flex-1 ${activeTab === "health" ? "bg-[#FF9933] text-white" : ""}`}
            >
              Health
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent" className="mt-0">
            <Card>
              <CardHeader className="bg-[#FF9933]/10">
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>Alerts from the last 7 days</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="h-8 w-8 border-4 border-t-[#138808] border-[#138808]/20 rounded-full animate-spin"></div>
                  </div>
                ) : error ? (
                  <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>Failed to load alerts. Please try again.</AlertDescription>
                  </Alert>
                ) : (
                  renderAlerts(recentAlerts)
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="academic" className="mt-0">
            <Card>
              <CardHeader className="bg-[#FF9933]/10">
                <CardTitle>Academic Alerts</CardTitle>
                <CardDescription>Performance and academic-related alerts</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="h-8 w-8 border-4 border-t-[#138808] border-[#138808]/20 rounded-full animate-spin"></div>
                  </div>
                ) : (
                  renderAlerts(academicAlerts)
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="attendance" className="mt-0">
            <Card>
              <CardHeader className="bg-[#FF9933]/10">
                <CardTitle>Attendance Alerts</CardTitle>
                <CardDescription>Absence and attendance pattern alerts</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="h-8 w-8 border-4 border-t-[#138808] border-[#138808]/20 rounded-full animate-spin"></div>
                  </div>
                ) : (
                  renderAlerts(attendanceAlerts)
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="health" className="mt-0">
            <Card>
              <CardHeader className="bg-[#FF9933]/10">
                <CardTitle>Health Alerts</CardTitle>
                <CardDescription>Health check reminders and wellness alerts</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="h-8 w-8 border-4 border-t-[#138808] border-[#138808]/20 rounded-full animate-spin"></div>
                  </div>
                ) : (
                  renderAlerts(healthAlerts)
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Alerts;

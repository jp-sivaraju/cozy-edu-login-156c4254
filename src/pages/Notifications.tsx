
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Bell, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

// Mock API call
const fetchNotifications = async () => {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data
  return [
    { 
      id: 'notif001', 
      type: 'fees',
      title: "Fees Payment Reminder", 
      description: "Term 2 fees are due on October 30th. Please make the payment to avoid late fees.",
      createdAt: "2023-10-15T10:30:00Z",
      isRead: false
    },
    { 
      id: 'notif002', 
      type: 'diary',
      title: "New Diary Entry", 
      description: "A new diary entry has been added for today with important homework details.",
      createdAt: "2023-10-10T14:20:00Z",
      isRead: true
    },
    { 
      id: 'notif003', 
      type: 'event',
      title: "Annual Sports Day", 
      description: "The Annual Sports Day is scheduled for November 15th. All parents are invited.",
      createdAt: "2023-10-05T09:15:00Z",
      isRead: false
    }
  ];
};

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { user } = useAuth();
  
  const [notificationSettings, setNotificationSettings] = useState({
    fees: true,
    diary: true,
    events: true,
    alerts: true,
    attendance: true,
    academic: true
  });
  
  const { data: notifications = [], isLoading, error } = useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications
  });

  const handleSettingChange = (setting: string) => {
    setNotificationSettings(prev => {
      const newSettings = { ...prev, [setting]: !prev[setting as keyof typeof prev] };
      
      // In a real app, this would call an API to update user preferences
      toast({
        title: "Notification setting updated",
        description: `${setting.charAt(0).toUpperCase() + setting.slice(1)} notifications are now ${newSettings[setting as keyof typeof newSettings] ? 'enabled' : 'disabled'}.`
      });
      
      return newSettings;
    });
  };

  const renderNotifications = (notifList: any[]) => {
    if (notifList.length === 0) {
      return (
        <div className="text-center py-8 text-slate-400">
          <Bell className="mx-auto h-12 w-12 mb-2 opacity-20" />
          <p>No notifications in this category</p>
        </div>
      );
    }

    return notifList.map(notif => (
      <Alert key={notif.id} className={`mb-4 border-l-4 border-[#FF9933] ${!notif.isRead ? 'bg-[#138808]/5' : ''}`}>
        <div className="flex items-start justify-between">
          <div>
            <AlertTitle className="text-[#000080] font-medium">
              {notif.title}
            </AlertTitle>
            <AlertDescription className="text-slate-700">
              {notif.description}
            </AlertDescription>
            <p className="text-xs text-slate-500 mt-2">
              {new Date(notif.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          {!notif.isRead && (
            <span className="bg-[#138808] text-white text-xs px-2 py-1 rounded-full">
              New
            </span>
          )}
        </div>
      </Alert>
    ));
  };

  return (
    <DashboardLayout>
      <div className="container p-6">
        <h1 className="text-3xl font-bold text-[#138808] mb-2">Notifications</h1>
        <p className="text-slate-500 mb-6">
          Stay up to date with important school announcements and updates
        </p>
        
        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-slate-100">
            <TabsTrigger 
              value="all"
              className={`flex-1 ${activeTab === "all" ? "bg-[#FF9933] text-white" : ""}`}
            >
              All Notifications
            </TabsTrigger>
            <TabsTrigger 
              value="unread"
              className={`flex-1 ${activeTab === "unread" ? "bg-[#FF9933] text-white" : ""}`}
            >
              Unread
            </TabsTrigger>
            <TabsTrigger 
              value="settings"
              className={`flex-1 ${activeTab === "settings" ? "bg-[#FF9933] text-white" : ""}`}
            >
              <Settings className="h-4 w-4 mr-2" /> Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <Card>
              <CardHeader className="bg-[#FF9933]/10">
                <CardTitle>All Notifications</CardTitle>
                <CardDescription>View all your notifications</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="h-8 w-8 border-4 border-t-[#138808] border-[#138808]/20 rounded-full animate-spin"></div>
                  </div>
                ) : error ? (
                  <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>Failed to load notifications. Please try again.</AlertDescription>
                  </Alert>
                ) : (
                  renderNotifications(notifications)
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="unread" className="mt-0">
            <Card>
              <CardHeader className="bg-[#FF9933]/10">
                <CardTitle>Unread Notifications</CardTitle>
                <CardDescription>View your unread notifications</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="h-8 w-8 border-4 border-t-[#138808] border-[#138808]/20 rounded-full animate-spin"></div>
                  </div>
                ) : (
                  renderNotifications(notifications.filter(n => !n.isRead))
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-0">
            <Card>
              <CardHeader className="bg-[#FF9933]/10">
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Customize which notifications you receive</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="fees" className="text-base font-medium">Fees Notifications</Label>
                      <p className="text-sm text-slate-500">Receive reminders about fee payments</p>
                    </div>
                    <Switch 
                      id="fees" 
                      checked={notificationSettings.fees}
                      onCheckedChange={() => handleSettingChange('fees')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="diary" className="text-base font-medium">Diary Entries</Label>
                      <p className="text-sm text-slate-500">Receive notifications for new diary entries</p>
                    </div>
                    <Switch 
                      id="diary" 
                      checked={notificationSettings.diary}
                      onCheckedChange={() => handleSettingChange('diary')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="events" className="text-base font-medium">Events & Calendar</Label>
                      <p className="text-sm text-slate-500">Receive notifications about upcoming events</p>
                    </div>
                    <Switch 
                      id="events" 
                      checked={notificationSettings.events}
                      onCheckedChange={() => handleSettingChange('events')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="alerts" className="text-base font-medium">Smart Alerts</Label>
                      <p className="text-sm text-slate-500">Receive AI-generated alerts and insights</p>
                    </div>
                    <Switch 
                      id="alerts" 
                      checked={notificationSettings.alerts}
                      onCheckedChange={() => handleSettingChange('alerts')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="attendance" className="text-base font-medium">Attendance Updates</Label>
                      <p className="text-sm text-slate-500">Receive notifications about attendance</p>
                    </div>
                    <Switch 
                      id="attendance" 
                      checked={notificationSettings.attendance}
                      onCheckedChange={() => handleSettingChange('attendance')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="academic" className="text-base font-medium">Academic Updates</Label>
                      <p className="text-sm text-slate-500">Receive notifications about academic performance</p>
                    </div>
                    <Switch 
                      id="academic" 
                      checked={notificationSettings.academic}
                      onCheckedChange={() => handleSettingChange('academic')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;

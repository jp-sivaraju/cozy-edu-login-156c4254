
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Bell } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import DriverDashboardLayout from '@/components/layouts/DriverDashboardLayout';
import { useToast } from '@/hooks/use-toast';

// Mock API service for driver notifications
const fetchDriverNotifications = async () => {
  // In a real implementation, this would call the GET /api/driver/notifications API
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulating API delay
  
  return [
    { 
      notification_id: "NOTIF001", 
      message: "Route updated: Stop at Whitefield added at 8:15 AM", 
      created_at: "2025-04-02T08:30:00Z",
      read: false,
      type: "route_update"
    },
    { 
      notification_id: "NOTIF002", 
      message: "Delay notification sent to parents for Route A", 
      created_at: "2025-04-02T09:15:00Z",
      read: true,
      type: "delay"
    },
    { 
      notification_id: "NOTIF003", 
      message: "School start time changed to 9:30 AM due to weather", 
      created_at: "2025-04-01T18:00:00Z",
      read: true,
      type: "school"
    },
    { 
      notification_id: "NOTIF004", 
      message: "New student added to your route: Rahul K, Stop: Koramangala", 
      created_at: "2025-03-30T14:20:00Z",
      read: true,
      type: "student"
    },
    { 
      notification_id: "NOTIF005", 
      message: "Please update your driver profile with current contact information", 
      created_at: "2025-03-28T11:00:00Z",
      read: false,
      type: "profile"
    }
  ];
};

// Mock API service for updating notification settings
const updateNotificationSettings = async (settings: any) => {
  // In a real implementation, this would call the POST /api/driver/notifications/settings API
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulating API delay
  return { success: true, message: "Notification settings updated successfully" };
};

// Mock API service for marking notifications as read
const markNotificationsRead = async (notificationIds: string[]) => {
  // In a real implementation, this would call the POST /api/driver/notifications/mark_read API
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulating API delay
  return { success: true, message: `${notificationIds.length} notifications marked as read` };
};

const Notifications = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [notificationSettings, setNotificationSettings] = useState({
    routeUpdates: true,
    studentChanges: true,
    delayNotifications: true,
    schoolAnnouncements: true,
    sound: true,
    vibration: true
  });
  const [isUpdatingSettings, setIsUpdatingSettings] = useState(false);
  
  const { 
    data: notifications, 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['driverNotifications'],
    queryFn: fetchDriverNotifications,
  });

  const getFilteredNotifications = () => {
    if (!notifications) return [];
    
    switch (activeTab) {
      case 'unread':
        return notifications.filter(notif => !notif.read);
      case 'route':
        return notifications.filter(notif => ['route_update', 'delay'].includes(notif.type));
      case 'school':
        return notifications.filter(notif => ['school', 'profile'].includes(notif.type));
      default:
        return notifications;
    }
  };

  const handleSettingChange = (setting: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  const saveNotificationSettings = async () => {
    setIsUpdatingSettings(true);
    try {
      const result = await updateNotificationSettings(notificationSettings);
      toast({
        title: "Settings Updated",
        description: result.message,
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update notification settings.",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingSettings(false);
    }
  };

  const handleMarkAllRead = async () => {
    const unreadNotifications = notifications?.filter(n => !n.read) || [];
    if (unreadNotifications.length === 0) {
      toast({
        title: "No unread notifications",
        description: "All notifications are already marked as read.",
      });
      return;
    }
    
    try {
      const notificationIds = unreadNotifications.map(n => n.notification_id);
      const result = await markNotificationsRead(notificationIds);
      toast({
        title: "Notifications Updated",
        description: result.message,
      });
      refetch();
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to mark notifications as read.",
        variant: "destructive",
      });
    }
  };

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString([], { 
        day: '2-digit', 
        month: 'short',
        year: 'numeric' 
      }) + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  if (isLoading) {
    return (
      <DriverDashboardLayout>
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex flex-col space-y-6">
            <Skeleton className="h-8 w-60 mb-2" />
            <Skeleton className="h-6 w-80 mb-4" />
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>
      </DriverDashboardLayout>
    );
  }

  if (error) {
    return (
      <DriverDashboardLayout>
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load notifications. Please try again later.
            </AlertDescription>
          </Alert>
        </div>
      </DriverDashboardLayout>
    );
  }

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  return (
    <DriverDashboardLayout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-[#FF9933]">Notifications</h1>
            <p className="text-[#000080]">Stay updated with important alerts</p>
          </div>

          {unreadCount > 0 && (
            <Alert className="border-[#138808] bg-[#F0FFF0]">
              <Bell className="h-4 w-4 text-[#138808]" />
              <AlertTitle className="text-[#000080] font-medium">
                You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </AlertTitle>
              <AlertDescription className="text-slate-600 flex justify-between items-center">
                <span>Important updates may require your attention.</span>
                <Button 
                  variant="outline" 
                  onClick={handleMarkAllRead}
                  className="border-[#138808] text-[#138808] hover:bg-[#138808]/5"
                >
                  Mark all as read
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-6 bg-slate-100 p-1">
              <TabsTrigger 
                value="all" 
                className={`${activeTab === 'all' ? 'bg-[#FF9933] text-white font-medium' : 'text-slate-700'}`}>
                All
              </TabsTrigger>
              <TabsTrigger 
                value="unread"
                className={`${activeTab === 'unread' ? 'bg-[#FF9933] text-white font-medium' : 'text-slate-700'}`}>
                Unread
              </TabsTrigger>
              <TabsTrigger 
                value="route"
                className={`${activeTab === 'route' ? 'bg-[#FF9933] text-white font-medium' : 'text-slate-700'}`}>
                Route
              </TabsTrigger>
              <TabsTrigger 
                value="school"
                className={`${activeTab === 'school' ? 'bg-[#FF9933] text-white font-medium' : 'text-slate-700'}`}>
                School
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              <div className="space-y-6">
                {/* Notification List */}
                <Card className="p-6 border-[#138808] border-t-4 shadow-md">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-[#FF9933]">
                      <Bell className="inline mr-2 text-[#FF9933]" size={20} />
                      {activeTab === 'unread' ? 'Unread Notifications' : 
                       activeTab === 'route' ? 'Route Notifications' :
                       activeTab === 'school' ? 'School Notifications' : 'All Notifications'}
                    </h2>
                  </div>

                  {filteredNotifications.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">
                      <Bell className="mx-auto h-12 w-12 text-slate-300 mb-2" />
                      <p className="text-lg">No notifications found</p>
                      <p className="text-sm">Check back later for updates</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredNotifications.map((notification) => (
                        <div 
                          key={notification.notification_id} 
                          className={`notification-item ${!notification.read ? 'bg-[#FFF9F0]' : ''}`}
                        >
                          <div className="flex justify-between">
                            <p className={`${!notification.read ? 'font-medium text-[#000080]' : 'text-slate-700'} text-base`}>
                              {notification.message}
                            </p>
                            {!notification.read && (
                              <span className="bg-[#138808] h-3 w-3 rounded-full flex-shrink-0"></span>
                            )}
                          </div>
                          <p className="text-sm text-slate-500 mt-1">
                            {formatDate(notification.created_at)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>

                {/* Notification Settings */}
                <Card className="p-6">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-[#000080]">
                      Notification Settings
                    </h2>
                    <p className="text-slate-600">Customize your notification preferences</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-[#000080]">Route Updates</h3>
                        <p className="text-sm text-slate-500">Notifications when your route changes</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.routeUpdates}
                        onCheckedChange={() => handleSettingChange('routeUpdates')}
                        className="data-[state=checked]:bg-[#138808]"
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-[#000080]">Student Changes</h3>
                        <p className="text-sm text-slate-500">Notifications about student changes</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.studentChanges}
                        onCheckedChange={() => handleSettingChange('studentChanges')}
                        className="data-[state=checked]:bg-[#138808]"
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-[#000080]">Delay Notifications</h3>
                        <p className="text-sm text-slate-500">Notifications about delays</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.delayNotifications}
                        onCheckedChange={() => handleSettingChange('delayNotifications')}
                        className="data-[state=checked]:bg-[#138808]"
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-[#000080]">School Announcements</h3>
                        <p className="text-sm text-slate-500">General school announcements</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.schoolAnnouncements}
                        onCheckedChange={() => handleSettingChange('schoolAnnouncements')}
                        className="data-[state=checked]:bg-[#138808]"
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-[#000080]">Notification Sound</h3>
                        <p className="text-sm text-slate-500">Play sound for new notifications</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.sound}
                        onCheckedChange={() => handleSettingChange('sound')}
                        className="data-[state=checked]:bg-[#138808]"
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-[#000080]">Vibration</h3>
                        <p className="text-sm text-slate-500">Vibrate on new notifications</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.vibration}
                        onCheckedChange={() => handleSettingChange('vibration')}
                        className="data-[state=checked]:bg-[#138808]"
                      />
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        className="w-full bg-[#FF9933] hover:bg-[#FF9933]/90 text-white text-base"
                        onClick={saveNotificationSettings}
                        disabled={isUpdatingSettings}
                      >
                        {isUpdatingSettings ? "Saving..." : "Save Settings"}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DriverDashboardLayout>
  );
};

export default Notifications;

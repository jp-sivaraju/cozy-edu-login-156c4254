
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Bell, Check, AlertTriangle, Info, Settings } from 'lucide-react';

// Mock notifications data - would come from API in production
const driverNotifications = [
  {
    id: "NOTIF001",
    type: "alert",
    title: "Route Update",
    message: "Your route has been updated. Please check the new stops.",
    time: "2025-04-02T10:00:00Z",
    read: true
  },
  {
    id: "NOTIF002",
    type: "warning",
    title: "Traffic Alert",
    message: "Heavy traffic reported on Main Street. Consider alternate route.",
    time: "2025-04-02T09:30:00Z",
    read: false
  },
  {
    id: "NOTIF003",
    type: "info",
    title: "New Student",
    message: "New student added to your route: Arjun Reddy, Stop #3",
    time: "2025-04-01T15:20:00Z",
    read: true
  },
  {
    id: "NOTIF004",
    type: "alert",
    title: "Schedule Change",
    message: "School dismissal time changed to 3:30 PM tomorrow",
    time: "2025-04-01T14:10:00Z",
    read: false
  },
  {
    id: "NOTIF005",
    type: "info",
    title: "Fuel Reminder",
    message: "Please refuel the bus today",
    time: "2025-04-01T08:45:00Z",
    read: false
  }
];

// Notification settings
const notificationSettings = [
  { id: "route_updates", label: "Route Updates", enabled: true },
  { id: "traffic_alerts", label: "Traffic Alerts", enabled: true },
  { id: "schedule_changes", label: "Schedule Changes", enabled: true },
  { id: "student_updates", label: "Student Updates", enabled: false },
  { id: "weather_alerts", label: "Weather Alerts", enabled: true },
  { id: "maintenance_reminders", label: "Maintenance Reminders", enabled: false }
];

const DriverNotifications = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState(driverNotifications);
  const [settings, setSettings] = useState(notificationSettings);
  
  const getFilteredNotifications = () => {
    if (activeTab === "unread") {
      return notifications.filter(notif => !notif.read);
    }
    return notifications;
  };
  
  const markAsRead = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notif => ({ ...notif, read: true }))
    );
  };
  
  const toggleSetting = (id: string) => {
    setSettings(prevSettings => 
      prevSettings.map(setting => 
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <Bell className="h-5 w-5 text-[#FF9933]" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-[#FF9933]" />;
      case 'info':
        return <Info className="h-5 w-5 text-[#138808]" />;
      default:
        return <Bell className="h-5 w-5 text-[#FF9933]" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="container p-6">
        <h1 className="text-3xl font-bold mb-6 text-[#FF9933]">Driver Notifications</h1>
        
        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList className="bg-slate-100">
              <TabsTrigger 
                value="all"
                className={`${activeTab === "all" ? "bg-[#FF9933] text-white" : ""}`}
              >
                All
              </TabsTrigger>
              <TabsTrigger 
                value="unread"
                className={`${activeTab === "unread" ? "bg-[#FF9933] text-white" : ""}`}
              >
                Unread ({notifications.filter(n => !n.read).length})
              </TabsTrigger>
              <TabsTrigger 
                value="settings"
                className={`${activeTab === "settings" ? "bg-[#FF9933] text-white" : ""}`}
              >
                <Settings className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
            
            {activeTab !== 'settings' && (
              <Button
                variant="outline"
                className="border-[#138808]/30 hover:bg-[#138808]/5 text-[#000080]"
                onClick={markAllAsRead}
              >
                <Check className="mr-2 h-4 w-4 text-[#138808]" />
                Mark all as read
              </Button>
            )}
          </div>
          
          <TabsContent value="all" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#000080]">All Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getFilteredNotifications().map(notification => (
                    <div 
                      key={notification.id} 
                      className={`notification-item p-4 rounded-xl border-l-4 ${
                        notification.read 
                          ? 'bg-white border-[#138808]/30' 
                          : 'bg-[#138808]/5 border-[#138808]'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className="mr-3 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-[#000080]">{notification.title}</h3>
                            <span className="text-xs text-slate-500">
                              {new Date(notification.time).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-slate-600 mt-1">{notification.message}</p>
                          
                          {!notification.read && (
                            <div className="mt-3">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs border-[#138808]/30 hover:bg-[#138808]/5"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="mr-1 h-3 w-3" />
                                Mark as read
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {getFilteredNotifications().length === 0 && (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-4">
                        <Bell className="h-6 w-6 text-slate-400" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-700">No notifications</h3>
                      <p className="text-slate-500 mt-1">
                        {activeTab === 'unread' ? 'You have read all notifications.' : 'You don\'t have any notifications yet.'}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="unread" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#000080]">Unread Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getFilteredNotifications().map(notification => (
                    <div 
                      key={notification.id} 
                      className="notification-item p-4 rounded-xl border-l-4 bg-[#138808]/5 border-[#138808]"
                    >
                      <div className="flex items-start">
                        <div className="mr-3 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-[#000080]">{notification.title}</h3>
                            <span className="text-xs text-slate-500">
                              {new Date(notification.time).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-slate-600 mt-1">{notification.message}</p>
                          
                          <div className="mt-3">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs border-[#138808]/30 hover:bg-[#138808]/5"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="mr-1 h-3 w-3" />
                              Mark as read
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {getFilteredNotifications().length === 0 && (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-4">
                        <Check className="h-6 w-6 text-[#138808]" />
                      </div>
                      <h3 className="text-lg font-medium text-slate-700">All caught up!</h3>
                      <p className="text-slate-500 mt-1">You have read all notifications.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#000080]">Notification Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {settings.map(setting => (
                    <div 
                      key={setting.id} 
                      className="flex items-center justify-between p-3 border rounded-xl border-[#138808]/30"
                    >
                      <div>
                        <p className="font-medium text-[#000080]">{setting.label}</p>
                      </div>
                      <Switch 
                        checked={setting.enabled}
                        onCheckedChange={() => toggleSetting(setting.id)}
                        className="data-[state=checked]:bg-[#138808]"
                      />
                    </div>
                  ))}
                  
                  <Button 
                    className="mt-4 w-full bg-[#FF9933] hover:bg-[#FF9933]/90 text-white"
                  >
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DriverNotifications;

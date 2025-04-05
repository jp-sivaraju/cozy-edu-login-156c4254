
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import WeeklySchedule from '@/components/schedule/WeeklySchedule';

// This type definition aligns with our WeeklySchedule component
interface CalendarEvent {
  id: number;
  name: string;
  time: string;
  teacher: string;
  subject?: string;
  location?: string;
  color?: string;
}

const Schedule = () => {
  const [activeTab, setActiveTab] = useState('weekly');
  const [selectedChild, setSelectedChild] = useState('1');
  
  const { data, isLoading } = useQuery({
    queryKey: ['schedule', selectedChild],
    queryFn: async () => {
      // Simulating API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        children: [
          { id: '1', name: 'Aryan Singh', grade: '8A' },
          { id: '2', name: 'Diya Singh', grade: '5B' },
        ],
        events: [
          { 
            id: 1, 
            name: 'Mathematics', 
            time: '8:00 AM', 
            teacher: 'Mrs. Gupta',
            location: 'Room 101',
            subject: 'Mathematics'
          },
          { 
            id: 2, 
            name: 'Science', 
            time: '9:00 AM', 
            teacher: 'Mr. Sharma',
            location: 'Lab 3',
            subject: 'Science'
          },
          { 
            id: 3, 
            name: 'English', 
            time: '10:00 AM', 
            teacher: 'Mrs. Patel',
            location: 'Room 205',
            subject: 'English'
          },
          { 
            id: 4, 
            name: 'History', 
            time: '11:00 AM', 
            teacher: 'Mr. Kumar',
            location: 'Room 108',
            subject: 'History'
          },
          { 
            id: 5, 
            name: 'Lunch Break', 
            time: '12:00 PM', 
            teacher: 'N/A',
            location: 'Cafeteria'
          },
          { 
            id: 6, 
            name: 'Physical Education', 
            time: '1:00 PM', 
            teacher: 'Mr. Singh',
            location: 'Sports Field',
            subject: 'Physical Education'
          },
          { 
            id: 7, 
            name: 'Computer Science', 
            time: '2:00 PM', 
            teacher: 'Mrs. Reddy',
            location: 'Computer Lab',
            subject: 'Computer'
          }
        ]
      };
    }
  });
  
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold text-[#138808] mb-2">Class Schedule</h1>
          <p className="text-slate-500 mb-8">View your weekly and daily class schedules</p>
          
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 border-4 border-t-[#138808] border-[#138808]/20 rounded-full animate-spin"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-[#138808] mb-2">Class Schedule</h1>
        <p className="text-slate-500 mb-4">View your weekly and daily class schedules</p>
        
        {data && data.children && data.children.length > 1 && (
          <div className="mb-6 max-w-xs">
            <Select
              value={selectedChild}
              onValueChange={setSelectedChild}
            >
              <SelectTrigger className="border-[#138808]/30">
                <SelectValue placeholder="Select Student" />
              </SelectTrigger>
              <SelectContent>
                {data.children.map(child => (
                  <SelectItem key={child.id} value={child.id}>
                    {child.name} ({child.grade})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="mb-6"
        >
          <TabsList className="mb-6 bg-slate-100">
            <TabsTrigger 
              value="weekly"
              className={`flex-1 ${activeTab === "weekly" ? "bg-[#FF9933] text-white" : ""}`}
            >
              Weekly View
            </TabsTrigger>
            <TabsTrigger 
              value="daily"
              className={`flex-1 ${activeTab === "daily" ? "bg-[#FF9933] text-white" : ""}`}
            >
              Daily View
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly" className="mt-0">
            <Card className="border-[#138808]/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-[#000080]">Weekly Schedule</CardTitle>
                <CardDescription>
                  {data?.children.find(c => c.id === selectedChild)?.name}'s class schedule for the week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <WeeklySchedule events={data?.events as CalendarEvent[]} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="daily" className="mt-0">
            <Card className="border-[#138808]/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-[#000080]">Today's Schedule</CardTitle>
                <CardDescription>
                  {data?.children.find(c => c.id === selectedChild)?.name}'s classes for today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data?.events.map((event) => (
                    <div 
                      key={event.id}
                      className="flex items-center p-3 rounded-lg border border-[#138808]/20 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-20 text-center border-r border-[#138808]/20 pr-3">
                        <div className="font-medium text-[#000080]">{event.time}</div>
                      </div>
                      
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium">{event.name}</h3>
                        <div className="flex gap-4 mt-1 text-sm text-slate-500">
                          <div>Teacher: {event.teacher}</div>
                          {event.location && <div>Room: {event.location}</div>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Schedule;

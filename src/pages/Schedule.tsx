
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Book, MapPin, Clock } from 'lucide-react';

// Mock data for demonstration
const WEEKLY_SCHEDULE = [
  {
    day: 'Monday',
    classes: [
      { id: 1, name: 'Mathematics', teacher: 'Mrs. Sharma', time: '09:00 - 09:45', room: 'Room 101' },
      { id: 2, name: 'Science', teacher: 'Mr. Patel', time: '09:45 - 10:30', room: 'Lab 2' },
      { id: 3, name: 'Break', time: '10:30 - 10:45' },
      { id: 4, name: 'English', teacher: 'Mrs. Gupta', time: '10:45 - 11:30', room: 'Room 103' },
      { id: 5, name: 'History', teacher: 'Mr. Singh', time: '11:30 - 12:15', room: 'Room 105' },
    ]
  },
  {
    day: 'Tuesday',
    classes: [
      { id: 6, name: 'Science', teacher: 'Mr. Patel', time: '09:00 - 09:45', room: 'Lab 2' },
      { id: 7, name: 'Mathematics', teacher: 'Mrs. Sharma', time: '09:45 - 10:30', room: 'Room 101' },
      { id: 8, name: 'Break', time: '10:30 - 10:45' },
      { id: 9, name: 'Physical Education', teacher: 'Mr. Kumar', time: '10:45 - 11:30', room: 'Playground' },
      { id: 10, name: 'Art', teacher: 'Mrs. Gupta', time: '11:30 - 12:15', room: 'Art Studio' },
    ]
  },
  // Remaining days data...
];

// Mock calendar events
const CALENDAR_EVENTS = {
  "2025-04-04": [
    { id: 1, name: "Mathematics Test", time: "09:00 - 10:00", teacher: "Mrs. Sharma" },
    { id: 2, name: "Science Project Due", time: "14:00", teacher: "Mr. Patel" }
  ],
  "2025-04-05": [
    { id: 3, name: "Field Trip", time: "09:00 - 15:00", teacher: "Mr. Kumar" }
  ],
  "2025-04-08": [
    { id: 4, name: "Parent-Teacher Meeting", time: "16:00 - 18:00" }
  ],
  "2025-04-15": [
    { id: 5, name: "Annual Sports Day", time: "09:00 - 16:00" }
  ]
};

const Schedule = () => {
  const [activeTab, setActiveTab] = useState("weekly");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  const getEventsForDate = (date: Date | undefined) => {
    if (!date) return [];
    
    const dateStr = date.toISOString().split('T')[0];
    return CALENDAR_EVENTS[dateStr as keyof typeof CALENDAR_EVENTS] || [];
  };
  
  const renderWeeklyView = () => (
    <div className="space-y-6">
      {WEEKLY_SCHEDULE.map((day) => (
        <Card key={day.day} className="border-[#138808]/20 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#FF9933]/10 to-transparent pb-2">
            <CardTitle className="text-xl text-[#000080]">{day.day}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {day.classes.map((cls) => (
              <div 
                key={cls.id} 
                className={`p-4 border-b border-[#138808]/10 hover:bg-slate-50 transition-colors
                  ${cls.name === 'Break' ? 'bg-[#138808]/5' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-[#000080]">{cls.name}</h3>
                    {cls.teacher && <p className="text-sm text-slate-600">- {cls.teacher}</p>}
                  </div>
                  <Badge 
                    className={`${cls.name === 'Break' ? 'bg-[#138808]/80' : 'bg-[#FF9933]'}`}
                  >
                    {cls.time}
                  </Badge>
                </div>
                {cls.room && (
                  <div className="mt-2 text-xs text-slate-500 flex items-center">
                    <MapPin className="h-3 w-3 mr-1" /> {cls.room}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderCalendarView = () => (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
      <div className="md:col-span-3">
        <Card className="border-[#138808]/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-[#000080]">Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border border-[#138808]/20"
              modifiers={{
                booked: Object.keys(CALENDAR_EVENTS).map(date => new Date(date)),
              }}
              modifiersStyles={{
                booked: { 
                  fontWeight: 'bold',
                  backgroundColor: 'rgba(255, 153, 51, 0.15)',
                  color: '#000080',
                  border: '1px solid rgba(255, 153, 51, 0.3)'
                }
              }}
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="md:col-span-4">
        <Card className="border-[#138808]/20 h-full">
          <CardHeader className="bg-gradient-to-r from-[#FF9933]/10 to-transparent pb-2">
            <CardTitle className="text-lg text-[#000080]">
              Events for {formatDate(selectedDate)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {getEventsForDate(selectedDate).length > 0 ? (
              <div className="space-y-4">
                {getEventsForDate(selectedDate).map((event) => (
                  <div key={event.id} className="p-4 border border-[#138808]/20 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-[#000080]">{event.name}</h3>
                      <Badge className="bg-[#FF9933]">
                        <Clock className="h-3 w-3 mr-1" /> {event.time}
                      </Badge>
                    </div>
                    {event.teacher && (
                      <p className="text-sm text-slate-600 mt-2">
                        <Book className="h-3 w-3 inline mr-1" /> {event.teacher}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <Clock className="h-10 w-10 text-[#138808]/40 mb-2" />
                <p className="text-slate-500">No events scheduled for this date</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="container p-6">
        <h1 className="text-3xl font-bold text-[#FF9933] mb-2">Class Schedule</h1>
        <p className="text-slate-600 mb-6">View class timetable and daily schedule</p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-slate-100">
            <TabsTrigger 
              value="weekly"
              className={`flex-1 ${activeTab === "weekly" ? "bg-[#FF9933] text-white" : ""}`}
            >
              Weekly Timetable
            </TabsTrigger>
            <TabsTrigger 
              value="calendar"
              className={`flex-1 ${activeTab === "calendar" ? "bg-[#FF9933] text-white" : ""}`}
            >
              Calendar View
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly" className="mt-0">
            {renderWeeklyView()}
          </TabsContent>
          
          <TabsContent value="calendar" className="mt-0">
            {renderCalendarView()}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Schedule;

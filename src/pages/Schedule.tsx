
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Clock, Calendar as CalendarIcon, MapPin } from 'lucide-react';

// Mock API call for the timetable
const fetchTimetable = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    weekly: [
      {
        day: "Monday",
        periods: [
          { time: "09:00 - 09:45", subject: "Mathematics", teacher: "Mrs. Sharma", room: "Room 101" },
          { time: "09:45 - 10:30", subject: "Science", teacher: "Mr. Patel", room: "Lab 2" },
          { time: "10:30 - 10:45", subject: "Break", teacher: "", room: "" },
          { time: "10:45 - 11:30", subject: "English", teacher: "Mrs. Gupta", room: "Room 103" },
          { time: "11:30 - 12:15", subject: "Hindi", teacher: "Mr. Singh", room: "Room 105" },
          { time: "12:15 - 13:00", subject: "Lunch", teacher: "", room: "Cafeteria" },
          { time: "13:00 - 13:45", subject: "Social Studies", teacher: "Mrs. Das", room: "Room 107" },
          { time: "13:45 - 14:30", subject: "Physical Education", teacher: "Mr. Kumar", room: "Playground" }
        ]
      },
      {
        day: "Tuesday",
        periods: [
          { time: "09:00 - 09:45", subject: "Science", teacher: "Mr. Patel", room: "Lab 2" },
          { time: "09:45 - 10:30", subject: "Mathematics", teacher: "Mrs. Sharma", room: "Room 101" },
          { time: "10:30 - 10:45", subject: "Break", teacher: "", room: "" },
          { time: "10:45 - 11:30", subject: "Hindi", teacher: "Mr. Singh", room: "Room 105" },
          { time: "11:30 - 12:15", subject: "English", teacher: "Mrs. Gupta", room: "Room 103" },
          { time: "12:15 - 13:00", subject: "Lunch", teacher: "", room: "Cafeteria" },
          { time: "13:00 - 13:45", subject: "Art", teacher: "Mrs. Reddy", room: "Art Studio" },
          { time: "13:45 - 14:30", subject: "Computer Science", teacher: "Mr. Verma", room: "Computer Lab" }
        ]
      },
      // Additional days would follow the same pattern
    ],
    today: {
      day: "Monday",
      currentPeriod: { time: "09:45 - 10:30", subject: "Science", teacher: "Mr. Patel", room: "Lab 2" },
      nextPeriod: { time: "10:45 - 11:30", subject: "English", teacher: "Mrs. Gupta", room: "Room 103" }
    }
  };
};

const Schedule = () => {
  const [activeTab, setActiveTab] = useState("weekly");
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ['timetable'],
    queryFn: fetchTimetable,
  });

  const renderWeeklyTimetable = () => {
    if (!data) return null;

    return (
      <div className="space-y-6">
        {data.weekly.map((day, index) => (
          <Card key={index} className="border-[#138808]/30 overflow-hidden rounded-xl shadow-md">
            <CardHeader className="bg-[#FF9933]/10 border-b border-[#138808]/20">
              <CardTitle className="text-[#000080] text-xl font-bold">{day.day}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[#138808]/10">
                {day.periods.map((period, idx) => (
                  <div 
                    key={idx} 
                    className={`p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center ${
                      period.subject === "Break" || period.subject === "Lunch" 
                        ? "bg-[#138808]/5"
                        : ""
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center w-full">
                      <span className="text-sm sm:text-base text-[#000080] font-medium w-36 mb-1 sm:mb-0">
                        {period.time}
                      </span>
                      <div className="flex-1">
                        <p className="text-lg font-semibold text-[#000080]">
                          {period.subject}
                        </p>
                        {period.teacher && (
                          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
                            <p className="text-sm text-slate-500">
                              {period.teacher}
                            </p>
                            {period.room && (
                              <p className="text-sm flex items-center text-[#138808]">
                                <MapPin className="inline mr-1 h-3 w-3" />
                                {period.room}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderTodayTimetable = () => {
    if (!data) return null;
    
    return (
      <div className="space-y-6">
        <Card className="border-[#138808]/30 rounded-xl shadow-md">
          <CardHeader className="bg-[#FF9933]/10 border-b border-[#138808]/20">
            <CardTitle className="text-[#000080] text-xl font-bold">Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5 text-[#FF9933]" />
                <span className="text-lg font-medium text-[#000080]">{data.today.day}</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="border border-[#138808]/30 rounded-xl p-4 sm:p-6 bg-[#000080]/5">
                <p className="text-sm text-[#000080] font-medium mb-2">CURRENT PERIOD</p>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <p className="text-xl font-semibold text-[#000080]">{data.today.currentPeriod.subject}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                      <p className="text-sm text-slate-500">{data.today.currentPeriod.teacher}</p>
                      {data.today.currentPeriod.room && (
                        <p className="text-sm flex items-center text-[#138808]">
                          <MapPin className="inline mr-1 h-3 w-3" />
                          {data.today.currentPeriod.room}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center text-[#000080] mt-2 sm:mt-0">
                    <Clock className="mr-2 h-4 w-4" />
                    <span className="text-base">{data.today.currentPeriod.time}</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-[#FF9933]/30 rounded-xl p-4 sm:p-6 bg-[#FF9933]/5">
                <p className="text-sm text-[#FF9933] font-medium mb-2">NEXT PERIOD</p>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <p className="text-xl font-semibold text-[#000080]">{data.today.nextPeriod.subject}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                      <p className="text-sm text-slate-500">{data.today.nextPeriod.teacher}</p>
                      {data.today.nextPeriod.room && (
                        <p className="text-sm flex items-center text-[#138808]">
                          <MapPin className="inline mr-1 h-3 w-3" />
                          {data.today.nextPeriod.room}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center text-[#FF9933] mt-2 sm:mt-0">
                    <Clock className="mr-2 h-4 w-4" />
                    <span className="text-base">{data.today.nextPeriod.time}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="container p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#FF9933] mb-2">Class Schedule</h1>
        <p className="text-slate-500 mb-6">
          View class timetable and daily schedule
        </p>
        
        <Tabs defaultValue="weekly" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-slate-100 rounded-xl overflow-hidden">
            <TabsTrigger 
              value="weekly"
              className={`flex-1 py-2.5 text-base ${activeTab === "weekly" ? "bg-[#FF9933] text-white" : "text-[#000080]"}`}
            >
              Weekly Timetable
            </TabsTrigger>
            <TabsTrigger 
              value="today"
              className={`flex-1 py-2.5 text-base ${activeTab === "today" ? "bg-[#FF9933] text-white" : "text-[#000080]"}`}
            >
              Today
            </TabsTrigger>
          </TabsList>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="h-10 w-10 border-4 border-t-[#FF9933] border-[#138808]/20 rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <Alert variant="destructive" className="rounded-xl">
              <AlertDescription className="text-base">
                Failed to load timetable data. Please try again later.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <TabsContent value="weekly" className="mt-0">
                {renderWeeklyTimetable()}
              </TabsContent>
              
              <TabsContent value="today" className="mt-0">
                {renderTodayTimetable()}
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Schedule;

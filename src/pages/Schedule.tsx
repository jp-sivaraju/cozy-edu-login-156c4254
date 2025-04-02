
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Clock, Calendar as CalendarIcon } from 'lucide-react';

// Mock API call for the timetable
const fetchTimetable = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    weekly: [
      {
        day: "Monday",
        periods: [
          { time: "09:00 - 09:45", subject: "Mathematics", teacher: "Mrs. Sharma" },
          { time: "09:45 - 10:30", subject: "Science", teacher: "Mr. Patel" },
          { time: "10:30 - 10:45", subject: "Break", teacher: "" },
          { time: "10:45 - 11:30", subject: "English", teacher: "Mrs. Gupta" },
          { time: "11:30 - 12:15", subject: "Hindi", teacher: "Mr. Singh" },
          { time: "12:15 - 13:00", subject: "Lunch", teacher: "" },
          { time: "13:00 - 13:45", subject: "Social Studies", teacher: "Mrs. Das" },
          { time: "13:45 - 14:30", subject: "Physical Education", teacher: "Mr. Kumar" }
        ]
      },
      {
        day: "Tuesday",
        periods: [
          { time: "09:00 - 09:45", subject: "Science", teacher: "Mr. Patel" },
          { time: "09:45 - 10:30", subject: "Mathematics", teacher: "Mrs. Sharma" },
          { time: "10:30 - 10:45", subject: "Break", teacher: "" },
          { time: "10:45 - 11:30", subject: "Hindi", teacher: "Mr. Singh" },
          { time: "11:30 - 12:15", subject: "English", teacher: "Mrs. Gupta" },
          { time: "12:15 - 13:00", subject: "Lunch", teacher: "" },
          { time: "13:00 - 13:45", subject: "Art", teacher: "Mrs. Reddy" },
          { time: "13:45 - 14:30", subject: "Computer Science", teacher: "Mr. Verma" }
        ]
      },
      // Additional days would follow the same pattern
    ],
    today: {
      day: "Monday",
      currentPeriod: { time: "09:45 - 10:30", subject: "Science", teacher: "Mr. Patel" },
      nextPeriod: { time: "10:45 - 11:30", subject: "English", teacher: "Mrs. Gupta" }
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
          <Card key={index} className="border-[#138808]/30">
            <CardHeader className="bg-[#FF9933]/10 border-b border-[#138808]/20">
              <CardTitle className="text-[#000080]">{day.day}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[#138808]/10">
                {day.periods.map((period, idx) => (
                  <div 
                    key={idx} 
                    className={`p-4 flex justify-between items-center ${
                      period.subject === "Break" || period.subject === "Lunch" 
                        ? "bg-[#138808]/5"
                        : ""
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="w-24 text-sm text-[#000080] font-medium">
                        {period.time}
                      </span>
                      <div>
                        <p className="font-medium">
                          {period.subject}
                        </p>
                        {period.teacher && (
                          <p className="text-sm text-slate-500">
                            {period.teacher}
                          </p>
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
        <Card className="border-[#138808]/30">
          <CardHeader className="bg-[#FF9933]/10 border-b border-[#138808]/20">
            <CardTitle className="text-[#000080]">Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5 text-[#FF9933]" />
                <span className="text-lg font-medium">{data.today.day}</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="border border-[#138808]/30 rounded-lg p-4 bg-[#000080]/5">
                <p className="text-sm text-[#000080] font-medium mb-2">CURRENT PERIOD</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xl font-semibold">{data.today.currentPeriod.subject}</p>
                    <p className="text-sm text-slate-500">{data.today.currentPeriod.teacher}</p>
                  </div>
                  <div className="flex items-center text-[#000080]">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{data.today.currentPeriod.time}</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-[#FF9933]/30 rounded-lg p-4 bg-[#FF9933]/5">
                <p className="text-sm text-[#FF9933] font-medium mb-2">NEXT PERIOD</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xl font-semibold">{data.today.nextPeriod.subject}</p>
                    <p className="text-sm text-slate-500">{data.today.nextPeriod.teacher}</p>
                  </div>
                  <div className="flex items-center text-[#FF9933]">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{data.today.nextPeriod.time}</span>
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
      <div className="container p-6">
        <h1 className="text-3xl font-bold text-[#138808] mb-2">Class Schedule</h1>
        <p className="text-slate-500 mb-6">
          View class timetable and daily schedule
        </p>
        
        <Tabs defaultValue="weekly" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-slate-100">
            <TabsTrigger 
              value="weekly"
              className={`flex-1 ${activeTab === "weekly" ? "bg-[#FF9933] text-white" : ""}`}
            >
              Weekly Timetable
            </TabsTrigger>
            <TabsTrigger 
              value="today"
              className={`flex-1 ${activeTab === "today" ? "bg-[#FF9933] text-white" : ""}`}
            >
              Today
            </TabsTrigger>
          </TabsList>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="h-8 w-8 border-4 border-t-[#138808] border-[#138808]/20 rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertDescription>
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

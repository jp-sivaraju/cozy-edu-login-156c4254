
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { toast } from "sonner";
import { UserCheck, Calendar, HistoryIcon, CheckCircle, XCircle } from 'lucide-react';

// Mock student data - would come from API in production
const students = [
  { id: "STU001", name: "Ravi Sharma", present: true },
  { id: "STU002", name: "Priya Patel", present: false },
  { id: "STU003", name: "Aditya Singh", present: true },
  { id: "STU004", name: "Meera Kapoor", present: true },
  { id: "STU005", name: "Arjun Reddy", present: false },
];

// Mock attendance history - would come from API in production
const attendanceHistory = [
  { date: "2025-04-02", entries: [
    { id: "ATTEND001", student_id: "STU001", student_name: "Ravi Sharma", status: "present" },
    { id: "ATTEND002", student_id: "STU002", student_name: "Priya Patel", status: "absent" },
  ]},
  { date: "2025-04-01", entries: [
    { id: "ATTEND003", student_id: "STU001", student_name: "Ravi Sharma", status: "present" },
    { id: "ATTEND004", student_id: "STU002", student_name: "Priya Patel", status: "present" },
  ]},
];

const Attendance = () => {
  const [activeTab, setActiveTab] = useState("today");
  const [studentsStatus, setStudentsStatus] = useState(students);
  
  const handleToggleAttendance = (studentId: string) => {
    setStudentsStatus(prevStatus => 
      prevStatus.map(student => 
        student.id === studentId 
          ? { ...student, present: !student.present } 
          : student
      )
    );
  };
  
  const handleSubmit = () => {
    // In a real app, this would make an API call
    console.log("Submitting attendance:", studentsStatus);
    toast.success("Attendance submitted successfully!");
  };
  
  return (
    <DashboardLayout>
      <div className="container p-8">
        <div className="flex items-center gap-3 mb-8">
          <UserCheck className="h-8 w-8 text-[#FF9933]" />
          <h1 className="text-3xl font-bold text-[#FF9933]">Attendance Management</h1>
        </div>
        
        <Tabs defaultValue="today" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-white border border-[#138808]/30 p-1 rounded-xl">
            <TabsTrigger 
              value="today"
              className={`flex-1 py-3 rounded-lg ${activeTab === "today" ? "bg-[#FF9933] text-white" : "text-[#000080] hover:text-[#000080]/80"}`}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Today's Attendance
            </TabsTrigger>
            <TabsTrigger 
              value="history"
              className={`flex-1 py-3 rounded-lg ${activeTab === "history" ? "bg-[#FF9933] text-white" : "text-[#000080] hover:text-[#000080]/80"}`}
            >
              <HistoryIcon className="mr-2 h-5 w-5" />
              Attendance History
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#000080] flex items-center">
                  <Calendar className="mr-3 h-6 w-6 text-[#138808]" />
                  Mark Attendance - Today
                </CardTitle>
                <CardDescription className="text-base text-[#000080]/70">
                  Toggle the switch to mark students as present or absent
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentsStatus.map((student) => (
                    <div 
                      key={student.id} 
                      className={`flex items-center justify-between p-4 border-2 rounded-xl 
                        ${student.present 
                          ? 'border-[#138808] bg-[#138808]/5' 
                          : 'border-red-400 bg-red-50'
                        } transition-colors duration-200`}
                    >
                      <div>
                        <div className="flex items-center">
                          {student.present 
                            ? <CheckCircle className="h-5 w-5 mr-2 text-[#138808]" /> 
                            : <XCircle className="h-5 w-5 mr-2 text-red-500" />
                          }
                          <p className="font-semibold text-lg text-[#000080]">{student.name}</p>
                        </div>
                        <p className="text-sm text-[#000080]/70 mt-1">ID: {student.id}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-medium ${student.present ? 'text-[#138808]' : 'text-red-500'}`}>
                          {student.present ? 'Present' : 'Absent'}
                        </span>
                        <Switch 
                          checked={student.present}
                          onCheckedChange={() => handleToggleAttendance(student.id)}
                          className="data-[state=checked]:bg-[#138808]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant="tricolor"
                  size="lg"
                  className="mt-8 w-full"
                  onClick={handleSubmit}
                >
                  Submit Attendance
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#000080] flex items-center">
                  <HistoryIcon className="mr-3 h-6 w-6 text-[#138808]" />
                  Attendance History
                </CardTitle>
                <CardDescription className="text-base text-[#000080]/70">
                  View past attendance records for all students
                </CardDescription>
              </CardHeader>
              <CardContent>
                {attendanceHistory.map((day, index) => (
                  <div key={index} className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 bg-[#FF9933]/10 text-[#FF9933] px-4 py-2 rounded-lg inline-block">
                      <Calendar className="inline-block mr-2 h-5 w-5" />
                      {day.date}
                    </h3>
                    <div className="space-y-3">
                      {day.entries.map((entry) => (
                        <div 
                          key={entry.id} 
                          className={`flex items-center justify-between p-4 border-l-4 rounded-xl shadow-sm
                            ${entry.status === 'present' 
                              ? 'border-l-[#138808] bg-[#138808]/5' 
                              : 'border-l-red-500 bg-red-50'
                            }`}
                        >
                          <div>
                            <div className="flex items-center">
                              {entry.status === 'present' 
                                ? <CheckCircle className="h-5 w-5 mr-2 text-[#138808]" /> 
                                : <XCircle className="h-5 w-5 mr-2 text-red-500" />
                              }
                              <p className="font-medium text-lg text-[#000080]">{entry.student_name}</p>
                            </div>
                            <p className="text-sm text-[#000080]/70 mt-1">ID: {entry.student_id}</p>
                          </div>
                          <div>
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                              entry.status === 'present' 
                                ? 'bg-[#138808]/20 text-[#138808]' 
                                : 'bg-red-100 text-red-500'
                            }`}>
                              {entry.status === 'present' ? 'Present' : 'Absent'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Attendance;

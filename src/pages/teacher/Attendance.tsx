
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { toast } from "sonner";

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
      <div className="container p-6">
        <h1 className="text-3xl font-bold mb-6 text-[#FF9933]">Attendance Management</h1>
        
        <Tabs defaultValue="today" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-slate-100">
            <TabsTrigger 
              value="today"
              className={`flex-1 ${activeTab === "today" ? "bg-[#FF9933] text-white" : ""}`}
            >
              Today
            </TabsTrigger>
            <TabsTrigger 
              value="history"
              className={`flex-1 ${activeTab === "history" ? "bg-[#FF9933] text-white" : ""}`}
            >
              History
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#000080]">Mark Attendance - Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentsStatus.map((student) => (
                    <div 
                      key={student.id} 
                      className="flex items-center justify-between p-3 border rounded-xl border-[#138808]/30"
                    >
                      <div>
                        <p className="font-medium text-[#000080]">{student.name}</p>
                        <p className="text-sm text-slate-500">ID: {student.id}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${student.present ? 'text-[#138808]' : 'text-red-500'}`}>
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
                  className="mt-6 w-full bg-[#FF9933] hover:bg-[#FF9933]/90 text-white"
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
                <CardTitle className="text-[#000080]">Attendance History</CardTitle>
              </CardHeader>
              <CardContent>
                {attendanceHistory.map((day, index) => (
                  <div key={index} className="mb-6">
                    <h3 className="text-lg font-medium mb-3 text-[#FF9933]">{day.date}</h3>
                    <div className="space-y-3">
                      {day.entries.map((entry) => (
                        <div 
                          key={entry.id} 
                          className="flex items-center justify-between p-3 border rounded-xl border-[#138808]/30"
                        >
                          <div>
                            <p className="font-medium text-[#000080]">{entry.student_name}</p>
                            <p className="text-sm text-slate-500">ID: {entry.student_id}</p>
                          </div>
                          <div>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              entry.status === 'present' 
                                ? 'bg-[#138808]/10 text-[#138808]' 
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

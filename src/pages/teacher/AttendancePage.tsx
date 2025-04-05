
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import AttendanceGrid from '@/components/teacher/AttendanceGrid';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

const mockClasses = [
  { id: '1', name: '8A', section: 'Science', count: 32 },
  { id: '2', name: '8B', section: 'Science', count: 35 },
  { id: '3', name: '9A', section: 'Commerce', count: 30 },
];

const mockStudents = [
  { id: '1', name: 'Aryan Singh', rollNo: '1', section: '8A' },
  { id: '2', name: 'Diya Patel', rollNo: '2', section: '8A' },
  { id: '3', name: 'Vikram Mehta', rollNo: '3', section: '8A' },
  { id: '4', name: 'Neha Sharma', rollNo: '4', section: '8A' },
  { id: '5', name: 'Rahul Kumar', rollNo: '5', section: '8A' },
  { id: '6', name: 'Priya Gupta', rollNo: '6', section: '8A' },
  { id: '7', name: 'Aditya Verma', rollNo: '7', section: '8A' },
  { id: '8', name: 'Anjali Kapoor', rollNo: '8', section: '8A' },
  { id: '9', name: 'Rohan Joshi', rollNo: '9', section: '8A' },
  { id: '10', name: 'Meera Reddy', rollNo: '10', section: '8A' },
  { id: '11', name: 'Kunal Trivedi', rollNo: '11', section: '8A' },
  { id: '12', name: 'Sanya Malhotra', rollNo: '12', section: '8A' },
];

const AttendancePage = () => {
  const [selectedClass, setSelectedClass] = useState('1');
  const [date, setDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState('mark');
  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ['classStudents', selectedClass],
    queryFn: async () => {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return {
        className: mockClasses.find(c => c.id === selectedClass)?.name || '',
        students: mockStudents.filter(s => s.section === '8A')
      };
    }
  });

  const handleSaveAttendance = (attendanceData: { 
    date: Date; 
    students: Array<{ id: string, present: boolean }>
  }) => {
    console.log('Saving attendance data:', attendanceData);
    toast({
      title: "Attendance saved",
      description: `Attendance for ${data?.className} has been recorded successfully.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-[#138808] mb-2">Attendance Management</h1>
        <p className="text-slate-500 mb-6">Mark and manage student attendance records</p>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="w-full md:w-64">
            <label className="block text-[#000080] font-medium mb-2">Class</label>
            <Select
              value={selectedClass}
              onValueChange={setSelectedClass}
            >
              <SelectTrigger className="w-full border-[#138808]/30">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                {mockClasses.map(classItem => (
                  <SelectItem key={classItem.id} value={classItem.id}>
                    {classItem.name} ({classItem.section}) - {classItem.count} students
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-64">
            <label className="block text-[#000080] font-medium mb-2">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full border-[#138808]/30 justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="mb-6 bg-slate-100">
            <TabsTrigger 
              value="mark"
              className={`flex-1 ${activeTab === "mark" ? "bg-[#FF9933] text-white" : ""}`}
            >
              Mark Attendance
            </TabsTrigger>
            <TabsTrigger 
              value="report"
              className={`flex-1 ${activeTab === "report" ? "bg-[#FF9933] text-white" : ""}`}
            >
              Attendance Reports
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="mark" className="mt-0">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="h-8 w-8 border-4 border-t-[#138808] border-[#138808]/20 rounded-full animate-spin"></div>
              </div>
            ) : data ? (
              <AttendanceGrid 
                students={data.students} 
                date={date} 
                className={data.className}
                onSave={handleSaveAttendance}
              />
            ) : (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-slate-500">No class selected or data available.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="report" className="mt-0">
            <Card className="border-[#138808]/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-[#000080]">Attendance Reports</CardTitle>
                <CardDescription>View and export attendance reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500 py-20 text-center">
                  Attendance reporting features will be implemented soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AttendancePage;

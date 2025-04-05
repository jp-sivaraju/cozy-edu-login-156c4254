
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { CalendarIcon, Clock, Filter, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import AttendanceGrid from '@/components/teacher/AttendanceGrid';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// Mock data
const MOCK_CLASSES = [
  { id: 'class-1', name: 'Class 8A', section: 'A', grade: '8' },
  { id: 'class-2', name: 'Class 8B', section: 'B', grade: '8' },
  { id: 'class-3', name: 'Class 9A', section: 'A', grade: '9' },
];

const MOCK_STUDENTS = [
  { id: 'stud-1', name: 'Rahul Sharma', rollNo: '8A01', section: 'A' },
  { id: 'stud-2', name: 'Priya Singh', rollNo: '8A02', section: 'A' },
  { id: 'stud-3', name: 'Aditya Patel', rollNo: '8A03', section: 'A' },
  { id: 'stud-4', name: 'Neha Gupta', rollNo: '8A04', section: 'A' },
  { id: 'stud-5', name: 'Vikram Thapar', rollNo: '8A05', section: 'A' },
  { id: 'stud-6', name: 'Anjali Kumar', rollNo: '8A06', section: 'A' },
  { id: 'stud-7', name: 'Arjun Malhotra', rollNo: '8A07', section: 'A' },
  { id: 'stud-8', name: 'Meera Reddy', rollNo: '8A08', section: 'A' },
  { id: 'stud-9', name: 'Rohit Joshi', rollNo: '8A09', section: 'A' },
  { id: 'stud-10', name: 'Kavita Das', rollNo: '8A10', section: 'A' },
  { id: 'stud-11', name: 'Deepak Khanna', rollNo: '8A11', section: 'A' },
  { id: 'stud-12', name: 'Sonia Verma', rollNo: '8A12', section: 'A' },
];

const TeacherAttendance = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState<string>('');
  const { toast } = useToast();
  
  const { data: classData, isLoading: classesLoading } = useQuery({
    queryKey: ['teacherClasses'],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return MOCK_CLASSES;
    }
  });
  
  const { data: studentsData, isLoading: studentsLoading } = useQuery({
    queryKey: ['classStudents', selectedClass],
    queryFn: async () => {
      // Don't fetch if no class is selected
      if (!selectedClass) return [];
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      return MOCK_STUDENTS;
    },
    enabled: !!selectedClass
  });
  
  const handleSaveAttendance = (attendanceData: any) => {
    console.log('Saving attendance data:', attendanceData);
    // Would submit to API in a real implementation
  };
  
  const handleClassChange = (classId: string) => {
    setSelectedClass(classId);
  };
  
  return (
    <DashboardLayout>
      <div className="container p-6">
        <h1 className="text-3xl font-bold text-[#138808] mb-2">Attendance Management</h1>
        <p className="text-slate-500 mb-6">
          Record and manage student attendance
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="w-full md:w-1/3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-[#000080] text-xl">Attendance Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal border-[#138808]/30",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, 'PPP') : <span>Select date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => setSelectedDate(date as Date)}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Class</label>
                  <Select value={selectedClass} onValueChange={handleClassChange}>
                    <SelectTrigger className="w-full border-[#138808]/30">
                      <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classesLoading ? (
                        <div className="px-2 py-4 text-center">
                          <div className="h-5 w-5 mx-auto border-2 border-t-[#138808] border-[#138808]/20 rounded-full animate-spin"></div>
                        </div>
                      ) : (
                        classData?.map(cls => (
                          <SelectItem key={cls.id} value={cls.id}>
                            {cls.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-4">
                  <h3 className="font-medium mb-2">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-[#138808]/30 text-[#000080]"
                      onClick={() => {
                        toast({
                          title: "Attendance reports",
                          description: "Attendance reports feature is coming soon."
                        });
                      }}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      View Attendance Reports
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-[#138808]/30 text-[#000080]"
                      onClick={() => {
                        toast({
                          title: "Previous records",
                          description: "Previous attendance records feature is coming soon."
                        });
                      }}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Previous Attendance Records
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="w-full md:w-2/3">
            {!selectedClass ? (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <div className="text-[#000080]/60 mb-2">
                    <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <h3 className="text-lg font-medium">Select a Class</h3>
                    <p className="text-sm max-w-md mx-auto mt-2">
                      Choose a class from the dropdown to view and mark attendance for students
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : studentsLoading ? (
              <div className="h-full flex items-center justify-center p-12">
                <div className="h-8 w-8 border-4 border-t-[#138808] border-[#138808]/20 rounded-full animate-spin"></div>
              </div>
            ) : (
              <AttendanceGrid 
                students={studentsData || []}
                date={selectedDate}
                className={classData?.find(c => c.id === selectedClass)?.name || ''}
                onSave={handleSaveAttendance}
              />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherAttendance;

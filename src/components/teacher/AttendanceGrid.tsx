
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Save } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  rollNo: string;
  section: string;
}

interface AttendanceGridProps {
  students: Student[];
  date: Date;
  className: string;
  onSave: (attendanceData: { 
    date: Date; 
    students: Array<{ id: string, present: boolean }>
  }) => void;
}

const AttendanceGrid = ({ students, date, className, onSave }: AttendanceGridProps) => {
  const [attendance, setAttendance] = useState<Record<string, boolean>>(
    students.reduce((acc, student) => ({ ...acc, [student.id]: true }), {})
  );
  const [selectAll, setSelectAll] = useState(true);
  const { toast } = useToast();

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    const newAttendance = { ...attendance };
    students.forEach(student => {
      newAttendance[student.id] = checked;
    });
    setAttendance(newAttendance);
  };

  const handleStudentAttendance = (studentId: string, present: boolean) => {
    setAttendance({ ...attendance, [studentId]: present });
    
    // Update selectAll state based on whether all students are now present
    const allPresent = Object.values({ ...attendance, [studentId]: present }).every(v => v);
    setSelectAll(allPresent);
  };

  const handleSubmit = () => {
    const attendanceData = {
      date,
      students: students.map(student => ({
        id: student.id,
        present: attendance[student.id]
      }))
    };
    
    onSave(attendanceData);
    
    toast({
      title: "Attendance saved",
      description: `Attendance for ${className} on ${date.toLocaleDateString()} has been recorded.`,
    });
  };

  return (
    <Card className="attendance-grid">
      <CardHeader className="pb-2">
        <CardTitle className="text-[#000080] text-xl">
          {className} Attendance for {date.toLocaleDateString()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-2 border-b pb-2 border-[#138808]/20">
          <Checkbox 
            id="select-all" 
            checked={selectAll}
            onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
          />
          <label htmlFor="select-all" className="font-medium text-[#000080] cursor-pointer">
            All Present
          </label>
          <Button 
            variant="ghost" 
            className="ml-auto h-8 text-[#138808] hover:text-white hover:bg-[#138808]"
            onClick={handleSubmit}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Attendance
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {students.map(student => (
            <div 
              key={student.id} 
              className={`p-3 border rounded-md flex items-center gap-3 ${
                attendance[student.id] 
                  ? 'bg-[#138808]/5 border-[#138808]/20' 
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <Checkbox 
                id={`student-${student.id}`} 
                checked={attendance[student.id]}
                onCheckedChange={(checked) => handleStudentAttendance(student.id, checked as boolean)}
              />
              <div className="flex-1">
                <label 
                  htmlFor={`student-${student.id}`} 
                  className="font-medium cursor-pointer block"
                >
                  {student.name}
                </label>
                <div className="text-xs text-slate-500">Roll No: {student.rollNo}</div>
              </div>
              {attendance[student.id] && (
                <div className="h-6 w-6 rounded-full bg-[#138808]/10 flex items-center justify-center">
                  <Check className="h-3 w-3 text-[#138808]" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button 
            onClick={handleSubmit}
            className="bg-[#138808] hover:bg-[#138808]/90"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Attendance
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceGrid;

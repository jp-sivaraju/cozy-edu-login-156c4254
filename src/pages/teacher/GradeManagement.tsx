
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Save, Download, Upload, Check, X, Edit2 } from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';

const mockClasses = [
  { id: '1', name: '8A', section: 'Science' },
  { id: '2', name: '8B', section: 'Science' },
  { id: '3', name: '9A', section: 'Commerce' },
];

const mockSubjects = [
  { id: '1', name: 'Mathematics' },
  { id: '2', name: 'Science' },
  { id: '3', name: 'English' },
  { id: '4', name: 'Social Studies' },
];

const mockAssessments = [
  { id: '1', name: 'Unit Test 1', maxMarks: 25, date: '2023-04-15' },
  { id: '2', name: 'Mid Term', maxMarks: 50, date: '2023-06-10' },
  { id: '3', name: 'Project', maxMarks: 20, date: '2023-07-05' },
];

const mockStudents = [
  { id: '1', name: 'Aryan Singh', rollNo: '001', grades: { '1': 22, '2': 45, '3': 18 } },
  { id: '2', name: 'Diya Patel', rollNo: '002', grades: { '1': 20, '2': 42, '3': 15 } },
  { id: '3', name: 'Rahul Kumar', rollNo: '003', grades: { '1': 18, '2': 38, '3': 17 } },
  { id: '4', name: 'Neha Sharma', rollNo: '004', grades: { '1': 23, '2': 47, '3': 19 } },
  { id: '5', name: 'Vikram Mehta', rollNo: '005', grades: { '1': 21, '2': 44, '3': 16 } },
  { id: '6', name: 'Priya Gupta', rollNo: '006', grades: { '1': 19, '2': 41, '3': 18 } },
  { id: '7', name: 'Aditya Verma', rollNo: '007', grades: { '1': 24, '2': 48, '3': 19 } },
  { id: '8', name: 'Anjali Kapoor', rollNo: '008', grades: { '1': 20, '2': 43, '3': 17 } },
];

interface EditableGradeCellProps {
  studentId: string;
  assessmentId: string;
  initialValue: number;
  maxMarks: number;
  onSave: (studentId: string, assessmentId: string, value: number) => void;
}

const EditableGradeCell: React.FC<EditableGradeCellProps> = ({ 
  studentId, 
  assessmentId, 
  initialValue, 
  maxMarks,
  onSave 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue.toString());
  
  const handleSave = () => {
    const numValue = parseInt(value);
    if (isNaN(numValue) || numValue < 0 || numValue > maxMarks) {
      setValue(initialValue.toString());
      setIsEditing(false);
      return;
    }
    
    onSave(studentId, assessmentId, numValue);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setValue(initialValue.toString());
    setIsEditing(false);
  };
  
  if (isEditing) {
    return (
      <div className="flex items-center">
        <Input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-8 w-16 mr-1"
          min={0}
          max={maxMarks}
        />
        <div className="flex space-x-1">
          <button 
            onClick={handleSave}
            className="text-[#138808] hover:text-[#138808]/80"
          >
            <Check className="h-4 w-4" />
          </button>
          <button 
            onClick={handleCancel}
            className="text-red-500 hover:text-red-400"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className="cursor-pointer flex items-center justify-between py-1 px-2 rounded hover:bg-slate-100"
      onClick={() => setIsEditing(true)}
    >
      <span>{initialValue}</span>
      <Edit2 className="h-3 w-3 text-slate-400 opacity-0 group-hover:opacity-100" />
    </div>
  );
};

const GradeManagementPage = () => {
  const [selectedClass, setSelectedClass] = useState('1');
  const [selectedSubject, setSelectedSubject] = useState('1');
  const { toast } = useToast();
  
  const [studentGrades, setStudentGrades] = useState<any[]>([]);
  
  const { data, isLoading } = useQuery({
    queryKey: ['gradeData', selectedClass, selectedSubject],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setStudentGrades(mockStudents);
      
      return {
        className: mockClasses.find(c => c.id === selectedClass)?.name || '',
        subjectName: mockSubjects.find(s => s.id === selectedSubject)?.name || '',
        assessments: mockAssessments,
        students: mockStudents
      };
    }
  });
  
  const handleGradeChange = (studentId: string, assessmentId: string, newValue: number) => {
    setStudentGrades(prev => 
      prev.map(student => 
        student.id === studentId 
          ? { 
              ...student, 
              grades: { 
                ...student.grades, 
                [assessmentId]: newValue 
              } 
            }
          : student
      )
    );
    
    toast({
      title: "Grade updated",
      description: "Student grade has been updated successfully",
    });
  };
  
  const handleSaveAllGrades = () => {
    console.log("Saving all grades:", studentGrades);
    
    toast({
      title: "Grades saved",
      description: "All grades have been saved successfully",
    });
  };
  
  const handleExportExcel = () => {
    toast({
      title: "Exporting grades",
      description: "Your grades are being exported to Excel",
    });
  };
  
  const handleImportExcel = () => {
    toast({
      title: "Import grades",
      description: "Please upload an Excel file with the grades",
    });
  };
  
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-[#138808] mb-2">Grade Management</h1>
        <p className="text-slate-500 mb-6">Manage and track student grades</p>
        
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
                    {classItem.name} ({classItem.section})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-64">
            <label className="block text-[#000080] font-medium mb-2">Subject</label>
            <Select
              value={selectedSubject}
              onValueChange={setSelectedSubject}
            >
              <SelectTrigger className="w-full border-[#138808]/30">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                {mockSubjects.map(subject => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-grow md:flex md:items-end md:justify-end gap-2">
            <Button 
              variant="outline" 
              className="w-full md:w-auto mt-2 md:mt-0 border-[#138808]/30 text-[#138808]"
              onClick={handleImportExcel}
            >
              <Upload className="h-4 w-4 mr-2" />
              Import Excel
            </Button>
            <Button 
              variant="outline" 
              className="w-full md:w-auto mt-2 md:mt-0 border-[#138808]/30 text-[#138808]"
              onClick={handleExportExcel}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
            <Button 
              variant="tricolor" 
              className="w-full md:w-auto mt-2 md:mt-0"
              onClick={handleSaveAllGrades}
            >
              <Save className="h-4 w-4 mr-2" />
              Save All
            </Button>
          </div>
        </div>
        
        <Card className="border-[#138808]/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[#000080]">
              {data?.className} - {data?.subjectName} Grades
            </CardTitle>
            <CardDescription>
              Click on any grade to edit it
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="h-8 w-8 border-4 border-t-[#138808] border-[#138808]/20 rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Roll No</TableHead>
                      <TableHead className="w-[200px]">Student Name</TableHead>
                      {data?.assessments.map(assessment => (
                        <TableHead key={assessment.id}>
                          {assessment.name} <span className="text-slate-400">({assessment.maxMarks})</span>
                        </TableHead>
                      ))}
                      <TableHead>Total</TableHead>
                      <TableHead>Percentage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.students.map(student => {
                      const total = Object.values(student.grades).reduce((sum, grade) => sum + (grade as number), 0);
                      const maxTotal = data.assessments.reduce((sum, assessment) => sum + assessment.maxMarks, 0);
                      const percentage = Math.round((total / maxTotal) * 100);
                      
                      return (
                        <TableRow key={student.id} className="group">
                          <TableCell className="font-medium">{student.rollNo}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          {data.assessments.map(assessment => (
                            <TableCell key={assessment.id}>
                              <EditableGradeCell
                                studentId={student.id}
                                assessmentId={assessment.id}
                                initialValue={student.grades[assessment.id]}
                                maxMarks={assessment.maxMarks}
                                onSave={handleGradeChange}
                              />
                            </TableCell>
                          ))}
                          <TableCell className="font-semibold">{total}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span className={`font-semibold ${
                                percentage >= 75 ? 'text-[#138808]' : 
                                percentage >= 60 ? 'text-[#FF9933]' : 
                                percentage >= 40 ? 'text-amber-600' : 'text-red-500'
                              }`}>
                                {percentage}%
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default GradeManagementPage;

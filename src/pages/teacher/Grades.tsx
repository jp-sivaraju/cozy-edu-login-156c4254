
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { toast } from "sonner";

// Mock student data
const students = [
  { id: "STU001", name: "Ravi Sharma" },
  { id: "STU002", name: "Priya Patel" },
  { id: "STU003", name: "Aditya Singh" },
  { id: "STU004", name: "Meera Kapoor" },
  { id: "STU005", name: "Arjun Reddy" },
];

// Mock subjects
const subjects = [
  "Math",
  "Science",
  "English",
  "Hindi",
  "Social Studies",
  "Art",
  "Physical Education"
];

// Mock categories
const categories = [
  { id: "academic", name: "Academic" },
  { id: "co-scholastic", name: "Co-Scholastic" }
];

// Mock marks data
const marksData = [
  { 
    id: "MARK001", 
    student_id: "STU001", 
    student_name: "Ravi Sharma", 
    subject: "Math", 
    category: "academic", 
    score: 85.0,
    date: "2025-04-02"
  },
  { 
    id: "MARK002", 
    student_id: "STU001", 
    student_name: "Ravi Sharma", 
    subject: "Science", 
    category: "academic", 
    score: 78.5,
    date: "2025-04-01"
  },
  { 
    id: "MARK003", 
    student_id: "STU002", 
    student_name: "Priya Patel", 
    subject: "English", 
    category: "academic", 
    score: 92.0,
    date: "2025-04-02"
  },
  { 
    id: "MARK004", 
    student_id: "STU001", 
    student_name: "Ravi Sharma", 
    subject: "Art", 
    category: "co-scholastic", 
    score: 95.0,
    date: "2025-03-30"
  },
];

const Grades = () => {
  const [activeTab, setActiveTab] = useState("enter");
  
  // Form state
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [score, setScore] = useState("");
  
  // View state
  const [filterStudent, setFilterStudent] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate score (0-100)
    const scoreNum = parseFloat(score);
    if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
      toast.error("Score must be a number between 0 and 100");
      return;
    }
    
    // In a real app, this would make an API call
    console.log("Submitting grade:", {
      student_id: selectedStudent,
      subject: selectedSubject,
      category: selectedCategory,
      score: scoreNum
    });
    
    toast.success("Grade saved successfully!");
    
    // Reset form
    setSelectedStudent("");
    setSelectedSubject("");
    setSelectedCategory("");
    setScore("");
  };
  
  const filteredMarks = marksData.filter(mark => {
    if (filterStudent && mark.student_id !== filterStudent) return false;
    if (filterSubject && mark.subject !== filterSubject) return false;
    return true;
  });
  
  return (
    <DashboardLayout>
      <div className="container p-6">
        <h1 className="text-3xl font-bold mb-6 text-[#FF9933]">Grade Management</h1>
        
        <Tabs defaultValue="enter" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-slate-100">
            <TabsTrigger 
              value="enter"
              className={`flex-1 ${activeTab === "enter" ? "bg-[#FF9933] text-white" : ""}`}
            >
              Enter Grades
            </TabsTrigger>
            <TabsTrigger 
              value="view"
              className={`flex-1 ${activeTab === "view" ? "bg-[#FF9933] text-white" : ""}`}
            >
              View Grades
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="enter" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#000080]">Enter Student Grades</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="student" className="block text-[#000080] font-medium">
                      Select Student
                    </label>
                    <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                      <SelectTrigger className="border-[#138808]/30 focus:border-[#138808] focus:ring-[#138808]/20">
                        <SelectValue placeholder="Select a student" />
                      </SelectTrigger>
                      <SelectContent>
                        {students.map(student => (
                          <SelectItem key={student.id} value={student.id}>
                            {student.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="subject" className="block text-[#000080] font-medium">
                        Subject
                      </label>
                      <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                        <SelectTrigger className="border-[#138808]/30 focus:border-[#138808] focus:ring-[#138808]/20">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map(subject => (
                            <SelectItem key={subject} value={subject}>
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="category" className="block text-[#000080] font-medium">
                        Category
                      </label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="border-[#138808]/30 focus:border-[#138808] focus:ring-[#138808]/20">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="score" className="block text-[#000080] font-medium">
                      Score (0-100)
                    </label>
                    <Input 
                      id="score" 
                      type="number" 
                      min="0" 
                      max="100" 
                      step="0.1"
                      value={score}
                      onChange={e => setScore(e.target.value)}
                      className="border-[#138808]/30 focus:border-[#138808] focus:ring-[#138808]/20"
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-[#FF9933] hover:bg-[#FF9933]/90 text-white"
                    disabled={!selectedStudent || !selectedSubject || !selectedCategory || !score}
                  >
                    Save Grade
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="view" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#000080]">View Grades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <label htmlFor="filterStudent" className="block text-[#000080] font-medium">
                      Filter by Student
                    </label>
                    <Select value={filterStudent} onValueChange={setFilterStudent}>
                      <SelectTrigger className="border-[#138808]/30 focus:border-[#138808] focus:ring-[#138808]/20">
                        <SelectValue placeholder="All Students" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Students</SelectItem>
                        {students.map(student => (
                          <SelectItem key={student.id} value={student.id}>
                            {student.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="filterSubject" className="block text-[#000080] font-medium">
                      Filter by Subject
                    </label>
                    <Select value={filterSubject} onValueChange={setFilterSubject}>
                      <SelectTrigger className="border-[#138808]/30 focus:border-[#138808] focus:ring-[#138808]/20">
                        <SelectValue placeholder="All Subjects" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Subjects</SelectItem>
                        {subjects.map(subject => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {filteredMarks.length > 0 ? (
                    filteredMarks.map(mark => (
                      <div 
                        key={mark.id} 
                        className="border border-[#138808]/30 rounded-xl p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-[#000080]">{mark.student_name}</h3>
                            <p className="text-sm text-slate-500">Date: {mark.date}</p>
                          </div>
                          <div className="bg-[#FF9933]/10 text-[#FF9933] font-semibold px-3 py-1 rounded-full">
                            {mark.score}%
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="inline-block bg-[#138808]/10 text-[#138808] px-2 py-1 rounded mr-2">
                            {mark.subject}
                          </p>
                          <p className="inline-block bg-slate-100 text-slate-600 px-2 py-1 rounded">
                            {mark.category === 'academic' ? 'Academic' : 'Co-Scholastic'}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center py-4 text-slate-500">No grades found with the selected filters.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Grades;

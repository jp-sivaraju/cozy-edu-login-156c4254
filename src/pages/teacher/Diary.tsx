
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { toast } from "sonner";
import { Camera } from "lucide-react";

// Mock student data - would come from API in production
const students = [
  { id: "STU001", name: "Ravi Sharma" },
  { id: "STU002", name: "Priya Patel" },
  { id: "STU003", name: "Aditya Singh" },
  { id: "STU004", name: "Meera Kapoor" },
  { id: "STU005", name: "Arjun Reddy" },
];

// Mock diary entries - would come from API in production
const diaryEntries = [
  { 
    id: "ENTRY001", 
    student_id: "STU001", 
    student_name: "Ravi Sharma", 
    date: "2025-04-02", 
    text: "Ravi painted a beautiful tree in art class today. He showed great attention to detail and used a variety of colors.", 
    photo_url: "https://placehold.co/300x200/png?text=Ravi's+Art" 
  },
  { 
    id: "ENTRY002", 
    student_id: "STU002", 
    student_name: "Priya Patel", 
    date: "2025-04-02", 
    text: "Priya participated actively in the science experiment today. She asked thoughtful questions about plant growth.", 
    photo_url: "https://placehold.co/300x200/png?text=Science+Experiment" 
  },
  { 
    id: "ENTRY003", 
    student_id: "STU001", 
    student_name: "Ravi Sharma", 
    date: "2025-04-01", 
    text: "Ravi learned about fractions today. He was able to solve all the practice problems correctly.", 
    photo_url: null
  },
];

const TeacherDiary = () => {
  const [activeTab, setActiveTab] = useState("new");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [entryText, setEntryText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call
    console.log("Submitting diary entry:", {
      student_id: selectedStudent,
      text: entryText,
      file: selectedFile
    });
    
    toast.success("Diary entry saved successfully!");
    setSelectedStudent("");
    setEntryText("");
    setSelectedFile(null);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  return (
    <DashboardLayout>
      <div className="container p-6">
        <h1 className="text-3xl font-bold mb-6 text-[#FF9933]">Student Diary</h1>
        
        <Tabs defaultValue="new" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-slate-100">
            <TabsTrigger 
              value="new"
              className={`flex-1 ${activeTab === "new" ? "bg-[#FF9933] text-white" : ""}`}
            >
              New Entry
            </TabsTrigger>
            <TabsTrigger 
              value="past"
              className={`flex-1 ${activeTab === "past" ? "bg-[#FF9933] text-white" : ""}`}
            >
              Past Entries
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="new" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#000080]">Create New Diary Entry</CardTitle>
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
                  
                  <div className="space-y-2">
                    <label htmlFor="entry" className="block text-[#000080] font-medium">
                      Diary Entry
                    </label>
                    <Textarea 
                      id="entry" 
                      placeholder="Write your diary entry here..." 
                      value={entryText}
                      onChange={e => setEntryText(e.target.value)}
                      className="min-h-[150px] border-[#138808]/30 focus:border-[#138808] focus:ring-[#138808]/20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="photo" className="block text-[#000080] font-medium">
                      Attach Photo (Optional)
                    </label>
                    <div className="flex items-center gap-2">
                      <Button 
                        type="button" 
                        variant="outline"
                        className="border-[#138808]/30 hover:bg-[#138808]/5"
                        onClick={() => document.getElementById('photo')?.click()}
                      >
                        <Camera className="mr-2 h-4 w-4 text-[#138808]" />
                        {selectedFile ? 'Change Photo' : 'Upload Photo'}
                      </Button>
                      {selectedFile && (
                        <span className="text-sm text-slate-600">
                          {selectedFile.name}
                        </span>
                      )}
                    </div>
                    <input 
                      type="file" 
                      id="photo" 
                      accept="image/*" 
                      onChange={handleFileChange} 
                      className="hidden" 
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-[#FF9933] hover:bg-[#FF9933]/90 text-white"
                    disabled={!selectedStudent || !entryText}
                  >
                    Save Diary Entry
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="past" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#000080]">Past Diary Entries</CardTitle>
              </CardHeader>
              <CardContent>
                {diaryEntries.map((entry) => (
                  <div key={entry.id} className="mb-6 border border-[#138808]/30 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-medium text-[#000080]">{entry.student_name}</h3>
                        <p className="text-sm text-slate-500">Date: {entry.date}</p>
                      </div>
                    </div>
                    <p className="mb-4">{entry.text}</p>
                    {entry.photo_url && (
                      <div className="mt-2">
                        <a 
                          href={entry.photo_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#000080] hover:underline flex items-center"
                        >
                          <img 
                            src={entry.photo_url} 
                            alt="Diary entry photo" 
                            className="rounded-lg max-h-[200px] border border-[#138808]/20"
                          />
                        </a>
                      </div>
                    )}
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

export default TeacherDiary;

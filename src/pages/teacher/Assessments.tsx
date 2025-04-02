
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { toast } from "sonner";
import { BrainCircuit, Eye } from "lucide-react";

// Mock student data
const students = [
  { id: "STU001", name: "Ravi Sharma" },
  { id: "STU002", name: "Priya Patel" },
  { id: "STU003", name: "Aditya Singh" },
  { id: "STU004", name: "Meera Kapoor" },
  { id: "STU005", name: "Arjun Reddy" },
];

// Mock quiz data
const quizzes = [
  {
    id: "ASSESS001",
    student_id: "STU001",
    student_name: "Ravi Sharma",
    created_at: "2025-04-02T12:00:00Z",
    status: "completed",
    questions: [
      {
        question: "What is 5×3?",
        options: ["10", "15", "20"],
        answer: "15"
      },
      {
        question: "If 2x + 5 = 15, what is x?",
        options: ["5", "10", "15"],
        answer: "5"
      },
      {
        question: "What is the area of a rectangle with length 8 cm and width 4 cm?",
        options: ["16 sq cm", "24 sq cm", "32 sq cm"],
        answer: "32 sq cm"
      }
    ],
    results: {
      score: 80,
      completed_at: "2025-04-02T12:30:00Z"
    }
  },
  {
    id: "ASSESS002",
    student_id: "STU002",
    student_name: "Priya Patel",
    created_at: "2025-04-01T14:00:00Z",
    status: "completed",
    questions: [
      {
        question: "What is the capital of India?",
        options: ["Mumbai", "Delhi", "Bangalore"],
        answer: "Delhi"
      },
      {
        question: "Which planet is closest to the sun?",
        options: ["Venus", "Mercury", "Earth"],
        answer: "Mercury"
      }
    ],
    results: {
      score: 100,
      completed_at: "2025-04-01T14:15:00Z"
    }
  },
  {
    id: "ASSESS003",
    student_id: "STU003",
    student_name: "Aditya Singh",
    created_at: "2025-04-02T10:00:00Z",
    status: "pending",
    questions: [
      {
        question: "What is the chemical symbol for Gold?",
        options: ["Go", "Au", "Ag"],
        answer: "Au"
      },
      {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen"],
        answer: "Carbon Dioxide"
      }
    ],
    results: null
  }
];

const Assessments = () => {
  const [activeTab, setActiveTab] = useState("generate");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [generatingQuiz, setGeneratingQuiz] = useState(false);
  const [previewQuiz, setPreviewQuiz] = useState<typeof quizzes[0] | null>(null);
  
  const handleGenerateQuiz = () => {
    if (!selectedStudent) {
      toast.error("Please select a student");
      return;
    }
    
    // In a real app, this would make an API call
    setGeneratingQuiz(true);
    setTimeout(() => {
      console.log("Generating quiz for student:", selectedStudent);
      toast.success("Quiz generated successfully!");
      setGeneratingQuiz(false);
      
      // Reset form
      setSelectedStudent("");
    }, 1500);
  };
  
  const handlePreviewQuiz = (quiz: typeof quizzes[0]) => {
    setPreviewQuiz(quiz);
  };
  
  const closePreview = () => {
    setPreviewQuiz(null);
  };
  
  return (
    <DashboardLayout>
      <div className="container p-6">
        <h1 className="text-3xl font-bold mb-6 text-[#FF9933]">AI Assessments</h1>
        
        <Tabs defaultValue="generate" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-slate-100">
            <TabsTrigger 
              value="generate"
              className={`flex-1 ${activeTab === "generate" ? "bg-[#FF9933] text-white" : ""}`}
            >
              Generate Quiz
            </TabsTrigger>
            <TabsTrigger 
              value="results"
              className={`flex-1 ${activeTab === "results" ? "bg-[#FF9933] text-white" : ""}`}
            >
              View Results
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="generate" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#000080]">Generate AI Quiz</CardTitle>
                <CardDescription>
                  The AI will analyze the student's performance and create a personalized quiz.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
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
                  
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h3 className="text-[#000080] font-medium mb-2">How it works:</h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-600">
                      <li>AI analyzes the student's performance across subjects</li>
                      <li>Creates personalized questions based on strengths and weaknesses</li>
                      <li>Adapts difficulty based on the student's current level</li>
                      <li>Provides instant feedback and recommendations</li>
                    </ul>
                  </div>
                  
                  <Button 
                    onClick={handleGenerateQuiz}
                    className="w-full bg-[#FF9933] hover:bg-[#FF9933]/90 text-white flex items-center justify-center gap-2"
                    disabled={!selectedStudent || generatingQuiz}
                  >
                    {generatingQuiz ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <BrainCircuit className="w-5 h-5" />
                        Generate Quiz
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="results" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#000080]">Quiz Results</CardTitle>
              </CardHeader>
              <CardContent>
                {previewQuiz ? (
                  <div className="bg-white p-4 rounded-xl border border-[#138808]/30">
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
                      <div>
                        <h3 className="text-xl font-semibold text-[#000080]">Quiz Preview</h3>
                        <p className="text-slate-500">Student: {previewQuiz.student_name}</p>
                      </div>
                      <Button
                        variant="outline"
                        className="border-[#138808]/30 hover:bg-[#138808]/5"
                        onClick={closePreview}
                      >
                        Close Preview
                      </Button>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-lg font-medium text-[#FF9933]">Questions</h4>
                        {previewQuiz.status === 'completed' && (
                          <span className="text-[#138808] font-medium">
                            Score: {previewQuiz.results?.score}%
                          </span>
                        )}
                      </div>
                      
                      <div className="space-y-4">
                        {previewQuiz.questions.map((q, i) => (
                          <div key={i} className="border border-[#138808]/20 rounded-lg p-4">
                            <p className="font-medium text-[#000080] mb-2">Q{i+1}: {q.question}</p>
                            <ul className="space-y-2">
                              {q.options.map((option, j) => (
                                <li 
                                  key={j}
                                  className={`p-2 rounded ${
                                    option === q.answer 
                                      ? 'bg-[#138808]/10 border border-[#138808]/30' 
                                      : 'bg-slate-50 border border-slate-200'
                                  }`}
                                >
                                  {option} {option === q.answer && <span className="text-[#138808] ml-2">(Correct)</span>}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {previewQuiz.status === 'completed' && previewQuiz.results && (
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <h4 className="font-medium text-[#FF9933] mb-2">Results</h4>
                        <p>Completed on: {new Date(previewQuiz.results.completed_at).toLocaleString()}</p>
                        <p>Score: {previewQuiz.results.score}%</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {quizzes.map((quiz) => (
                      <div 
                        key={quiz.id} 
                        className="border border-[#138808]/30 rounded-xl p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-[#000080]">{quiz.student_name}</h3>
                            <p className="text-sm text-slate-500">
                              Created: {new Date(quiz.created_at).toLocaleString()}
                            </p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm ${
                            quiz.status === 'completed' 
                              ? 'bg-[#138808]/10 text-[#138808]' 
                              : 'bg-yellow-100 text-yellow-600'
                          }`}>
                            {quiz.status === 'completed' ? 'Completed' : 'Pending'}
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <p className="text-slate-600">
                            {quiz.questions.length} questions
                            {quiz.status === 'completed' && quiz.results && ` • Score: ${quiz.results.score}%`}
                          </p>
                        </div>
                        
                        <div className="mt-4">
                          <Button
                            variant="outline"
                            className="border-[#138808]/30 hover:bg-[#138808]/5 text-[#000080]"
                            onClick={() => handlePreviewQuiz(quiz)}
                          >
                            <Eye className="mr-2 h-4 w-4 text-[#138808]" />
                            View Quiz
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Assessments;

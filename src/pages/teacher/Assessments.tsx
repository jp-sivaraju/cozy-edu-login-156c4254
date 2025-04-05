
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { FileText, FilePlus, Calendar, Clock, BarChart, Filter, Download, Plus, Star, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const mockClasses = [
  { id: 'all', name: 'All Classes', section: '' },
  { id: '1', name: '8A', section: 'Science' },
  { id: '2', name: '8B', section: 'Science' },
  { id: '3', name: '9A', section: 'Commerce' },
];

const mockSubjects = [
  { id: 'all', name: 'All Subjects' },
  { id: '1', name: 'Mathematics' },
  { id: '2', name: 'Science' },
  { id: '3', name: 'English' },
  { id: '4', name: 'Social Studies' },
];

const mockAssessments = [
  {
    id: '1',
    title: 'Algebra Mid-Term Assessment',
    class: '8A',
    subject: 'Mathematics',
    dueDate: '2023-09-20',
    status: 'active',
    questionsCount: 25,
    timeAllowed: 60,
    type: 'objective',
    aiGenerated: true,
    completedCount: 28,
    pendingCount: 2,
    averageScore: 72,
  },
  {
    id: '2',
    title: 'English Grammar Quiz',
    class: '8A',
    subject: 'English',
    dueDate: '2023-09-15',
    status: 'completed',
    questionsCount: 20,
    timeAllowed: 30,
    type: 'objective',
    aiGenerated: false,
    completedCount: 30,
    pendingCount: 0,
    averageScore: 85,
  },
  {
    id: '3',
    title: 'Physics Forces and Motion Test',
    class: '9A',
    subject: 'Science',
    dueDate: '2023-09-25',
    status: 'draft',
    questionsCount: 30,
    timeAllowed: 90,
    type: 'mixed',
    aiGenerated: true,
    completedCount: 0,
    pendingCount: 0,
    averageScore: 0,
  },
  {
    id: '4',
    title: 'Linear Equations Quiz',
    class: '8B',
    subject: 'Mathematics',
    dueDate: '2023-09-18',
    status: 'active',
    questionsCount: 15,
    timeAllowed: 40,
    type: 'objective',
    aiGenerated: true,
    completedCount: 25,
    pendingCount: 5,
    averageScore: 68,
  },
];

type AssessmentStatus = 'active' | 'completed' | 'draft';

const AssessmentsPage = () => {
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ['assessments', selectedClass, selectedSubject],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const filteredAssessments = mockAssessments.filter(assessment => {
        const classMatch = selectedClass === 'all' || assessment.class === mockClasses.find(c => c.id === selectedClass)?.name;
        const subjectMatch = selectedSubject === 'all' || assessment.subject === mockSubjects.find(s => s.id === selectedSubject)?.name;
        return classMatch && subjectMatch;
      });
      
      return {
        assessments: filteredAssessments,
        statusCounts: {
          active: filteredAssessments.filter(a => a.status === 'active').length,
          completed: filteredAssessments.filter(a => a.status === 'completed').length,
          draft: filteredAssessments.filter(a => a.status === 'draft').length,
        }
      };
    }
  });

  const getFilteredAssessments = () => {
    if (!data?.assessments) return [];
    
    if (activeTab === 'all') {
      return data.assessments;
    }
    
    return data.assessments.filter(assessment => assessment.status === activeTab);
  };

  const getStatusBadge = (status: AssessmentStatus) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span>;
      case 'completed':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Completed</span>;
      case 'draft':
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Draft</span>;
    }
  };

  const handleCreateAssessment = () => {
    toast({
      title: "New assessment",
      description: "Creating a new AI-powered assessment...",
    });
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-[#138808] mb-2">Assessments</h1>
        <p className="text-slate-500 mb-6">Create and manage AI-driven assessments for your classes</p>

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
                    {classItem.name} {classItem.section ? `(${classItem.section})` : ''}
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

          <div className="flex-grow md:flex md:items-end md:justify-end">
            <Button 
              variant="tricolor"
              className="w-full md:w-auto mt-6 md:mt-0"
              onClick={handleCreateAssessment}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Assessment
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 border-4 border-t-[#138808] border-[#138808]/20 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="border-[#138808]/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#000080] flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-[#FF9933]" />
                    Active Assessments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{data?.statusCounts.active || 0}</div>
                  <p className="text-sm text-slate-500">Currently in progress</p>
                </CardContent>
              </Card>
              
              <Card className="border-[#138808]/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#000080] flex items-center">
                    <BarChart className="h-5 w-5 mr-2 text-[#FF9933]" />
                    Completed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{data?.statusCounts.completed || 0}</div>
                  <p className="text-sm text-slate-500">With results available</p>
                </CardContent>
              </Card>
              
              <Card className="border-[#138808]/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#000080] flex items-center">
                    <FilePlus className="h-5 w-5 mr-2 text-[#FF9933]" />
                    Draft Assessments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{data?.statusCounts.draft || 0}</div>
                  <p className="text-sm text-slate-500">Pending publication</p>
                </CardContent>
              </Card>
            </div>
          
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="mb-6 bg-slate-100">
                <TabsTrigger 
                  value="all"
                  className={`flex-1 ${activeTab === "all" ? "bg-[#FF9933] text-white" : ""}`}
                >
                  All Assessments
                </TabsTrigger>
                <TabsTrigger 
                  value="active"
                  className={`flex-1 ${activeTab === "active" ? "bg-[#FF9933] text-white" : ""}`}
                >
                  Active
                </TabsTrigger>
                <TabsTrigger 
                  value="completed"
                  className={`flex-1 ${activeTab === "completed" ? "bg-[#FF9933] text-white" : ""}`}
                >
                  Completed
                </TabsTrigger>
                <TabsTrigger 
                  value="draft"
                  className={`flex-1 ${activeTab === "draft" ? "bg-[#FF9933] text-white" : ""}`}
                >
                  Drafts
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-0">
                {getFilteredAssessments().length > 0 ? (
                  <div className="space-y-4">
                    {getFilteredAssessments().map(assessment => (
                      <Card key={assessment.id} className="border-[#138808]/20 hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <div>
                              <CardTitle className="text-[#000080] flex items-center">
                                {assessment.title}
                                {assessment.aiGenerated && (
                                  <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs">
                                    AI Generated
                                  </span>
                                )}
                              </CardTitle>
                              <CardDescription className="flex items-center mt-1">
                                <span className="flex items-center mr-3">
                                  <Filter className="h-3 w-3 mr-1" />
                                  {assessment.class} | {assessment.subject}
                                </span>
                                <span className="flex items-center mr-3">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  Due: {new Date(assessment.dueDate).toLocaleDateString()}
                                </span>
                              </CardDescription>
                            </div>
                            <div>
                              {getStatusBadge(assessment.status as AssessmentStatus)}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                            <div className="bg-slate-50 p-3 rounded-md">
                              <div className="text-slate-500 mb-1">Type</div>
                              <div className="font-medium capitalize">{assessment.type}</div>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-md">
                              <div className="text-slate-500 mb-1">Questions</div>
                              <div className="font-medium">{assessment.questionsCount}</div>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-md">
                              <div className="text-slate-500 mb-1">Time Allowed</div>
                              <div className="font-medium flex items-center">
                                <Clock className="h-4 w-4 mr-1 text-slate-400" />
                                {assessment.timeAllowed} min
                              </div>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-md">
                              <div className="text-slate-500 mb-1">Avg. Score</div>
                              <div className="font-medium">{assessment.status !== 'draft' ? `${assessment.averageScore}%` : '-'}</div>
                            </div>
                          </div>
                          
                          {assessment.status === 'active' && (
                            <div className="mt-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Completion ({assessment.completedCount}/{assessment.completedCount + assessment.pendingCount})</span>
                                <span>{Math.round((assessment.completedCount / (assessment.completedCount + assessment.pendingCount)) * 100)}%</span>
                              </div>
                              <Progress value={(assessment.completedCount / (assessment.completedCount + assessment.pendingCount)) * 100} className="h-2" />
                            </div>
                          )}
                          
                          {assessment.status === 'completed' && assessment.averageScore < 70 && (
                            <div className="mt-4 flex items-start gap-2 p-2 bg-amber-50 border border-amber-200 rounded-md text-sm">
                              <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                              <p className="text-amber-700">
                                The class average is below 70%. Consider revisiting the topic or providing additional resources.
                              </p>
                            </div>
                          )}
                          
                          {assessment.status === 'completed' && assessment.averageScore >= 85 && (
                            <div className="mt-4 flex items-start gap-2 p-2 bg-green-50 border border-green-200 rounded-md text-sm">
                              <Star className="h-4 w-4 text-green-500 mt-0.5" />
                              <p className="text-green-700">
                                Excellent results! The class has performed very well on this assessment.
                              </p>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                          {assessment.status === 'draft' && (
                            <>
                              <Button variant="outline" size="sm" className="border-[#138808]/30">
                                Edit
                              </Button>
                              <Button variant="tricolor" size="sm">
                                Publish
                              </Button>
                            </>
                          )}
                          
                          {assessment.status === 'active' && (
                            <>
                              <Button variant="outline" size="sm" className="border-[#138808]/30">
                                View Details
                              </Button>
                              <Button variant="tricolor" size="sm">
                                Send Reminder
                              </Button>
                            </>
                          )}
                          
                          {assessment.status === 'completed' && (
                            <>
                              <Button variant="outline" size="sm" className="border-[#138808]/30 flex items-center gap-1">
                                <Download className="h-4 w-4" />
                                Export Results
                              </Button>
                              <Button variant="tricolor" size="sm">
                                View Analysis
                              </Button>
                            </>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <div className="mx-auto w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                        <FileText className="h-8 w-8 text-slate-400" />
                      </div>
                      <h3 className="text-xl font-medium text-[#000080] mb-2">No assessments found</h3>
                      <p className="text-slate-500 mb-6">
                        {activeTab === 'all' 
                          ? "No assessments match your current filters." 
                          : `You don't have any ${activeTab} assessments at the moment.`}
                      </p>
                      <Button variant="tricolor" onClick={handleCreateAssessment}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create New Assessment
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AssessmentsPage;

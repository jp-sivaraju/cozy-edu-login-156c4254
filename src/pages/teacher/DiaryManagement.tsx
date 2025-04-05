
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Plus, Calendar, Book, Clock } from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import DiaryEntryForm from '@/components/teacher/DiaryEntryForm';

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

const mockEntries = [
  { 
    id: '1', 
    date: '2023-05-15', 
    class: '8A', 
    subject: 'Mathematics', 
    topic: 'Quadratic Equations', 
    content: 'Introduction to solving quadratic equations using factorization method.',
    homeworkAssigned: 'Textbook exercises 5.1 - Questions 1-10',
    homeworkDueDate: '2023-05-17',
    notes: 'Students showed good understanding of the concept. Aditya and Priya need additional support.',
    smartAlerts: [
      { type: 'attention', message: '5 students struggled with factorization method' },
      { type: 'achievement', message: 'Class average for last quiz improved by 15%' }
    ]
  },
  { 
    id: '2', 
    date: '2023-05-14', 
    class: '8A', 
    subject: 'Mathematics', 
    topic: 'Linear Equations', 
    content: 'Solving systems of linear equations using substitution method.',
    homeworkAssigned: 'Worksheet on systems of equations',
    homeworkDueDate: '2023-05-16',
    notes: 'Need to revisit the concept in next class. Several students found it challenging.',
    smartAlerts: [
      { type: 'attention', message: 'Class performance below average on this topic' }
    ]
  },
];

const DiaryManagementPage = () => {
  const [selectedClass, setSelectedClass] = useState('1');
  const [selectedSubject, setSelectedSubject] = useState('1');
  const [activeTab, setActiveTab] = useState('new');
  const [showNewEntryForm, setShowNewEntryForm] = useState(false);
  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ['diaryEntries', selectedClass, selectedSubject],
    queryFn: async () => {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return {
        className: mockClasses.find(c => c.id === selectedClass)?.name || '',
        subject: mockSubjects.find(s => s.id === selectedSubject)?.name || '',
        entries: mockEntries.filter(e => 
          e.class === mockClasses.find(c => c.id === selectedClass)?.name && 
          e.subject === mockSubjects.find(s => s.id === selectedSubject)?.name
        )
      };
    }
  });

  const handleNewEntrySubmit = (formData: any) => {
    console.log('New diary entry:', formData);
    toast({
      title: "Diary entry created",
      description: "Your diary entry has been saved successfully.",
    });
    setShowNewEntryForm(false);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-[#138808] mb-2">Diary Management</h1>
        <p className="text-slate-500 mb-6">Create and manage class diary entries</p>

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

          <div className="flex-grow md:flex md:items-end md:justify-end">
            <Button 
              variant="tricolor"
              className="w-full md:w-auto mt-6 md:mt-0"
              onClick={() => setShowNewEntryForm(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Entry
            </Button>
          </div>
        </div>

        {showNewEntryForm ? (
          <Card className="border-[#138808]/20 mb-6 animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#000080] flex items-center">
                <Book className="h-5 w-5 mr-2 text-[#FF9933]" />
                New Diary Entry
              </CardTitle>
              <CardDescription>
                Create a new diary entry for {data?.className} - {data?.subject}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DiaryEntryForm 
                onSubmit={handleNewEntrySubmit}
                onCancel={() => setShowNewEntryForm(false)}
                className={data?.className || ''}
                subject={data?.subject || ''}
              />
            </CardContent>
          </Card>
        ) : null}

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="mb-6 bg-slate-100">
            <TabsTrigger 
              value="recent"
              className={`flex-1 ${activeTab === "recent" ? "bg-[#FF9933] text-white" : ""}`}
            >
              Recent Entries
            </TabsTrigger>
            <TabsTrigger 
              value="pending"
              className={`flex-1 ${activeTab === "pending" ? "bg-[#FF9933] text-white" : ""}`}
            >
              Pending Topics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent" className="mt-0">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="h-8 w-8 border-4 border-t-[#138808] border-[#138808]/20 rounded-full animate-spin"></div>
              </div>
            ) : data && data.entries.length > 0 ? (
              <div className="space-y-4">
                {data.entries.map(entry => (
                  <Card key={entry.id} className="border-[#138808]/20 hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-[#000080]">{entry.topic}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(entry.date).toLocaleDateString('en-US', {
                              year: 'numeric', month: 'long', day: 'numeric'
                            })}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          {entry.smartAlerts.map((alert, idx) => (
                            <div 
                              key={idx}
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                alert.type === 'attention' 
                                  ? 'bg-amber-100 text-amber-700' 
                                  : 'bg-green-100 text-green-700'
                              }`}
                            >
                              {alert.message}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-[#000080]">Content Covered</h4>
                          <p className="text-sm text-slate-600">{entry.content}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-[#000080]">Homework Assigned</h4>
                            <p className="text-sm text-slate-600">{entry.homeworkAssigned}</p>
                            <div className="text-xs text-slate-500 flex items-center mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              Due: {new Date(entry.homeworkDueDate).toLocaleDateString()}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-[#000080]">Notes</h4>
                            <p className="text-sm text-slate-600">{entry.notes}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-slate-500">No diary entries found for the selected class and subject.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="pending" className="mt-0">
            <Card className="border-[#138808]/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-[#000080]">Pending Topics</CardTitle>
                <CardDescription>Topics that are scheduled but not yet covered</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500 py-10 text-center">
                  No pending topics for the selected class and subject.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DiaryManagementPage;

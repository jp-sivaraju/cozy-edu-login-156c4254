
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Calendar } from '@/components/ui/calendar';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Book, BookOpen, Calendar as CalendarIcon, Check, Clock, Edit, Plus, Trash2, FileText, CalendarCheck, ListChecks } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

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

const mockUnits = [
  {
    id: '1',
    title: 'Algebra Fundamentals',
    description: 'Introduction to basic algebraic concepts',
    topics: [
      {
        id: '1-1',
        title: 'Introduction to Variables',
        status: 'completed',
        date: '2023-08-12',
        resources: ['Textbook Ch. 1', 'Algebra Worksheets'],
        objectives: [
          'Understand the concept of variables',
          'Identify variables in expressions',
          'Substitute values for variables'
        ]
      },
      {
        id: '1-2',
        title: 'Algebraic Expressions',
        status: 'completed',
        date: '2023-08-15',
        resources: ['Textbook Ch. 2', 'Online Practice'],
        objectives: [
          'Form algebraic expressions',
          'Simplify algebraic expressions',
          'Understand the order of operations'
        ]
      },
      {
        id: '1-3',
        title: 'Linear Equations',
        status: 'in-progress',
        date: '2023-08-18',
        resources: ['Textbook Ch. 3', 'Equation Solver App'],
        objectives: [
          'Solve simple linear equations',
          'Represent real-world scenarios with equations',
          'Check solutions by substitution'
        ]
      },
      {
        id: '1-4',
        title: 'Graphing Linear Equations',
        status: 'pending',
        date: '2023-08-22',
        resources: ['Textbook Ch. 4', 'Graph Paper', 'Graphing Tool'],
        objectives: [
          'Plot points on coordinate plane',
          'Graph linear equations',
          'Identify slope and y-intercept'
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Geometry Basics',
    description: 'Fundamentals of geometric shapes and properties',
    topics: [
      {
        id: '2-1',
        title: 'Points, Lines, and Planes',
        status: 'pending',
        date: '2023-09-05',
        resources: ['Textbook Ch. 5', 'Geometry Kit'],
        objectives: [
          'Identify geometric primitives',
          'Understand spatial relationships',
          'Measure distances between points'
        ]
      },
      {
        id: '2-2',
        title: 'Angles and Their Properties',
        status: 'pending',
        date: '2023-09-10',
        resources: ['Textbook Ch. 6', 'Protractor Practice'],
        objectives: [
          'Classify types of angles',
          'Measure angles accurately',
          'Apply angle relationship theorems'
        ]
      }
    ]
  }
];

const LessonPlanningPage = () => {
  const [selectedClass, setSelectedClass] = useState('1');
  const [selectedSubject, setSelectedSubject] = useState('1');
  const [activeTab, setActiveTab] = useState('curriculum');
  const [editingTopic, setEditingTopic] = useState<string | null>(null);
  const [showNewTopic, setShowNewTopic] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ['lessonPlanning', selectedClass, selectedSubject],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      return {
        className: mockClasses.find(c => c.id === selectedClass)?.name || '',
        classSection: mockClasses.find(c => c.id === selectedClass)?.section || '',
        subject: mockSubjects.find(s => s.id === selectedSubject)?.name || '',
        units: mockUnits,
      };
    }
  });

  const handleSaveNewTopic = () => {
    toast({
      title: "Topic saved",
      description: "Your lesson topic has been added to the curriculum."
    });
    setShowNewTopic(false);
  };

  const handleTopicStatusUpdate = (topicId: string, status: string) => {
    toast({
      title: "Status updated",
      description: `Topic status updated to ${status}.`
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
            <Check className="h-3 w-3" />
            <span>Completed</span>
          </div>
        );
      case 'in-progress':
        return (
          <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
            <Clock className="h-3 w-3" />
            <span>In Progress</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
            <CalendarIcon className="h-3 w-3" />
            <span>Pending</span>
          </div>
        );
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-[#138808] mb-2">Lesson Planning</h1>
        <p className="text-slate-500 mb-6">Create and manage lesson plans for your classes</p>

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
              onClick={() => {
                setShowNewTopic(true);
                setActiveTab('curriculum');
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Topic
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 border-4 border-t-[#138808] border-[#138808]/20 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="mb-6 bg-slate-100">
                <TabsTrigger 
                  value="curriculum"
                  className={`flex-1 ${activeTab === "curriculum" ? "bg-[#FF9933] text-white" : ""}`}
                >
                  <Book className="h-4 w-4 mr-2" />
                  Curriculum Planning
                </TabsTrigger>
                <TabsTrigger 
                  value="calendar"
                  className={`flex-1 ${activeTab === "calendar" ? "bg-[#FF9933] text-white" : ""}`}
                >
                  <CalendarCheck className="h-4 w-4 mr-2" />
                  Lesson Calendar
                </TabsTrigger>
                <TabsTrigger 
                  value="resources"
                  className={`flex-1 ${activeTab === "resources" ? "bg-[#FF9933] text-white" : ""}`}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Teaching Resources
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="curriculum" className="mt-0">
                {showNewTopic ? (
                  <Card className="border-[#138808]/20 mb-6">
                    <CardHeader>
                      <CardTitle className="text-[#000080]">
                        Add New Topic
                      </CardTitle>
                      <CardDescription>
                        Create a new topic for {data?.subject} curriculum
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-[#000080] mb-1">Unit</label>
                          <Select defaultValue="1">
                            <SelectTrigger className="w-full border-[#138808]/30">
                              <SelectValue placeholder="Select Unit" />
                            </SelectTrigger>
                            <SelectContent>
                              {data?.units.map(unit => (
                                <SelectItem key={unit.id} value={unit.id}>
                                  {unit.title}
                                </SelectItem>
                              ))}
                              <SelectItem value="new">+ Create New Unit</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-[#000080] mb-1">Topic Title</label>
                          <Input placeholder="Enter topic title" />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-[#000080] mb-1">Scheduled Date</label>
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
                                {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={(date) => date && setSelectedDate(date)}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-[#000080] mb-1">Learning Objectives</label>
                          <Textarea placeholder="Enter learning objectives (one per line)" rows={3} />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-[#000080] mb-1">Resources</label>
                          <Textarea placeholder="Enter resources (one per line)" rows={2} />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-[#000080] mb-2">Initial Status</label>
                          <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                              <Checkbox id="status-pending" checked />
                              <Label htmlFor="status-pending">Pending</Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <Checkbox id="status-progress" />
                              <Label htmlFor="status-progress">In Progress</Label>
                            </div>
                            <div className="flex items-center gap-2">
                              <Checkbox id="status-completed" />
                              <Label htmlFor="status-completed">Completed</Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        className="border-[#138808]/30"
                        onClick={() => setShowNewTopic(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="tricolor"
                        onClick={handleSaveNewTopic}
                      >
                        Save Topic
                      </Button>
                    </CardFooter>
                  </Card>
                ) : null}
                
                <div className="space-y-6">
                  {data?.units.map(unit => (
                    <Card key={unit.id} className="border-[#138808]/20">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-[#000080] flex items-center">
                          <BookOpen className="h-5 w-5 mr-2 text-[#FF9933]" />
                          {unit.title}
                        </CardTitle>
                        <CardDescription>
                          {unit.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {unit.topics.map(topic => (
                            <div key={topic.id} className="border border-[#138808]/20 rounded-lg p-4 hover:bg-slate-50">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-medium text-[#000080]">{topic.title}</h3>
                                  <div className="flex items-center gap-2 mt-1 text-sm text-slate-600">
                                    <CalendarIcon className="h-4 w-4" />
                                    <span>
                                      Scheduled: {new Date(topic.date).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex gap-2 items-center">
                                  {getStatusBadge(topic.status)}
                                  <div className="flex gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="text-sm font-medium text-[#000080] mb-1">Learning Objectives</h4>
                                  <ul className="list-disc pl-5 text-sm text-slate-600">
                                    {topic.objectives.map((objective, idx) => (
                                      <li key={idx}>{objective}</li>
                                    ))}
                                  </ul>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-medium text-[#000080] mb-1">Resources</h4>
                                  <ul className="list-disc pl-5 text-sm text-slate-600">
                                    {topic.resources.map((resource, idx) => (
                                      <li key={idx}>{resource}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              
                              <div className="mt-3 border-t border-[#138808]/10 pt-3">
                                <div className="flex gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="border-[#138808]/30 text-[#000080]"
                                    onClick={() => handleTopicStatusUpdate(topic.id, 'completed')}
                                  >
                                    <Check className="h-4 w-4 mr-1" />
                                    Mark as Completed
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="border-[#138808]/30 text-[#000080]"
                                  >
                                    <ListChecks className="h-4 w-4 mr-1" />
                                    View Detailed Plan
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="calendar" className="mt-0">
                <Card className="border-[#138808]/20">
                  <CardHeader>
                    <CardTitle className="text-[#000080]">Lesson Calendar</CardTitle>
                    <CardDescription>
                      View and manage your upcoming lessons
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <div className="flex justify-center py-8">
                      <Calendar 
                        mode="single"
                        selected={new Date()}
                        className="rounded-md border shadow"
                      />
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-medium text-[#000080] mb-3">Upcoming Topics</h3>
                      <div className="space-y-2">
                        {mockUnits.flatMap(unit => 
                          unit.topics.filter(topic => topic.status !== 'completed')
                            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                        ).slice(0, 5).map(topic => (
                          <div 
                            key={topic.id} 
                            className="flex justify-between items-center p-3 border border-[#138808]/20 rounded-lg hover:bg-slate-50"
                          >
                            <div>
                              <h4 className="font-medium">{topic.title}</h4>
                              <p className="text-sm text-slate-600">{new Date(topic.date).toLocaleDateString()}</p>
                            </div>
                            {getStatusBadge(topic.status)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="resources" className="mt-0">
                <Card className="border-[#138808]/20">
                  <CardHeader>
                    <CardTitle className="text-[#000080]">Teaching Resources</CardTitle>
                    <CardDescription>
                      Access and manage your teaching materials
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <FileText className="h-16 w-16 mx-auto text-slate-300 mb-4" />
                      <h3 className="text-lg font-medium text-[#000080] mb-2">Resource Library</h3>
                      <p className="text-slate-500 mb-6">Upload, organize, and access your teaching materials</p>
                      <Button variant="tricolor">
                        <Plus className="h-4 w-4 mr-2" />
                        Upload New Resource
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default LessonPlanningPage;

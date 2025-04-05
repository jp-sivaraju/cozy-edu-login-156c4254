
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Mail, MessageCircle, Phone, Send, User, Users, Clock, ChevronRight, CalendarDays } from 'lucide-react';

const mockClasses = [
  { id: '1', name: '8A', section: 'Science' },
  { id: '2', name: '8B', section: 'Science' },
  { id: '3', name: '9A', section: 'Commerce' },
];

const mockStudents = [
  { 
    id: '1', 
    name: 'Aarav Patel', 
    rollNo: '8A01', 
    parent: { name: 'Vikram Patel', phone: '+91 98765 43210', email: 'vikram.patel@example.com' }
  },
  { 
    id: '2', 
    name: 'Diya Sharma', 
    rollNo: '8A02', 
    parent: { name: 'Priya Sharma', phone: '+91 98765 43211', email: 'priya.sharma@example.com' }
  },
  { 
    id: '3', 
    name: 'Ishaan Singh', 
    rollNo: '8A03', 
    parent: { name: 'Rajiv Singh', phone: '+91 98765 43212', email: 'rajiv.singh@example.com' }
  },
  { 
    id: '4', 
    name: 'Ananya Gupta', 
    rollNo: '8A04', 
    parent: { name: 'Sneha Gupta', phone: '+91 98765 43213', email: 'sneha.gupta@example.com' }
  },
  { 
    id: '5', 
    name: 'Veer Kumar', 
    rollNo: '8A05', 
    parent: { name: 'Rahul Kumar', phone: '+91 98765 43214', email: 'rahul.kumar@example.com' }
  },
];

const mockCommunicationHistory = [
  { 
    id: '1', 
    studentId: '1',
    studentName: 'Aarav Patel',
    parentName: 'Vikram Patel',
    type: 'message',
    date: '2023-09-15T10:30:00',
    content: 'Aarav has been showing excellent progress in mathematics. Keep encouraging his problem-solving skills at home.',
    direction: 'outgoing'
  },
  { 
    id: '2', 
    studentId: '1',
    studentName: 'Aarav Patel',
    parentName: 'Vikram Patel',
    type: 'message',
    date: '2023-09-15T14:45:00',
    content: 'Thank you for the update. We will continue to support his learning at home.',
    direction: 'incoming'
  },
  { 
    id: '3', 
    studentId: '2',
    studentName: 'Diya Sharma',
    parentName: 'Priya Sharma',
    type: 'meeting',
    date: '2023-09-14T15:00:00',
    content: 'Discussed Diya\'s science project and areas for improvement. Parent agreed to provide more support with research materials.',
    direction: 'outgoing'
  },
  { 
    id: '4', 
    studentId: '3',
    studentName: 'Ishaan Singh',
    parentName: 'Rajiv Singh',
    type: 'phone',
    date: '2023-09-13T09:15:00',
    content: 'Called to discuss Ishaan\'s decreased participation in class. Parent mentioned he hasn\'t been feeling well and will take him to the doctor.',
    direction: 'outgoing'
  },
  { 
    id: '5', 
    studentId: '4',
    studentName: 'Ananya Gupta',
    parentName: 'Sneha Gupta',
    type: 'message',
    date: '2023-09-12T16:30:00',
    content: 'Reminder: Ananya needs to complete her history assignment by Friday.',
    direction: 'outgoing'
  },
  { 
    id: '6', 
    studentId: '4',
    studentName: 'Ananya Gupta',
    parentName: 'Sneha Gupta',
    type: 'message',
    date: '2023-09-12T17:45:00',
    content: 'Thank you for the reminder. She is working on it today.',
    direction: 'incoming'
  },
];

const ParentCommunicationPage = () => {
  const [selectedClass, setSelectedClass] = useState('1');
  const [activeTab, setActiveTab] = useState('individual');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [messageContent, setMessageContent] = useState('');
  const [messageSubject, setMessageSubject] = useState('');
  const [bulkMessage, setBulkMessage] = useState('');
  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ['parentCommunication', selectedClass],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      return {
        className: mockClasses.find(c => c.id === selectedClass)?.name || '',
        classSection: mockClasses.find(c => c.id === selectedClass)?.section || '',
        students: mockStudents.slice(0, 5),
        communicationHistory: mockCommunicationHistory,
      };
    }
  });

  const handleSendMessage = () => {
    if (!messageContent.trim()) {
      toast({
        title: "Message cannot be empty",
        description: "Please enter a message before sending.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Message sent",
      description: "Your message has been sent successfully.",
    });
    setMessageContent('');
    setMessageSubject('');
  };

  const handleSendBulkMessage = () => {
    if (!bulkMessage.trim()) {
      toast({
        title: "Message cannot be empty",
        description: "Please enter a message before sending.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Bulk message sent",
      description: `Your message has been sent to all parents in ${data?.className} ${data?.classSection}.`,
    });
    setBulkMessage('');
  };

  const getCommunicationTypeIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
      case 'phone':
        return <Phone className="h-5 w-5 text-green-500" />;
      case 'meeting':
        return <Users className="h-5 w-5 text-purple-500" />;
      default:
        return <Mail className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-[#138808] mb-2">Parent Communication</h1>
        <p className="text-slate-500 mb-6">Communicate with parents and manage interactions</p>

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

          {selectedStudent && (
            <div className="ml-auto">
              <Button 
                variant="outline" 
                onClick={() => setSelectedStudent(null)}
                className="mt-8"
              >
                Back to Class List
              </Button>
            </div>
          )}
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
                  value="individual"
                  className={`flex-1 ${activeTab === "individual" ? "bg-[#FF9933] text-white" : ""}`}
                >
                  Individual Communication
                </TabsTrigger>
                <TabsTrigger 
                  value="bulk"
                  className={`flex-1 ${activeTab === "bulk" ? "bg-[#FF9933] text-white" : ""}`}
                >
                  Bulk Communication
                </TabsTrigger>
                <TabsTrigger 
                  value="history"
                  className={`flex-1 ${activeTab === "history" ? "bg-[#FF9933] text-white" : ""}`}
                >
                  Communication History
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="individual" className="mt-0">
                {selectedStudent ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <Card className="border-[#138808]/20">
                        <CardHeader>
                          <CardTitle className="text-[#000080]">Student & Parent Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {(() => {
                            const student = data?.students.find(s => s.id === selectedStudent);
                            return (
                              <div className="space-y-4">
                                <div className="p-4 bg-slate-50 rounded-lg">
                                  <div className="flex items-center gap-3 mb-3">
                                    <div className="h-10 w-10 rounded-full bg-[#138808]/20 flex items-center justify-center">
                                      <User className="h-5 w-5 text-[#138808]" />
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[#000080]">Student</h3>
                                      <p>{student?.name}</p>
                                    </div>
                                  </div>
                                  <div className="text-sm text-slate-600 ml-13">
                                    <p>Roll No: {student?.rollNo}</p>
                                    <p>Class: {data?.className} {data?.classSection}</p>
                                  </div>
                                </div>
                                
                                <div className="p-4 bg-slate-50 rounded-lg">
                                  <div className="flex items-center gap-3 mb-3">
                                    <div className="h-10 w-10 rounded-full bg-[#FF9933]/20 flex items-center justify-center">
                                      <User className="h-5 w-5 text-[#FF9933]" />
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[#000080]">Parent</h3>
                                      <p>{student?.parent.name}</p>
                                    </div>
                                  </div>
                                  <div className="space-y-2 text-sm text-slate-600">
                                    <div className="flex items-center gap-2">
                                      <Phone className="h-4 w-4" />
                                      <span>{student?.parent.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Mail className="h-4 w-4" />
                                      <span>{student?.parent.email}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="border-t border-[#138808]/20 pt-4">
                                  <h3 className="font-medium text-[#000080] mb-2">Recent Communication</h3>
                                  {data?.communicationHistory
                                    .filter(comm => comm.studentId === selectedStudent)
                                    .slice(0, 3)
                                    .map(comm => (
                                      <div key={comm.id} className="text-sm p-2 hover:bg-slate-50 rounded">
                                        <div className="flex items-center gap-2 text-slate-600">
                                          {getCommunicationTypeIcon(comm.type)}
                                          <span>{new Date(comm.date).toLocaleDateString()}</span>
                                        </div>
                                        <p className="truncate mt-1">{comm.content.substring(0, 50)}...</p>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            );
                          })()}
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="md:col-span-2">
                      <Card className="border-[#138808]/20">
                        <CardHeader>
                          <CardTitle className="text-[#000080]">Send Message</CardTitle>
                          <CardDescription>
                            Send a message to {data?.students.find(s => s.id === selectedStudent)?.parent.name}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-[#000080] mb-1">Subject</label>
                              <Input 
                                placeholder="Enter message subject" 
                                value={messageSubject}
                                onChange={(e) => setMessageSubject(e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#000080] mb-1">Message</label>
                              <Textarea 
                                placeholder="Type your message here..." 
                                rows={6}
                                value={messageContent}
                                onChange={(e) => setMessageContent(e.target.value)}
                              />
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                          <Button 
                            variant="tricolor"
                            onClick={handleSendMessage}
                            className="gap-2"
                          >
                            <Send className="h-4 w-4" />
                            Send Message
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                ) : (
                  <Card className="border-[#138808]/20">
                    <CardHeader>
                      <CardTitle className="text-[#000080]">
                        Select Student
                      </CardTitle>
                      <CardDescription>
                        Select a student to communicate with their parent
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {data?.students.map(student => (
                          <div 
                            key={student.id} 
                            className="p-4 border border-[#138808]/20 rounded-lg hover:bg-slate-50 cursor-pointer"
                            onClick={() => setSelectedStudent(student.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-[#138808]/20 flex items-center justify-center">
                                  <User className="h-5 w-5 text-[#138808]" />
                                </div>
                                <div>
                                  <h3 className="font-medium text-[#000080]">{student.name}</h3>
                                  <p className="text-sm text-slate-600">Roll No: {student.rollNo}</p>
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center text-[#138808]">
                                  <span className="mr-1 text-sm">Contact Parent</span>
                                  <ChevronRight className="h-4 w-4" />
                                </div>
                                <p className="text-sm text-slate-600">{student.parent.name}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="bulk" className="mt-0">
                <Card className="border-[#138808]/20">
                  <CardHeader>
                    <CardTitle className="text-[#000080]">Bulk Communication</CardTitle>
                    <CardDescription>
                      Send a message to all parents in {data?.className} {data?.classSection}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#000080] mb-1">Message</label>
                        <Textarea 
                          placeholder="Type your message here..." 
                          rows={6}
                          value={bulkMessage}
                          onChange={(e) => setBulkMessage(e.target.value)}
                        />
                      </div>
                      <div className="border p-4 rounded-lg bg-slate-50">
                        <h3 className="font-medium text-[#000080] mb-2">This message will be sent to:</h3>
                        <div className="flex flex-wrap gap-2">
                          {data?.students.map(student => (
                            <div key={student.id} className="bg-white px-3 py-1 rounded-full border text-sm">
                              {student.parent.name} (Parent of {student.name})
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button 
                      variant="tricolor"
                      onClick={handleSendBulkMessage}
                      className="gap-2"
                    >
                      <Send className="h-4 w-4" />
                      Send to All Parents
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="history" className="mt-0">
                <Card className="border-[#138808]/20">
                  <CardHeader>
                    <CardTitle className="text-[#000080]">Communication History</CardTitle>
                    <CardDescription>
                      Recent communications with parents
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {data?.communicationHistory.map(communication => (
                        <div 
                          key={communication.id} 
                          className={`p-4 rounded-lg border ${
                            communication.direction === 'incoming' 
                              ? 'border-blue-200 bg-blue-50' 
                              : 'border-[#138808]/20'
                          }`}
                        >
                          <div className="flex justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getCommunicationTypeIcon(communication.type)}
                              <span className="font-medium text-[#000080]">
                                {communication.direction === 'incoming' ? communication.parentName : 'You'} 
                                {communication.direction === 'incoming' ? ' (Parent)' : ''}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-slate-500">
                              <Clock className="h-4 w-4" />
                              <span>
                                {new Date(communication.date).toLocaleDateString()} 
                                {" "}
                                {new Date(communication.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </span>
                            </div>
                          </div>
                          <p className="mb-2">{communication.content}</p>
                          <div className="text-sm text-slate-600">
                            <span className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              Regarding: {communication.studentName}
                            </span>
                          </div>
                        </div>
                      ))}
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

export default ParentCommunicationPage;

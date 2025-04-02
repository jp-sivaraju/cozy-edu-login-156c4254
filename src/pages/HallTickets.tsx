
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { FileText, Download, AlertTriangle, Calendar, Clock, MapPin, Info } from 'lucide-react';

// Mock API call
const fetchHallTickets = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    currentExams: [
      {
        id: "ticket1",
        name: "Mid-Term Examination",
        status: "available",
        date: "2023-10-20",
        details: {
          studentName: "Ravi Sharma",
          rollNumber: "A2023-08-12",
          class: "VIII-A",
          exams: [
            { subject: "Mathematics", date: "2023-10-22", time: "09:00 - 11:00", venue: "Hall A" },
            { subject: "Science", date: "2023-10-24", time: "09:00 - 11:00", venue: "Hall B" },
            { subject: "English", date: "2023-10-26", time: "09:00 - 11:00", venue: "Hall A" },
            { subject: "Social Studies", date: "2023-10-28", time: "09:00 - 11:00", venue: "Hall B" },
            { subject: "Hindi", date: "2023-10-30", time: "09:00 - 11:00", venue: "Hall A" }
          ],
          instructions: [
            "Bring your school ID card",
            "Reach the examination hall 15 minutes before the scheduled time",
            "Carry only permitted stationery items",
            "Electronic devices are not allowed",
            "Read all questions carefully before answering"
          ]
        }
      }
    ],
    pastExams: [
      {
        id: "ticket2",
        name: "First Unit Test",
        status: "expired",
        date: "2023-08-10"
      }
    ],
    upcomingExams: [
      {
        id: "ticket3",
        name: "Final Examination",
        status: "upcoming",
        date: "2024-03-15"
      }
    ]
  };
};

const HallTickets = () => {
  const [activeTab, setActiveTab] = useState("current");
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ['hallTickets'],
    queryFn: fetchHallTickets,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-[#138808] text-white';
      case 'expired':
        return 'bg-slate-500 text-white';
      case 'upcoming':
        return 'bg-[#FF9933] text-white';
      default:
        return 'bg-slate-200 text-slate-800';
    }
  };

  const downloadHallTicket = () => {
    alert("Hall ticket download functionality would be implemented here");
  };

  const renderHallTicketDetails = (ticket: any) => {
    if (!ticket.details) return null;
    const { details } = ticket;
    
    return (
      <div className="space-y-6">
        <div className="p-6 border border-[#138808]/20 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold">{ticket.name} - Hall Ticket</h2>
              <p className="text-slate-500">Valid for examinations from {
                new Date(details.exams[0].date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              } to {
                new Date(details.exams[details.exams.length - 1].date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              }</p>
            </div>
            <Button
              onClick={downloadHallTicket}
              className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-white"
            >
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-slate-500">Student Name</p>
              <p className="font-medium">{details.studentName}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Roll Number</p>
              <p className="font-medium">{details.rollNumber}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Class</p>
              <p className="font-medium">{details.class}</p>
            </div>
          </div>
          
          <div className="border-t border-[#138808]/20 pt-6 mb-6">
            <h3 className="font-medium text-lg mb-4">Examination Schedule</h3>
            <div className="space-y-4">
              {details.exams.map((exam: any, index: number) => (
                <div key={index} className="p-4 border border-[#138808]/20 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">{exam.subject}</h4>
                    <Badge className={getStatusColor(
                      new Date(exam.date) < new Date() ? 'expired' : 
                      new Date(exam.date).toDateString() === new Date().toDateString() ? 'available' : 
                      'upcoming'
                    )}>
                      {new Date(exam.date) < new Date() ? 'Completed' : 
                       new Date(exam.date).toDateString() === new Date().toDateString() ? 'Today' : 
                       'Upcoming'}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-[#000080] mr-2" />
                      <span className="text-sm">{new Date(exam.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-[#FF9933] mr-2" />
                      <span className="text-sm">{exam.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-[#138808] mr-2" />
                      <span className="text-sm">{exam.venue}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t border-[#138808]/20 pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-5 w-5 text-[#FF9933]" />
              <h3 className="font-medium text-lg">Important Instructions</h3>
            </div>
            <div className="bg-[#FFF9F0] border border-[#FF9933]/20 rounded-lg p-4">
              <ul className="space-y-2 list-disc pl-5">
                {details.instructions.map((instruction: string, index: number) => (
                  <li key={index} className="text-slate-700">{instruction}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderExamList = (exams: any[]) => {
    if (!exams || exams.length === 0) {
      return (
        <div className="text-center py-8 text-slate-400">
          <FileText className="mx-auto h-12 w-12 mb-2 opacity-20" />
          <p>No hall tickets available in this category</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        {exams.map((exam) => (
          <Card key={exam.id} className="border-[#138808]/30">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg">{exam.name}</h3>
                  <p className="text-sm text-slate-500">
                    {new Date(exam.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <Badge className={getStatusColor(exam.status)}>
                  {exam.status === 'available' ? 'Available' :
                   exam.status === 'expired' ? 'Expired' : 'Upcoming'}
                </Badge>
              </div>
              
              {exam.status === 'available' && (
                <div className="mt-4">
                  <Button
                    onClick={() => setActiveTab("details")}
                    className="bg-[#000080] hover:bg-[#000080]/90 text-white"
                  >
                    <FileText className="mr-2 h-4 w-4" /> View Hall Ticket
                  </Button>
                </div>
              )}
              
              {exam.status === 'upcoming' && (
                <Alert className="mt-4 bg-[#FFF9F0] border-[#FF9933]">
                  <AlertTriangle className="h-4 w-4 text-[#FF9933]" />
                  <AlertDescription className="text-slate-700">
                    Hall ticket will be available 7 days before the examination.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="container p-6">
        <h1 className="text-3xl font-bold text-[#138808] mb-2">Hall Tickets</h1>
        <p className="text-slate-500 mb-6">
          View and download examination hall tickets
        </p>
        
        <Tabs defaultValue="current" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-slate-100">
            <TabsTrigger 
              value="current"
              className={`flex-1 ${activeTab === "current" ? "bg-[#FF9933] text-white" : ""}`}
            >
              Current Exams
            </TabsTrigger>
            <TabsTrigger 
              value="upcoming"
              className={`flex-1 ${activeTab === "upcoming" ? "bg-[#FF9933] text-white" : ""}`}
            >
              Upcoming Exams
            </TabsTrigger>
            <TabsTrigger 
              value="past"
              className={`flex-1 ${activeTab === "past" ? "bg-[#FF9933] text-white" : ""}`}
            >
              Past Exams
            </TabsTrigger>
            {data?.currentExams[0]?.details && (
              <TabsTrigger 
                value="details"
                className={`flex-1 ${activeTab === "details" ? "bg-[#FF9933] text-white" : ""}`}
              >
                Hall Ticket Details
              </TabsTrigger>
            )}
          </TabsList>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="h-8 w-8 border-4 border-t-[#138808] border-[#138808]/20 rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertDescription>
                Failed to load hall tickets. Please try again later.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <TabsContent value="current" className="mt-0">
                {renderExamList(data?.currentExams || [])}
              </TabsContent>
              
              <TabsContent value="upcoming" className="mt-0">
                {renderExamList(data?.upcomingExams || [])}
              </TabsContent>
              
              <TabsContent value="past" className="mt-0">
                {renderExamList(data?.pastExams || [])}
              </TabsContent>
              
              {data?.currentExams[0]?.details && (
                <TabsContent value="details" className="mt-0">
                  {renderHallTicketDetails(data.currentExams[0])}
                </TabsContent>
              )}
            </>
          )}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default HallTickets;

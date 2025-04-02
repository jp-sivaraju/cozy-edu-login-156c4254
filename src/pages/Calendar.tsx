
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar as CalendarIcon, Clock, Info, FileText, Backpack } from 'lucide-react';

// Mock API call
const fetchCalendarEvents = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  return {
    events: [
      {
        id: "event1",
        title: "Annual Sports Day",
        date: new Date(currentYear, currentMonth, 15).toISOString(),
        type: "event",
        description: "Annual inter-house sports competition",
        time: "09:00 - 16:00",
        venue: "School Sports Ground"
      },
      {
        id: "event2",
        title: "Science Exhibition",
        date: new Date(currentYear, currentMonth, 22).toISOString(),
        type: "event",
        description: "Students will showcase their science projects",
        time: "10:00 - 15:00",
        venue: "School Auditorium"
      },
      {
        id: "event3",
        title: "Parent-Teacher Meeting",
        date: new Date(currentYear, currentMonth, 10).toISOString(),
        type: "important_day",
        description: "Discuss student progress with teachers",
        time: "14:00 - 17:00",
        venue: "Respective Classrooms"
      }
    ],
    exams: [
      {
        id: "exam1",
        title: "Mid-Term Mathematics",
        date: new Date(currentYear, currentMonth, 18).toISOString(),
        type: "exam",
        description: "Covers chapters 1-5",
        time: "09:30 - 11:30",
        venue: "Examination Hall"
      },
      {
        id: "exam2",
        title: "Mid-Term Science",
        date: new Date(currentYear, currentMonth, 20).toISOString(),
        type: "exam",
        description: "Covers Physics, Chemistry and Biology topics from chapters 1-6",
        time: "09:30 - 11:30",
        venue: "Examination Hall"
      },
      {
        id: "exam3",
        title: "Mid-Term English",
        date: new Date(currentYear, currentMonth, 23).toISOString(),
        type: "exam",
        description: "Covers literature and grammar",
        time: "09:30 - 11:30",
        venue: "Examination Hall"
      }
    ],
    importantDays: [
      {
        id: "imp1",
        title: "Last Date for Fee Payment",
        date: new Date(currentYear, currentMonth, 5).toISOString(),
        type: "important_day",
        description: "Term fees must be paid by this date to avoid late fee",
        time: "Before 15:00",
        venue: "School Accounts Office"
      },
      {
        id: "imp2",
        title: "School Holiday - Independence Day",
        date: new Date(currentYear, currentMonth, 15).toISOString(),
        type: "important_day",
        description: "National holiday",
        time: "All Day",
        venue: "N/A"
      }
    ]
  };
};

const Calendar = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [date, setDate] = useState<Date>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ['calendarEvents'],
    queryFn: fetchCalendarEvents,
  });

  const allEvents = data ? [...data.events, ...data.exams, ...data.importantDays] : [];
  const events = data?.events || [];
  const exams = data?.exams || [];
  const importantDays = data?.importantDays || [];

  // Function to show events for a specific date
  const getEventsForDate = (date: Date, eventList: any[]) => {
    return eventList.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === date.getDate() &&
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getFullYear() === date.getFullYear();
    });
  };

  // Determine which events to show based on the active tab
  const currentEvents = activeTab === "all" ? allEvents :
                         activeTab === "events" ? events :
                         activeTab === "exams" ? exams : importantDays;

  // Get events for the selected date
  const selectedDateEvents = getEventsForDate(date, currentEvents);

  // Function to handle event click
  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
  };

  // Function to get badge color based on event type
  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'event':
        return 'bg-[#000080] text-white';
      case 'exam':
        return 'bg-[#FF9933] text-white';
      case 'important_day':
        return 'bg-[#138808] text-white';
      default:
        return 'bg-slate-200 text-slate-800';
    }
  };

  // Function to get icon based on event type
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'event':
        return <CalendarIcon className="h-4 w-4" />;
      case 'exam':
        return <FileText className="h-4 w-4" />;
      case 'important_day':
        return <Info className="h-4 w-4" />;
      default:
        return <CalendarIcon className="h-4 w-4" />;
    }
  };

  // Function to highlight dates with events in the calendar
  const highlightedDates = allEvents.map(event => new Date(event.date));

  return (
    <DashboardLayout>
      <div className="container p-6">
        <h1 className="text-3xl font-bold text-[#138808] mb-2">Event Calendar</h1>
        <p className="text-slate-500 mb-6">
          View upcoming school events, exams, and important dates
        </p>
        
        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-slate-100">
            <TabsTrigger 
              value="all"
              className={`flex-1 ${activeTab === "all" ? "bg-[#FF9933] text-white" : ""}`}
            >
              All
            </TabsTrigger>
            <TabsTrigger 
              value="events"
              className={`flex-1 ${activeTab === "events" ? "bg-[#FF9933] text-white" : ""}`}
            >
              Events
            </TabsTrigger>
            <TabsTrigger 
              value="exams"
              className={`flex-1 ${activeTab === "exams" ? "bg-[#FF9933] text-white" : ""}`}
            >
              Exams
            </TabsTrigger>
            <TabsTrigger 
              value="important_days"
              className={`flex-1 ${activeTab === "important_days" ? "bg-[#FF9933] text-white" : ""}`}
            >
              Important Days
            </TabsTrigger>
          </TabsList>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="h-8 w-8 border-4 border-t-[#138808] border-[#138808]/20 rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertDescription>
                Failed to load calendar data. Please try again later.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Calendar */}
              <Card className="md:col-span-2 border-[#138808]/30">
                <CardHeader className="bg-[#FF9933]/10 border-b border-[#138808]/20">
                  <CardTitle className="text-[#000080]">
                    {date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    className="rounded-md border-[#138808]/20"
                    modifiers={{
                      highlighted: highlightedDates
                    }}
                    modifiersStyles={{
                      highlighted: { 
                        backgroundColor: '#FFE8CC',
                        fontWeight: 'bold',
                        color: '#000080' 
                      }
                    }}
                  />
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge className="bg-[#000080]">Events</Badge>
                    <Badge className="bg-[#FF9933]">Exams</Badge>
                    <Badge className="bg-[#138808]">Important Days</Badge>
                  </div>
                </CardContent>
              </Card>
              
              {/* Events for selected date */}
              <Card className="md:col-span-3 border-[#138808]/30">
                <CardHeader className="bg-[#FF9933]/10 border-b border-[#138808]/20">
                  <CardTitle className="text-[#000080]">
                    Events for {date.toLocaleDateString('en-US', { 
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  {selectedDateEvents.length > 0 ? (
                    <div className="space-y-4">
                      {selectedDateEvents.map((event) => (
                        <div 
                          key={event.id} 
                          className="border border-[#138808]/20 rounded-lg p-4 hover:bg-slate-50 cursor-pointer transition-colors"
                          onClick={() => handleEventClick(event)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex gap-3">
                              <div className={`p-2 rounded-full ${
                                event.type === 'event' ? 'bg-[#000080]/10' :
                                event.type === 'exam' ? 'bg-[#FF9933]/10' :
                                'bg-[#138808]/10'
                              }`}>
                                {getEventIcon(event.type)}
                              </div>
                              <div>
                                <h3 className="font-semibold">{event.title}</h3>
                                <p className="text-sm text-slate-500">{event.description}</p>
                              </div>
                            </div>
                            <Badge className={getBadgeColor(event.type)}>
                              {event.type === 'event' ? 'Event' :
                               event.type === 'exam' ? 'Exam' :
                               'Important'}
                            </Badge>
                          </div>
                          <div className="mt-3 flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-1 text-[#000080]">
                              <Clock className="h-3 w-3" />
                              <span>{event.time}</span>
                            </div>
                            {event.venue !== 'N/A' && (
                              <div className="flex items-center gap-1 text-[#138808]">
                                <Backpack className="h-3 w-3" />
                                <span>{event.venue}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-400">
                      <CalendarIcon className="mx-auto h-12 w-12 mb-2 opacity-20" />
                      <p>No events scheduled for this date</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Calendar;


import React, { useState } from 'react';
import { format, addDays, startOfWeek, getDay, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CalendarEvent {
  id: number;
  name: string;
  time: string;
  teacher?: string;
  subject?: string;
  location?: string;
  color?: string;
}

interface WeeklyScheduleProps {
  events: CalendarEvent[];
  isTeacherView?: boolean;
}

const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

const WeeklySchedule = ({ events, isTeacherView = false }: WeeklyScheduleProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start from Monday
  
  const days = Array.from({ length: 7 }).map((_, i) => {
    const date = addDays(startDate, i);
    return {
      date,
      dayName: format(date, 'EEE'),
      isToday: isSameDay(date, new Date())
    };
  });
  
  const getEventsForDayAndTime = (day: number, timeSlot: string) => {
    return events.filter(event => {
      const eventDay = getDay(new Date()) - 1; // Today's day
      const dayIndex = day;
      
      // For simplicity in mock data, we're checking just the time part
      return event.time.includes(timeSlot);
    });
  };
  
  const navigateToPreviousWeek = () => {
    setCurrentDate(prevDate => addDays(prevDate, -7));
  };
  
  const navigateToNextWeek = () => {
    setCurrentDate(prevDate => addDays(prevDate, 7));
  };
  
  const navigateToCurrentWeek = () => {
    setCurrentDate(new Date());
  };
  
  const getEventColor = (event: CalendarEvent) => {
    if (event.color) return event.color;
    
    // Default color scheme based on subject or name if no color is provided
    const subjects: Record<string, string> = {
      'Mathematics': 'bg-blue-100 border-blue-300 text-blue-700',
      'Science': 'bg-green-100 border-green-300 text-green-700',
      'English': 'bg-purple-100 border-purple-300 text-purple-700',
      'History': 'bg-yellow-100 border-yellow-300 text-yellow-700',
      'Geography': 'bg-orange-100 border-orange-300 text-orange-700',
      'Physics': 'bg-indigo-100 border-indigo-300 text-indigo-700',
      'Chemistry': 'bg-pink-100 border-pink-300 text-pink-700',
      'Biology': 'bg-teal-100 border-teal-300 text-teal-700',
      'Computer': 'bg-cyan-100 border-cyan-300 text-cyan-700',
      'Physical Education': 'bg-red-100 border-red-300 text-red-700',
      'Lunch Break': 'bg-gray-100 border-gray-300 text-gray-700',
      'Meeting': 'bg-amber-100 border-amber-300 text-amber-700',
    };
    
    const subjectName = event.subject || event.name.split(' ')[0];
    return subjects[subjectName] || 'bg-gray-100 border-gray-300 text-gray-700';
  };

  // Calculate schedule statistics
  const totalClasses = events.filter(event => 
    !event.name.includes('Lunch') && !event.name.includes('Break') && !event.name.includes('Meeting')
  ).length;
  
  const todayEvents = events.filter(event => {
    // In a real app, we would filter by actual date
    // For this mock, we'll just return some events
    return true;
  }).sort((a, b) => {
    // Sort by time
    const timeA = new Date(`2023-01-01 ${a.time}`);
    const timeB = new Date(`2023-01-01 ${b.time}`);
    return timeA.getTime() - timeB.getTime();
  });
  
  // Find next class (first event after current time)
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: 'numeric', 
    hour12: true 
  });
  
  const nextClass = todayEvents.find(event => {
    const eventTime = event.time;
    // Simple string comparison - in a real app we would use proper date comparison
    return eventTime > currentTime;
  });
  
  // Find free periods (timeSlots without events)
  const busyTimeSlots = events.map(event => event.time);
  const freePeriods = timeSlots.filter(timeSlot => !busyTimeSlots.includes(timeSlot));
  
  return (
    <div className="weekly-schedule space-y-6">
      {/* Schedule Summary - New section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="border-[#138808]/20 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="text-blue-700 font-medium text-lg mb-1">Today's Schedule</h3>
            <div className="space-y-2 mt-3">
              {todayEvents.slice(0, 3).map((event, index) => (
                <div key={index} className="flex items-center p-2 bg-white rounded-md border border-blue-100">
                  <Clock className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="font-medium">{event.time}</span>
                  <span className="mx-2">-</span>
                  <span>{event.name}</span>
                </div>
              ))}
              {todayEvents.length > 3 && (
                <div className="text-sm text-blue-600 font-medium text-center">
                  +{todayEvents.length - 3} more classes
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-[#138808]/20 bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <h3 className="text-purple-700 font-medium text-lg mb-1">Next Class</h3>
            {nextClass ? (
              <div className="p-3 bg-white rounded-md border border-purple-100 mt-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-500" />
                  <span className="font-medium">{nextClass.time}</span>
                </div>
                <div className="font-medium text-lg mt-1">{nextClass.name}</div>
                <div className="text-sm text-slate-500 mt-1">
                  {isTeacherView ? (
                    nextClass.location && <div>Room: {nextClass.location}</div>
                  ) : (
                    nextClass.teacher && <div>Teacher: {nextClass.teacher}</div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-20 bg-white rounded-md border border-purple-100 mt-3">
                <p className="text-slate-500">No more classes for today</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="border-[#138808]/20 bg-green-50 border-green-200">
          <CardContent className="p-4">
            <h3 className="text-green-700 font-medium text-lg mb-1">Schedule Overview</h3>
            <div className="space-y-2 mt-3">
              <div className="flex justify-between items-center p-2 bg-white rounded-md border border-green-100">
                <span>Total Classes</span>
                <span className="font-bold">{totalClasses}</span>
              </div>
              
              <div className="flex justify-between items-center p-2 bg-white rounded-md border border-green-100">
                <span>Free Periods</span>
                <span className="font-bold">{freePeriods.length}</span>
              </div>
              
              <div className="flex justify-between items-center p-2 bg-white rounded-md border border-green-100">
                <span>Hours Engaged</span>
                <span className="font-bold">{busyTimeSlots.length} hrs</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Week Navigation - Original part */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#000080]">
          Week of {format(startDate, 'MMMM d, yyyy')}
        </h2>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={navigateToPreviousWeek}
            className="border-[#138808]/30 text-[#000080]"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={navigateToCurrentWeek}
            className="border-[#138808]/30 text-[#000080]"
          >
            Today
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={navigateToNextWeek}
            className="border-[#138808]/30 text-[#000080]"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Day headers */}
          <div className="grid grid-cols-8 gap-1">
            <div className="w-20"></div> {/* Empty cell for time column */}
            {days.map((day, index) => (
              <div 
                key={index} 
                className={cn(
                  "text-center py-2 font-medium px-2 rounded-t-md",
                  day.isToday ? "bg-[#138808]/10 text-[#138808]" : "bg-slate-100 text-[#000080]"
                )}
              >
                <div>{day.dayName}</div>
                <div className={day.isToday ? "text-[#138808] font-bold" : ""}>
                  {format(day.date, 'd')}
                </div>
              </div>
            ))}
          </div>
          
          {/* Time slots and events */}
          {timeSlots.map((timeSlot, timeIndex) => (
            <div 
              key={timeIndex} 
              className={cn(
                "grid grid-cols-8 gap-1 border-t border-[#138808]/10",
                timeIndex % 2 === 0 ? "bg-white" : "bg-slate-50"
              )}
            >
              <div className="w-20 p-2 text-xs font-medium text-slate-500 flex items-center">
                {timeSlot}
              </div>
              
              {days.map((_, dayIndex) => {
                const dayEvents = getEventsForDayAndTime(dayIndex, timeSlot);
                
                return (
                  <div 
                    key={dayIndex} 
                    className="relative min-h-[80px] p-1 border-r border-[#138808]/10"
                  >
                    {dayEvents.length > 0 ? (
                      dayEvents.map(event => (
                        <Card
                          key={event.id}
                          className={cn(
                            "text-xs p-1 h-full flex flex-col border",
                            getEventColor(event)
                          )}
                        >
                          <CardContent className="p-2 flex-1 flex flex-col">
                            <div className="font-medium mb-1">{event.name}</div>
                            {isTeacherView ? (
                              <>
                                {event.location && <div className="text-xs opacity-75">Room: {event.location}</div>}
                                {event.subject && <div className="text-xs opacity-75">Class: {event.subject}</div>}
                              </>
                            ) : (
                              <>
                                {event.teacher && <div className="text-xs opacity-75">Teacher: {event.teacher}</div>}
                                {event.location && <div className="text-xs opacity-75">Room: {event.location}</div>}
                              </>
                            )}
                            <div className="text-xs mt-auto opacity-75">{timeSlot}</div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="h-full w-full"></div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklySchedule;

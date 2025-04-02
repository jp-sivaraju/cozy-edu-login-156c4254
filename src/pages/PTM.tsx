
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, Calendar, Clock, MapPin, MessageSquare, 
  CalendarCheck, Star, ChevronRight, AlertTriangle, Check
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock API call
const fetchPTMData = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    upcoming: [
      {
        id: "ptm1",
        title: "Mid-Term Parent-Teacher Meeting",
        date: "2023-11-20",
        timeSlots: [
          { id: "slot1", time: "09:00 - 09:15", available: true },
          { id: "slot2", time: "09:15 - 09:30", available: false },
          { id: "slot3", time: "09:30 - 09:45", available: true },
          { id: "slot4", time: "09:45 - 10:00", available: true },
          { id: "slot5", time: "10:00 - 10:15", available: true },
          { id: "slot6", time: "10:15 - 10:30", available: false }
        ],
        venue: "School Auditorium",
        teachers: [
          { id: "teacher1", name: "Mrs. Sharma", subject: "Mathematics" },
          { id: "teacher2", name: "Mr. Patel", subject: "Science" },
          { id: "teacher3", name: "Mrs. Gupta", subject: "English" }
        ],
        description: "This Parent-Teacher Meeting aims to discuss your child's progress in the mid-term assessments and provide feedback on areas of improvement. Teachers will share insights about academic performance, classroom behavior, and participation."
      }
    ],
    past: [
      {
        id: "ptm2",
        title: "First Term Parent-Teacher Meeting",
        date: "2023-07-15",
        venue: "School Auditorium",
        feedback: {
          rating: 4,
          comments: "The meeting was well-organized. Teachers provided valuable insights about my child's progress.",
          submitted: true
        },
        notes: "Teachers highlighted Ravi's strong performance in Mathematics and Science. Areas for improvement include English comprehension and more participation in class discussions."
      }
    ]
  };
};

const PTM = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedPTM, setSelectedPTM] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState<number>(0);
  const [feedbackComments, setFeedbackComments] = useState("");
  
  const { user } = useAuth();
  const { toast } = useToast();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['ptmData'],
    queryFn: fetchPTMData,
  });

  const confirmBooking = () => {
    if (!selectedSlot || !selectedTeacher) {
      toast({
        title: "Error",
        description: "Please select both a time slot and a teacher",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Appointment Booked",
      description: "Your PTM appointment has been booked successfully!",
    });
    
    setBookingDialogOpen(false);
    setSelectedSlot(null);
    setSelectedTeacher(null);
  };

  const handleFeedbackSubmit = () => {
    toast({
      title: "Feedback Submitted",
      description: "Thank you for providing your feedback about the PTM.",
    });
    
    setFeedbackDialogOpen(false);
    refetch();
  };

  const renderUpcomingPTM = () => {
    if (!data?.upcoming || data.upcoming.length === 0) {
      return (
        <div className="text-center py-8 text-slate-400">
          <Users className="mx-auto h-12 w-12 mb-2 opacity-20" />
          <p>No upcoming Parent-Teacher Meetings scheduled</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        {data.upcoming.map((ptm) => (
          <Card key={ptm.id} className="border-[#138808]/30">
            <CardHeader className="bg-[#FF9933]/10 border-b border-[#138808]/20">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-[#000080]">{ptm.title}</CardTitle>
                  <p className="text-sm text-slate-500">
                    {new Date(ptm.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <Badge className="bg-[#138808]">Upcoming</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-[#FF9933] mr-2" />
                    <span>{ptm.venue}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-[#000080] mr-2" />
                    <span>{ptm.teachers.length} Teachers Available</span>
                  </div>
                </div>
                
                <p className="text-slate-600">{ptm.description}</p>
                
                <div className="bg-[#138808]/5 border border-[#138808]/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-4 w-4 text-[#138808]" />
                    <h3 className="font-medium">Appointment Status</h3>
                  </div>
                  
                  {selectedSlot ? (
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Your appointment is confirmed</p>
                        <p className="text-sm text-slate-500">
                          Time: {ptm.timeSlots.find(slot => slot.id === selectedSlot)?.time}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#FF9933] text-[#FF9933] hover:bg-[#FF9933]/10"
                        onClick={() => setSelectedSlot(null)}
                      >
                        Reschedule
                      </Button>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">You haven't booked an appointment yet</p>
                        <p className="text-sm text-slate-500">
                          Book now to secure your preferred time slot
                        </p>
                      </div>
                      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
                        <DialogTrigger asChild>
                          <Button className="bg-[#138808] hover:bg-[#138808]/90 text-white">
                            Book Appointment
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Book PTM Appointment</DialogTitle>
                            <DialogDescription>
                              Select your preferred time slot and teacher for the appointment.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                              <h3 className="font-medium">Select Time Slot</h3>
                              <div className="grid grid-cols-2 gap-2">
                                {ptm.timeSlots.map((slot) => (
                                  <Button
                                    key={slot.id}
                                    variant={selectedSlot === slot.id ? "default" : "outline"}
                                    className={`justify-start ${
                                      selectedSlot === slot.id ? 
                                        "bg-[#138808] text-white" : 
                                        slot.available ? 
                                          "border-[#138808]/20 hover:border-[#138808]" : 
                                          "bg-slate-100 text-slate-400 cursor-not-allowed"
                                    }`}
                                    onClick={() => slot.available && setSelectedSlot(slot.id)}
                                    disabled={!slot.available}
                                  >
                                    <Clock className="mr-2 h-4 w-4" />
                                    {slot.time}
                                  </Button>
                                ))}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <h3 className="font-medium">Select Teacher</h3>
                              <Select value={selectedTeacher || ""} onValueChange={setSelectedTeacher}>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select a teacher" />
                                </SelectTrigger>
                                <SelectContent>
                                  {ptm.teachers.map((teacher) => (
                                    <SelectItem key={teacher.id} value={teacher.id}>
                                      {teacher.name} ({teacher.subject})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button 
                              variant="outline" 
                              onClick={() => setBookingDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button 
                              className="bg-[#138808] hover:bg-[#138808]/90 text-white"
                              onClick={confirmBooking}
                            >
                              Confirm Booking
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </div>
                
                <div className="bg-[#FFF9F0] border border-[#FF9933]/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-[#FF9933]" />
                    <h3 className="font-medium">Important Notice</h3>
                  </div>
                  <ul className="text-sm text-slate-600 list-disc pl-5 space-y-1">
                    <li>Please arrive 10 minutes before your scheduled time</li>
                    <li>Bring your child's school diary</li>
                    <li>Review your child's recent assessments before the meeting</li>
                    <li>Appointments are limited to 15 minutes per teacher</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderPastPTM = () => {
    if (!data?.past || data.past.length === 0) {
      return (
        <div className="text-center py-8 text-slate-400">
          <CalendarCheck className="mx-auto h-12 w-12 mb-2 opacity-20" />
          <p>No past Parent-Teacher Meetings found</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        {data.past.map((ptm) => (
          <Card key={ptm.id} className="border-[#138808]/30">
            <CardHeader className="bg-[#FF9933]/10 border-b border-[#138808]/20">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-[#000080]">{ptm.title}</CardTitle>
                  <p className="text-sm text-slate-500">
                    {new Date(ptm.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <Badge className="bg-slate-500">Completed</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="bg-slate-50 border border-[#000080]/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="h-4 w-4 text-[#000080]" />
                    <h3 className="font-medium">Teacher's Notes</h3>
                  </div>
                  <p className="text-slate-700">{ptm.notes}</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#FF9933]" />
                    <span className="text-slate-600">{ptm.venue}</span>
                  </div>
                  
                  {ptm.feedback && ptm.feedback.submitted ? (
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < ptm.feedback.rating ? 'text-[#FF9933] fill-[#FF9933]' : 'text-slate-300'}`} 
                          />
                        ))}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#138808]"
                        onClick={() => {
                          setSelectedPTM(ptm);
                          setFeedbackRating(ptm.feedback.rating);
                          setFeedbackComments(ptm.feedback.comments || "");
                          setFeedbackDialogOpen(true);
                        }}
                      >
                        View Feedback
                      </Button>
                    </div>
                  ) : (
                    <Dialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#FF9933] text-[#FF9933] hover:bg-[#FF9933]/10"
                          onClick={() => setSelectedPTM(ptm)}
                        >
                          Give Feedback
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>PTM Feedback</DialogTitle>
                          <DialogDescription>
                            Share your feedback about the Parent-Teacher Meeting
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <h3 className="font-medium">Rate your experience</h3>
                            <div className="flex gap-2">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Button
                                  key={i}
                                  variant="ghost"
                                  size="sm"
                                  className={feedbackRating > i ? 'text-[#FF9933]' : 'text-slate-300'}
                                  onClick={() => setFeedbackRating(i + 1)}
                                >
                                  <Star className={`h-6 w-6 ${feedbackRating > i ? 'fill-[#FF9933]' : ''}`} />
                                </Button>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-medium">Comments</h3>
                            <Textarea
                              placeholder="Share your thoughts about the PTM..."
                              value={feedbackComments}
                              onChange={(e) => setFeedbackComments(e.target.value)}
                              rows={4}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button 
                            variant="outline" 
                            onClick={() => setFeedbackDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button 
                            className="bg-[#138808] hover:bg-[#138808]/90 text-white"
                            onClick={handleFeedbackSubmit}
                            disabled={feedbackRating === 0}
                          >
                            Submit Feedback
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="container p-6">
        <h1 className="text-3xl font-bold text-[#138808] mb-2">Parent-Teacher Meetings</h1>
        <p className="text-slate-500 mb-6">
          Schedule appointments and view past interactions with teachers
        </p>
        
        <Tabs defaultValue="upcoming" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-slate-100">
            <TabsTrigger 
              value="upcoming"
              className={`flex-1 ${activeTab === "upcoming" ? "bg-[#FF9933] text-white" : ""}`}
            >
              <Calendar className="h-4 w-4 mr-2" /> Upcoming PTMs
            </TabsTrigger>
            <TabsTrigger 
              value="past"
              className={`flex-1 ${activeTab === "past" ? "bg-[#FF9933] text-white" : ""}`}
            >
              <CalendarCheck className="h-4 w-4 mr-2" /> Past PTMs
            </TabsTrigger>
          </TabsList>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="h-8 w-8 border-4 border-t-[#138808] border-[#138808]/20 rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertDescription>
                Failed to load PTM data. Please try again later.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <TabsContent value="upcoming" className="mt-0">
                {renderUpcomingPTM()}
              </TabsContent>
              
              <TabsContent value="past" className="mt-0">
                {renderPastPTM()}
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PTM;

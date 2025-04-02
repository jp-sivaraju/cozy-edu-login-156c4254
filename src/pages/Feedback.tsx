
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { MessageSquare, Send, Star, ThumbsUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Mock API call
const fetchFeedback = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    submissions: [
      {
        id: "feedback1",
        subject: "School Infrastructure",
        message: "I would like to suggest some improvements to the school library. It would be beneficial to have more study spaces and better lighting for students.",
        rating: 4,
        status: "responded",
        createdAt: "2023-08-15T10:30:00Z",
        response: {
          message: "Thank you for your feedback. We're currently planning renovations for the library which will include more study spaces and improved lighting. The work is scheduled to begin during the winter break.",
          createdAt: "2023-08-18T14:20:00Z"
        }
      },
      {
        id: "feedback2",
        subject: "Transportation Service",
        message: "The school bus has been consistently late by 10-15 minutes this month. This is causing my child to miss the morning assembly.",
        rating: 2,
        status: "responded",
        createdAt: "2023-09-05T08:15:00Z",
        response: {
          message: "We apologize for the inconvenience. We've spoken with the transportation team and they've adjusted the route timing. Please let us know if you continue to experience delays.",
          createdAt: "2023-09-06T11:30:00Z"
        }
      },
      {
        id: "feedback3",
        subject: "Canteen Food Quality",
        message: "I appreciate the recent improvements in the school canteen menu. The healthy options are a great addition.",
        rating: 5,
        status: "pending",
        createdAt: "2023-10-10T13:45:00Z",
        response: null
      }
    ]
  };
};

const Feedback = () => {
  const [activeTab, setActiveTab] = useState("submit");
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState<string>("3");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['feedback'],
    queryFn: fetchFeedback,
  });

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject || !message) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback! We will review it shortly.",
      });
      
      setSubject("");
      setMessage("");
      setRating("3");
      setIsSubmitting(false);
      
      // Refetch feedback to update the list
      refetch();
      
      // Switch to past feedbacks tab
      setActiveTab("past");
    }, 1500);
  };

  const renderFeedbackForm = () => {
    return (
      <Card className="border-[#138808]/30">
        <CardHeader className="bg-[#FF9933]/10 border-b border-[#138808]/20">
          <CardTitle className="text-[#000080]">Submit Your Feedback</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleFeedbackSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject <span className="text-red-500">*</span></Label>
              <Input
                id="subject"
                placeholder="Enter a subject for your feedback"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Your Feedback <span className="text-red-500">*</span></Label>
              <Textarea
                id="message"
                placeholder="Please share your thoughts, suggestions, or concerns"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rating">How would you rate your experience?</Label>
              <RadioGroup
                id="rating"
                value={rating}
                onValueChange={setRating}
                className="flex space-x-4 pt-2"
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex flex-col items-center space-y-2">
                    <RadioGroupItem 
                      value={value.toString()} 
                      id={`rating-${value}`} 
                      className="peer sr-only" 
                    />
                    <Label
                      htmlFor={`rating-${value}`}
                      className={`h-12 w-12 rounded-full flex items-center justify-center cursor-pointer border-2 ${
                        rating === value.toString()
                          ? 'bg-[#FF9933] text-white border-[#FF9933]'
                          : 'border-slate-300 hover:border-[#FF9933]/50'
                      }`}
                    >
                      {value}
                    </Label>
                    <span className="text-xs text-slate-500">
                      {value === 1 ? 'Poor' : 
                       value === 2 ? 'Fair' : 
                       value === 3 ? 'Good' : 
                       value === 4 ? 'Very Good' : 
                       'Excellent'}
                    </span>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div className="pt-2">
              <Button 
                type="submit" 
                className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 border-2 border-t-white border-white/30 rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Submit Feedback
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  };

  const renderPastFeedback = () => {
    if (!data) return null;
    const { submissions } = data;
    
    if (submissions.length === 0) {
      return (
        <div className="text-center py-8 text-slate-400">
          <MessageSquare className="mx-auto h-12 w-12 mb-2 opacity-20" />
          <p>No feedback submissions found</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        {submissions.map((feedback) => (
          <Card key={feedback.id} className="border-[#138808]/30">
            <CardHeader className="bg-[#FF9933]/10 border-b border-[#138808]/20">
              <div className="flex justify-between">
                <div>
                  <CardTitle className="text-[#000080]">{feedback.subject}</CardTitle>
                  <p className="text-sm text-slate-500">
                    {new Date(feedback.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < feedback.rating ? 'text-[#FF9933] fill-[#FF9933]' : 'text-slate-300'}`} 
                    />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-[#000080]">
                  <p className="text-slate-700">{feedback.message}</p>
                </div>
                
                {feedback.status === 'responded' && feedback.response && (
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <ThumbsUp className="h-4 w-4 text-[#138808]" />
                      <p className="text-sm font-medium text-[#138808]">School Response</p>
                      <p className="text-xs text-slate-500">
                        {new Date(feedback.response.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="bg-[#138808]/5 p-4 rounded-lg border-l-4 border-[#138808]">
                      <p className="text-slate-700">{feedback.response.message}</p>
                    </div>
                  </div>
                )}
                
                {feedback.status === 'pending' && (
                  <p className="text-sm text-[#FF9933] italic">
                    Awaiting response from the school administration
                  </p>
                )}
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
        <h1 className="text-3xl font-bold text-[#138808] mb-2">Feedback</h1>
        <p className="text-slate-500 mb-6">
          Share your thoughts and suggestions with the school
        </p>
        
        <Tabs defaultValue="submit" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-slate-100">
            <TabsTrigger 
              value="submit"
              className={`flex-1 ${activeTab === "submit" ? "bg-[#FF9933] text-white" : ""}`}
            >
              <Send className="h-4 w-4 mr-2" /> Submit Feedback
            </TabsTrigger>
            <TabsTrigger 
              value="past"
              className={`flex-1 ${activeTab === "past" ? "bg-[#FF9933] text-white" : ""}`}
            >
              <MessageSquare className="h-4 w-4 mr-2" /> Past Feedback
            </TabsTrigger>
          </TabsList>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="h-8 w-8 border-4 border-t-[#138808] border-[#138808]/20 rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertDescription>
                Failed to load feedback data. Please try again later.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <TabsContent value="submit" className="mt-0">
                {renderFeedbackForm()}
              </TabsContent>
              
              <TabsContent value="past" className="mt-0">
                {renderPastFeedback()}
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Feedback;

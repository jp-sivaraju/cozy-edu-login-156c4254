
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { HelpCircle, Search, Send, MessageSquare, Phone, Mail, Map } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock API call
const fetchHelpData = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    faqs: [
      {
        id: "faq1",
        question: "How do I apply for leave for my child?",
        answer: "You can apply for leave by navigating to the 'Leaves' section in the app. Fill in the required details including the date range and reason for leave. The request will be sent to the class teacher for approval."
      },
      {
        id: "faq2",
        question: "How can I track the school bus?",
        answer: "You can track your child's school bus in real-time by going to the 'Transport' section and selecting the 'Live Tracking' tab. The map will show the current location of the bus and its estimated time of arrival."
      },
      {
        id: "faq3",
        question: "When are the fee payment deadlines?",
        answer: "Fee payments are typically due by the 10th of each month or as per the schedule communicated by the school. You can view the exact deadlines in the 'Fees' section. Late payments may incur additional charges."
      },
      {
        id: "faq4",
        question: "How do I update my contact information?",
        answer: "To update your contact information, go to 'Profile' and select 'Edit Profile'. Update your details and save the changes. You may need to verify any new email addresses or phone numbers."
      },
      {
        id: "faq5",
        question: "How can I see my child's academic progress?",
        answer: "You can view your child's academic progress in the 'Reports' section. Here you'll find current reports, historical performance data, and AI-powered trends that analyze your child's progress over time."
      },
      {
        id: "faq6",
        question: "When are the Parent-Teacher Meetings scheduled?",
        answer: "Parent-Teacher Meetings (PTM) schedules can be found in the 'PTM' section or the 'Calendar' section under 'Important Days'. You can also book specific time slots to meet with teachers during these days."
      },
      {
        id: "faq7",
        question: "How do I purchase school uniforms and books?",
        answer: "You can purchase uniforms and books through the 'Store' section. Select the items you need, choose sizes if applicable, add them to your cart, and proceed to checkout. You can collect the items from the school store or opt for home delivery if available."
      }
    ],
    contactInfo: {
      email: "support@edusense.edu.in",
      phone: "+91-11-12345678",
      address: "123 Education Street, New Delhi - 110001",
      officeHours: "Monday to Friday, 8:00 AM to 4:00 PM",
      social: {
        facebook: "https://facebook.com/edusense",
        twitter: "https://twitter.com/edusense",
        instagram: "https://instagram.com/edusense"
      }
    }
  };
};

const Help = () => {
  const [activeTab, setActiveTab] = useState("faq");
  const [searchQuery, setSearchQuery] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ['helpData'],
    queryFn: fetchHelpData,
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !subject || !message) {
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
        title: "Message Sent",
        description: "Your message has been sent to the support team. We'll get back to you soon.",
      });
      
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setIsSubmitting(false);
    }, 1500);
  };

  const filteredFaqs = data?.faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const renderFaqs = () => {
    if (!data) return null;
    
    return (
      <Card className="border-[#138808]/30">
        <CardHeader className="bg-[#FF9933]/10 border-b border-[#138808]/20">
          <CardTitle className="text-[#000080]">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search FAQs..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <HelpCircle className="mx-auto h-12 w-12 mb-2 opacity-20" />
              <p>No FAQs matching your search</p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left hover:text-[#000080] hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderContact = () => {
    if (!data) return null;
    const { contactInfo } = data;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-[#138808]/30">
          <CardHeader className="bg-[#FF9933]/10 border-b border-[#138808]/20">
            <CardTitle className="text-[#000080]">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-[#000080]/10">
                  <Mail className="h-5 w-5 text-[#000080]" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <a href={`mailto:${contactInfo.email}`} className="text-[#000080] hover:underline">
                    {contactInfo.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-[#FF9933]/10">
                  <Phone className="h-5 w-5 text-[#FF9933]" />
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <a href={`tel:${contactInfo.phone}`} className="text-[#000080] hover:underline">
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-[#138808]/10">
                  <Map className="h-5 w-5 text-[#138808]" />
                </div>
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-slate-600">{contactInfo.address}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-[#138808]/10">
                <p className="font-medium">Office Hours</p>
                <p className="text-slate-600">{contactInfo.officeHours}</p>
              </div>
              
              <div className="pt-4 border-t border-[#138808]/10">
                <p className="font-medium mb-2">Connect With Us</p>
                <div className="flex gap-4">
                  <a 
                    href={contactInfo.social.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-[#000080]/10 hover:bg-[#000080]/20 transition-colors"
                  >
                    <svg className="h-5 w-5 text-[#000080]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                    </svg>
                  </a>
                  <a 
                    href={contactInfo.social.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-[#138808]/10 hover:bg-[#138808]/20 transition-colors"
                  >
                    <svg className="h-5 w-5 text-[#138808]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a 
                    href={contactInfo.social.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-[#FF9933]/10 hover:bg-[#FF9933]/20 transition-colors"
                  >
                    <svg className="h-5 w-5 text-[#FF9933]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-[#138808]/30">
          <CardHeader className="bg-[#FF9933]/10 border-b border-[#138808]/20">
            <CardTitle className="text-[#000080]">Send a Message</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject <span className="text-red-500">*</span></Label>
                <Input
                  id="subject"
                  placeholder="Message subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
                <Textarea
                  id="message"
                  placeholder="Your message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              
              <Button
                type="submit"
                className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 border-2 border-t-white border-white/30 rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="container p-6">
        <h1 className="text-3xl font-bold text-[#138808] mb-2">Help & Support</h1>
        <p className="text-slate-500 mb-6">
          Find answers to common questions or reach out for support
        </p>
        
        <Tabs defaultValue="faq" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-slate-100">
            <TabsTrigger 
              value="faq"
              className={`flex-1 ${activeTab === "faq" ? "bg-[#FF9933] text-white" : ""}`}
            >
              <HelpCircle className="h-4 w-4 mr-2" /> FAQs
            </TabsTrigger>
            <TabsTrigger 
              value="contact"
              className={`flex-1 ${activeTab === "contact" ? "bg-[#FF9933] text-white" : ""}`}
            >
              <MessageSquare className="h-4 w-4 mr-2" /> Contact Us
            </TabsTrigger>
          </TabsList>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="h-8 w-8 border-4 border-t-[#138808] border-[#138808]/20 rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertDescription>
                Failed to load help data. Please try again later.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <TabsContent value="faq" className="mt-0">
                {renderFaqs()}
              </TabsContent>
              
              <TabsContent value="contact" className="mt-0">
                {renderContact()}
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Help;

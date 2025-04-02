
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { CalendarIcon, Clock, Send, FileText, CheckCircle, XCircle, Clock8 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from "date-fns";

// Mock API call for leave applications
const fetchLeaves = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    leaves: [
      {
        id: "leave1",
        fromDate: "2023-10-25",
        toDate: "2023-10-26",
        reason: "Medical appointment and recovery",
        status: "approved",
        appliedOn: "2023-10-20",
        approvedOn: "2023-10-21"
      },
      {
        id: "leave2",
        fromDate: "2023-09-15",
        toDate: "2023-09-15",
        reason: "Family function",
        status: "rejected",
        appliedOn: "2023-09-10",
        approvedOn: null,
        rejectionReason: "High attendance required that day due to special class"
      },
      {
        id: "leave3",
        fromDate: "2023-11-10",
        toDate: "2023-11-10",
        reason: "Doctor's appointment",
        status: "pending",
        appliedOn: "2023-11-05",
        approvedOn: null
      }
    ]
  };
};

const statusColors: Record<string, string> = {
  approved: "bg-[#138808] text-white",
  rejected: "bg-red-500 text-white",
  pending: "bg-[#FF9933] text-white"
};

const Leaves = () => {
  const [activeTab, setActiveTab] = useState("status");
  const { user } = useAuth();
  const { toast } = useToast();

  // Form states
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['leaves'],
    queryFn: fetchLeaves,
  });

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromDate || !toDate || !reason) {
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
        title: "Leave Application Submitted",
        description: `Your leave application from ${format(fromDate, "PPP")} to ${format(toDate, "PPP")} has been submitted successfully.`,
      });
      
      // Reset form
      setFromDate(undefined);
      setToDate(undefined);
      setReason("");
      setIsSubmitting(false);
      
      // Refetch leaves to update the list
      refetch();
      
      // Switch to status tab
      setActiveTab("status");
    }, 1500);
  };

  const renderLeaveStatus = () => {
    if (!data) return null;
    
    const { leaves } = data;
    
    if (leaves.length === 0) {
      return (
        <div className="text-center py-8 text-slate-400">
          <FileText className="mx-auto h-12 w-12 mb-2 opacity-20" />
          <p>No leave applications found</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        {leaves.map((leave) => (
          <Card key={leave.id} className="border-[#138808]/30">
            <div className="p-4 border-b border-[#138808]/20 flex justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-full ${
                  leave.status === 'approved' ? 'bg-[#138808]/10' :
                  leave.status === 'rejected' ? 'bg-red-100' :
                  'bg-[#FF9933]/10'
                }`}>
                  {leave.status === 'approved' ? 
                    <CheckCircle className="h-4 w-4 text-[#138808]" /> :
                    leave.status === 'rejected' ?
                    <XCircle className="h-4 w-4 text-red-500" /> :
                    <Clock8 className="h-4 w-4 text-[#FF9933]" />
                  }
                </div>
                <div>
                  <h3 className="font-semibold">
                    Leave {leave.fromDate === leave.toDate ? 
                      `on ${format(new Date(leave.fromDate), "PPP")}` : 
                      `from ${format(new Date(leave.fromDate), "PPP")} to ${format(new Date(leave.toDate), "PPP")}`
                    }
                  </h3>
                  <p className="text-xs text-slate-500">
                    Applied on {format(new Date(leave.appliedOn), "PPP")}
                  </p>
                </div>
              </div>
              <Badge className={statusColors[leave.status]}>
                {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
              </Badge>
            </div>
            <div className="p-4">
              <p className="text-sm font-medium mb-1">Reason:</p>
              <p className="text-sm text-slate-600 mb-3">{leave.reason}</p>
              
              {leave.status === 'approved' && leave.approvedOn && (
                <p className="text-xs text-[#138808] font-medium">
                  Approved on {format(new Date(leave.approvedOn), "PPP")}
                </p>
              )}
              
              {leave.status === 'rejected' && leave.rejectionReason && (
                <div className="bg-red-50 p-3 rounded-md">
                  <p className="text-xs text-red-700 font-medium">
                    Reason for rejection: {leave.rejectionReason}
                  </p>
                </div>
              )}
              
              {leave.status === 'pending' && (
                <p className="text-xs text-[#FF9933] font-medium">
                  Awaiting approval from class teacher
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>
    );
  };

  const renderLeaveForm = () => {
    return (
      <Card className="border-[#138808]/30">
        <CardHeader className="bg-[#FF9933]/10 border-b border-[#138808]/20">
          <CardTitle className="text-[#000080]">Request Leave</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleLeaveSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="from-date">From Date <span className="text-red-500">*</span></Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal ${!fromDate && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {fromDate ? format(fromDate, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={fromDate}
                      onSelect={setFromDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="to-date">To Date <span className="text-red-500">*</span></Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal ${!toDate && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {toDate ? format(toDate, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={toDate}
                      onSelect={setToDate}
                      disabled={(date) => fromDate ? date < fromDate : false}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reason">Reason <span className="text-red-500">*</span></Label>
              <Textarea
                id="reason"
                placeholder="Please provide a detailed reason for your leave application"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
              />
            </div>
            
            <div className="pt-2">
              <Button 
                type="submit" 
                className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-white"
                disabled={isSubmitting || !fromDate || !toDate || !reason}
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 border-2 border-t-white border-white/30 rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Submit Application
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  };

  return (
    <DashboardLayout>
      <div className="container p-6">
        <h1 className="text-3xl font-bold text-[#138808] mb-2">Leave Management</h1>
        <p className="text-slate-500 mb-6">
          Request and track leave applications
        </p>
        
        <Tabs defaultValue="status" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-slate-100">
            <TabsTrigger 
              value="status"
              className={`flex-1 ${activeTab === "status" ? "bg-[#FF9933] text-white" : ""}`}
            >
              Leave Status
            </TabsTrigger>
            <TabsTrigger 
              value="request"
              className={`flex-1 ${activeTab === "request" ? "bg-[#FF9933] text-white" : ""}`}
            >
              Request Leave
            </TabsTrigger>
          </TabsList>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="h-8 w-8 border-4 border-t-[#138808] border-[#138808]/20 rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertDescription>
                Failed to load leave data. Please try again later.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <TabsContent value="status" className="mt-0">
                {renderLeaveStatus()}
              </TabsContent>
              
              <TabsContent value="request" className="mt-0">
                {renderLeaveForm()}
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Leaves;

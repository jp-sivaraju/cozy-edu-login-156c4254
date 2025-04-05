import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon, Clock, Filter, Plus, Search, Check, X, File, FileText } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import DashboardLayout from '@/components/layouts/DashboardLayout';

const MOCK_LEAVES_DATA = {
  leaveTypes: [
    { id: 1, name: "Sick Leave", total: 12, availed: 4, remaining: 8 },
    { id: 2, name: "Personal Leave", total: 6, availed: 2, remaining: 4 },
    { id: 3, name: "Family Emergency", total: 3, availed: 0, remaining: 3 },
  ],
  leaveHistory: [
    { 
      id: 1, 
      type: "Sick Leave", 
      startDate: "2023-02-15", 
      endDate: "2023-02-16", 
      days: 2, 
      reason: "Fever and cold", 
      status: "Approved",
      approvedBy: "Mrs. Gupta",
      approvedOn: "2023-02-14"
    },
    { 
      id: 2, 
      type: "Personal Leave", 
      startDate: "2023-03-20", 
      endDate: "2023-03-20", 
      days: 1, 
      reason: "Family function", 
      status: "Approved",
      approvedBy: "Mr. Singh",
      approvedOn: "2023-03-18"
    },
    { 
      id: 3, 
      type: "Sick Leave", 
      startDate: "2023-04-05", 
      endDate: "2023-04-07", 
      days: 3, 
      reason: "Viral infection", 
      status: "Approved",
      approvedBy: "Mrs. Gupta",
      approvedOn: "2023-04-04"
    },
    { 
      id: 4, 
      type: "Personal Leave", 
      startDate: "2023-05-12", 
      endDate: "2023-05-12", 
      days: 1, 
      reason: "Doctor appointment", 
      status: "Pending",
      submittedOn: "2023-05-10"
    },
  ],
  academicYears: [
    { id: 1, name: "2023-2024", current: true },
    { id: 2, name: "2022-2023", current: false },
    { id: 3, name: "2021-2022", current: false },
    { id: 4, name: "2020-2021", current: false },
  ]
};

const Leaves = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string>("2023-2024");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStartDate, setFilterStartDate] = useState<Date | undefined>(undefined);
  const [filterEndDate, setFilterEndDate] = useState<Date | undefined>(undefined);
  const { toast } = useToast();

  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [reason, setReason] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ['leavesData'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return MOCK_LEAVES_DATA;
    }
  });

  const handleSubmitLeaveRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!leaveType || !startDate || !endDate || !reason) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    toast({
      title: "Leave request submitted",
      description: `Your ${leaveType} request for ${diffDays} day(s) has been submitted successfully.`
    });
    
    setLeaveType("");
    setStartDate(undefined);
    setEndDate(undefined);
    setReason("");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search applied",
      description: `Searching for "${searchQuery}" with selected filters`,
    });
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setFilterStatus("all");
    setFilterType("all");
    setFilterStartDate(undefined);
    setFilterEndDate(undefined);
    setShowFilters(false);
    
    toast({
      title: "Filters cleared",
      description: "All search filters have been reset",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-[#138808]/10 text-[#138808] border-[#138808]/30';
      case 'pending':
        return 'bg-[#FF9933]/10 text-[#FF9933] border-[#FF9933]/30';
      case 'rejected':
        return 'bg-red-100 text-red-600 border-red-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <Check className="h-3 w-3 mr-1" />;
      case 'pending':
        return <Clock className="h-3 w-3 mr-1" />;
      case 'rejected':
        return <X className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="container p-6">
          <h1 className="text-3xl font-bold mb-6">Leave Management</h1>
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 border-4 border-t-[#138808] border-[#138808]/20 rounded-full animate-spin"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container p-6">
        <h1 className="text-3xl font-bold text-[#138808] mb-2">Leave Management</h1>
        <p className="text-slate-500 mb-6">
          Apply for leaves and view your leave history
        </p>
        
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-[#000080] font-medium">Academic Year</p>
              <select 
                value={selectedYear} 
                onChange={(e) => setSelectedYear(e.target.value)}
                className="mt-1 block w-full rounded-md border border-[#138808]/30 px-3 py-2 text-sm focus:border-[#138808] focus:outline-none focus:ring-1 focus:ring-[#138808]"
              >
                {data?.academicYears.map(year => (
                  <option key={year.id} value={year.name}>
                    {year.name} {year.current ? '(Current)' : ''}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-shrink-0">
              <p className="text-transparent sm:text-[#000080] sm:font-medium">Actions</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="tricolor" className="w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Apply for Leave
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle className="text-[#000080]">Apply for Leave</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmitLeaveRequest} className="space-y-4 pt-4">
                    <div className="grid gap-4">
                      <div>
                        <label htmlFor="leaveType" className="text-sm font-medium">
                          Leave Type
                        </label>
                        <select 
                          id="leaveType"
                          value={leaveType}
                          onChange={(e) => setLeaveType(e.target.value)}
                          className="mt-1 block w-full rounded-md border border-[#138808]/30 px-3 py-2 text-sm focus:border-[#138808] focus:outline-none focus:ring-1 focus:ring-[#138808]"
                          required
                        >
                          <option value="" disabled>Select leave type</option>
                          {data?.leaveTypes.map(type => (
                            <option key={type.id} value={type.name}>
                              {type.name} ({type.remaining} remaining)
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Start Date</label>
                          <div className="mt-1 relative">
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 absolute left-3 text-slate-400" />
                              <Input 
                                value={startDate ? startDate.toLocaleDateString() : ''} 
                                readOnly
                                placeholder="Select start date"
                                className="pl-9"
                              />
                            </div>
                            <div className="absolute top-full mt-1 z-10">
                              {!startDate && (
                                <Calendar
                                  mode="single"
                                  selected={startDate}
                                  onSelect={setStartDate}
                                  className="rounded-md border bg-white shadow-md"
                                  disabled={(date) => date < new Date() || (endDate ? date > endDate : false)}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium">End Date</label>
                          <div className="mt-1 relative">
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 absolute left-3 text-slate-400" />
                              <Input 
                                value={endDate ? endDate.toLocaleDateString() : ''} 
                                readOnly
                                placeholder="Select end date"
                                className="pl-9"
                              />
                            </div>
                            <div className="absolute top-full mt-1 z-10">
                              {!endDate && (
                                <Calendar
                                  mode="single"
                                  selected={endDate}
                                  onSelect={setEndDate}
                                  className="rounded-md border bg-white shadow-md"
                                  disabled={(date) => (startDate ? date < startDate : date < new Date())}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="reason" className="text-sm font-medium">
                          Reason for Leave
                        </label>
                        <Textarea 
                          id="reason"
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          placeholder="Please provide a reason for your leave request"
                          className="mt-1 resize-none h-24"
                          required
                        />
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button type="submit" variant="tricolor">
                        Submit Leave Request
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-slate-100">
            <TabsTrigger 
              value="overview"
              className={`flex-1 ${activeTab === "overview" ? "bg-[#FF9933] text-white" : ""}`}
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="history"
              className={`flex-1 ${activeTab === "history" ? "bg-[#FF9933] text-white" : ""}`}
            >
              Leave History
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {data?.leaveTypes.map((leaveType) => (
                <Card key={leaveType.id} className="border-[#138808]/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[#000080]">{leaveType.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-500">Total Allowed</span>
                      <span className="font-medium">{leaveType.total} days</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-500">Availed</span>
                      <span className="font-medium">{leaveType.availed} days</span>
                    </div>
                    <div className="flex justify-between items-center mb-3 pb-3 border-b border-[#138808]/20">
                      <span className="text-slate-500">Remaining</span>
                      <span className="font-semibold text-[#138808]">{leaveType.remaining} days</span>
                    </div>
                    
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div className="text-xs font-semibold text-[#138808]">
                          {Math.round((leaveType.availed / leaveType.total) * 100)}% Used
                        </div>
                      </div>
                      <div className="flex h-2 overflow-hidden rounded bg-[#138808]/10">
                        <div
                          className="flex flex-col justify-center bg-[#138808]"
                          style={{ width: `${(leaveType.availed / leaveType.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card className="border-[#138808]/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-[#000080]">Recent Leave Requests</CardTitle>
                <CardDescription>Your most recent leave applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data?.leaveHistory.slice(0, 3).map((leave) => (
                    <div 
                      key={leave.id} 
                      className="p-4 rounded-lg border border-[#138808]/20 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <h3 className="font-medium text-[#000080]">{leave.type}</h3>
                          <p className="text-sm text-slate-500">
                            {formatDate(leave.startDate)} to {formatDate(leave.endDate)} ({leave.days} day{leave.days > 1 ? 's' : ''})
                          </p>
                        </div>
                        <Badge 
                          className={`${getStatusColor(leave.status)} border flex items-center`}
                        >
                          {getStatusIcon(leave.status)}
                          {leave.status}
                        </Badge>
                      </div>
                      <p className="mt-2 text-sm text-slate-600">
                        <span className="font-medium">Reason:</span> {leave.reason}
                      </p>
                      {leave.status === 'Approved' && (
                        <p className="mt-1 text-xs text-slate-500">
                          Approved by {leave.approvedBy} on {formatDate(leave.approvedOn)}
                        </p>
                      )}
                      {leave.status === 'Pending' && (
                        <p className="mt-1 text-xs text-slate-500">
                          Submitted on {formatDate(leave.submittedOn)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="mt-0">
            <div className="mb-6">
              <form onSubmit={handleSearch} className="flex gap-2 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    placeholder="Search leave requests..." 
                    className="pl-9 border-[#138808]/30 focus-visible:ring-[#FF9933]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowFilters(!showFilters)}
                  className="border-[#138808]/30 text-[#000080]"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button type="submit" variant="tricolor">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </form>
              
              {showFilters && (
                <Card className="mt-2 border-[#138808]/20">
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Status</label>
                        <select 
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="block w-full rounded-md border border-[#138808]/30 px-3 py-2 text-sm focus:border-[#138808] focus:outline-none focus:ring-1 focus:ring-[#138808]"
                        >
                          <option value="all">All Statuses</option>
                          <option value="approved">Approved</option>
                          <option value="pending">Pending</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Leave Type</label>
                        <select 
                          value={filterType}
                          onChange={(e) => setFilterType(e.target.value)}
                          className="block w-full rounded-md border border-[#138808]/30 px-3 py-2 text-sm focus:border-[#138808] focus:outline-none focus:ring-1 focus:ring-[#138808]"
                        >
                          <option value="all">All Types</option>
                          {data?.leaveTypes.map(type => (
                            <option key={type.id} value={type.name}>
                              {type.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">From Date</label>
                        <div className="flex items-center">
                          <Input 
                            type="date" 
                            className="border-[#138808]/30"
                            value={filterStartDate ? filterStartDate.toISOString().split('T')[0] : ''}
                            onChange={(e) => e.target.value ? setFilterStartDate(new Date(e.target.value)) : setFilterStartDate(undefined)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">To Date</label>
                        <div className="flex items-center">
                          <Input 
                            type="date" 
                            className="border-[#138808]/30"
                            value={filterEndDate ? filterEndDate.toISOString().split('T')[0] : ''}
                            onChange={(e) => e.target.value ? setFilterEndDate(new Date(e.target.value)) : setFilterEndDate(undefined)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <Button 
                        variant="outline" 
                        className="border-[#FF9933]/30 text-[#FF9933] hover:text-[#FF9933]/80"
                        onClick={handleClearFilters}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <Card className="border-[#138808]/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-[#000080]">Leave History</CardTitle>
                <CardDescription>All your leave applications for {selectedYear}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data?.leaveHistory.map((leave) => (
                    <div 
                      key={leave.id} 
                      className="p-4 rounded-lg border border-[#138808]/20 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-[#138808]/10 flex items-center justify-center mr-3">
                            <FileText className="h-4 w-4 text-[#138808]" />
                          </div>
                          <div>
                            <h3 className="font-medium text-[#000080]">{leave.type}</h3>
                            <p className="text-xs text-slate-500">
                              {formatDate(leave.startDate)} to {formatDate(leave.endDate)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-[#000080]">{leave.days} day{leave.days > 1 ? 's' : ''}</Badge>
                          <Badge 
                            className={`${getStatusColor(leave.status)} border flex items-center`}
                          >
                            {getStatusIcon(leave.status)}
                            {leave.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-slate-600">
                        <span className="font-medium">Reason:</span> {leave.reason}
                      </p>
                      {leave.status === 'Approved' && (
                        <p className="mt-1 text-xs text-slate-500">
                          Approved by {leave.approvedBy} on {formatDate(leave.approvedOn)}
                        </p>
                      )}
                      {leave.status === 'Pending' && (
                        <p className="mt-1 text-xs text-slate-500">
                          Submitted on {formatDate(leave.submittedOn)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-[#138808]/5 rounded-lg border border-[#138808]/20 text-sm text-[#000080]/80">
                  <p className="font-semibold mb-2 flex items-center">
                    <File className="h-4 w-4 mr-2" />
                    Leave Policy Highlights:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Leave requests must be submitted at least 2 days in advance</li>
                    <li>Emergency leave can be applied for on the same day</li>
                    <li>Leaves during examination period require special approval</li>
                    <li>Medical leaves of more than 3 days require a doctor's certificate</li>
                    <li>Unused leaves cannot be carried forward to the next academic year</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Leaves;

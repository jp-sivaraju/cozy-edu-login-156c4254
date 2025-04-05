
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';

// Import our new components
import LeaveApplicationForm from '@/components/leaves/LeaveApplicationForm';
import LeaveSearchFilter from '@/components/leaves/LeaveSearchFilter';
import LeavesOverview from '@/components/leaves/LeavesOverview';
import LeaveHistory from '@/components/leaves/LeaveHistory';

// Mock data for demonstration
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

  const { data, isLoading } = useQuery({
    queryKey: ['leavesData'],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return MOCK_LEAVES_DATA;
    }
  });
  
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
                  <LeaveApplicationForm leaveTypes={data?.leaveTypes || []} />
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
            <LeavesOverview 
              leaveTypes={data?.leaveTypes || []} 
              leaveHistory={data?.leaveHistory || []} 
            />
          </TabsContent>
          
          <TabsContent value="history" className="mt-0">
            <LeaveSearchFilter 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              filterType={filterType}
              setFilterType={setFilterType}
              filterStartDate={filterStartDate}
              setFilterStartDate={setFilterStartDate}
              filterEndDate={filterEndDate}
              setFilterEndDate={setFilterEndDate}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              onSearch={handleSearch}
              onClearFilters={handleClearFilters}
              leaveTypes={data?.leaveTypes || []}
            />
            
            <LeaveHistory 
              leaveHistory={data?.leaveHistory || []} 
              selectedYear={selectedYear}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Leaves;

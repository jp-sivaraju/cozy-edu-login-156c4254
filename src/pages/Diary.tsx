
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Filter, Check, Calendar, CheckCircle, Circle, Signature as SignIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import TodayDiary from '@/components/diary/TodayDiary';
import PastEntries from '@/components/diary/PastEntries';
import SignatureCanvas from '@/components/diary/SignatureCanvas';

const Diary = () => {
  const [activeTab, setActiveTab] = useState("today");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterAcknowledged, setFilterAcknowledged] = useState(false);
  const [filterUnacknowledged, setFilterUnacknowledged] = useState(false);
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const { toast } = useToast();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search applied",
      description: `Searching for "${searchQuery}" with selected filters`,
    });
    // Here you would implement the actual search functionality
  };
  
  const handleClearFilters = () => {
    setSearchQuery("");
    setFilterAcknowledged(false);
    setFilterUnacknowledged(false);
    setFilterStartDate("");
    setFilterEndDate("");
    setShowFilters(false);
    
    toast({
      title: "Filters cleared",
      description: "All search filters have been reset",
    });
  };
  
  const handleSignatureSave = () => {
    toast({
      title: "Signature saved",
      description: "Your acknowledgement has been recorded successfully",
    });
  };

  return (
    <DashboardLayout>
      <div className="container p-6">
        <h1 className="text-3xl font-bold mb-2 text-[#138808]">Student Diary</h1>
        <p className="text-slate-600 mb-6">View and acknowledge daily notes and activities</p>
        
        {/* Search and filter bar */}
        <div className="mb-6">
          <form onSubmit={handleSearch} className="flex gap-2 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search diary entries..." 
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
                    <p className="text-sm font-medium">Acknowledgement Status</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="acknowledged" 
                          checked={filterAcknowledged} 
                          onCheckedChange={(checked) => setFilterAcknowledged(checked as boolean)} 
                        />
                        <label htmlFor="acknowledged" className="text-sm flex items-center cursor-pointer">
                          <CheckCircle className="h-3.5 w-3.5 mr-1 text-[#138808]" /> 
                          Acknowledged
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="unacknowledged" 
                          checked={filterUnacknowledged} 
                          onCheckedChange={(checked) => setFilterUnacknowledged(checked as boolean)} 
                        />
                        <label htmlFor="unacknowledged" className="text-sm flex items-center cursor-pointer">
                          <Circle className="h-3.5 w-3.5 mr-1 text-[#FF9933]" /> 
                          Unacknowledged
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Start Date</p>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                      <Input 
                        type="date" 
                        className="border-[#138808]/30"
                        value={filterStartDate}
                        onChange={(e) => setFilterStartDate(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">End Date</p>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                      <Input 
                        type="date" 
                        className="border-[#138808]/30"
                        value={filterEndDate}
                        onChange={(e) => setFilterEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-end">
                    <Button 
                      variant="outline" 
                      className="w-full border-[#FF9933]/30 text-[#FF9933] hover:text-[#FF9933]/80"
                      onClick={handleClearFilters}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <Tabs defaultValue="today" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-slate-100">
            <TabsTrigger 
              value="today"
              className={`flex-1 ${activeTab === "today" ? "bg-[#FF9933] text-white" : ""}`}
            >
              Today
            </TabsTrigger>
            <TabsTrigger 
              value="past"
              className={`flex-1 ${activeTab === "past" ? "bg-[#FF9933] text-white" : ""}`}
            >
              Past Entries
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="mt-0">
            <TodayDiary />
            
            {/* Signature Dialog for acknowledgment */}
            <div className="mt-8 flex justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="tricolor" className="px-8">
                    <SignIcon className="h-4 w-4 mr-2" />
                    Sign & Acknowledge Today's Entries
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle className="text-[#000080]">Parent Acknowledgement</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-sm text-slate-600 mb-4">
                      Please sign below to acknowledge that you have read and understand today's diary entries.
                    </p>
                    <SignatureCanvas onSave={handleSignatureSave} />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </TabsContent>
          
          <TabsContent value="past" className="mt-0">
            <PastEntries />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Diary;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter } from 'lucide-react';
import { CalendarIcon } from 'lucide-react';

interface LeaveSearchFilterProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  filterStatus: string;
  setFilterStatus: (value: string) => void;
  filterType: string;
  setFilterType: (value: string) => void;
  filterStartDate: Date | undefined;
  setFilterStartDate: (value: Date | undefined) => void;
  filterEndDate: Date | undefined;
  setFilterEndDate: (value: Date | undefined) => void;
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
  onSearch: (e: React.FormEvent) => void;
  onClearFilters: () => void;
  leaveTypes: Array<{ id: number; name: string }>;
}

const LeaveSearchFilter = ({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
  filterType,
  setFilterType,
  filterStartDate,
  setFilterStartDate,
  filterEndDate,
  setFilterEndDate,
  showFilters,
  setShowFilters,
  onSearch,
  onClearFilters,
  leaveTypes
}: LeaveSearchFilterProps) => {
  return (
    <div className="mb-6">
      <form onSubmit={onSearch} className="flex gap-2 flex-wrap">
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
                  {leaveTypes.map(type => (
                    <option key={type.id} value={type.name}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">From Date</label>
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2 text-slate-400" />
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
                  <CalendarIcon className="h-4 w-4 mr-2 text-slate-400" />
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
                onClick={onClearFilters}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LeaveSearchFilter;

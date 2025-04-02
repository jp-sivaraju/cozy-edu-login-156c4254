
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Clock, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';

// Mock API service for schedule data
const fetchSchedule = async () => {
  // In a real implementation, this would call the GET /api/parent/transport/schedule API
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulating API delay
  
  return {
    route_id: "ROUTE001",
    stops: [
      { stop_name: "Indiranagar", arrival_time: "08:00" },
      { stop_name: "Koramangala", arrival_time: "08:15" },
      { stop_name: "HSR Layout", arrival_time: "08:30" },
      { stop_name: "Electronic City", arrival_time: "08:45" },
      { stop_name: "School", arrival_time: "09:00" }
    ],
    return_stops: [
      { stop_name: "School", departure_time: "15:30" },
      { stop_name: "Electronic City", departure_time: "15:45" },
      { stop_name: "HSR Layout", departure_time: "16:00" },
      { stop_name: "Koramangala", departure_time: "16:15" },
      { stop_name: "Indiranagar", departure_time: "16:30" }
    ]
  };
};

const Schedule = () => {
  const { user } = useAuth();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['transportSchedule'],
    queryFn: fetchSchedule,
  });

  const handleRefresh = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-28" />
        </div>
        <Card className="p-4">
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-16 w-full mb-4" />
          <Skeleton className="h-16 w-full mb-4" />
          <Skeleton className="h-16 w-full mb-4" />
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load schedule data. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#000080]">Bus Schedule</h2>
        <Button
          onClick={handleRefresh}
          className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-white"
        >
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh
        </Button>
      </div>

      {/* Morning Pickup Schedule */}
      <Card className="border border-[#138808]/30 shadow-sm">
        <div className="bg-[#138808]/10 p-4 border-b border-[#138808]/20">
          <h3 className="font-medium text-lg text-[#138808]">Morning Pickup</h3>
        </div>
        <div className="divide-y divide-[#138808]/20">
          {data?.stops.map((stop, index) => (
            <div key={index} className="p-4 hover:bg-slate-50 transition-colors">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#138808]/10 flex items-center justify-center mr-3 text-[#138808] font-medium">
                    {index + 1}
                  </div>
                  <span className="font-medium">{stop.stop_name}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-[#000080]" />
                  <span className="font-medium text-[#000080]">{stop.arrival_time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Afternoon Return Schedule */}
      <Card className="border border-[#138808]/30 shadow-sm">
        <div className="bg-[#138808]/10 p-4 border-b border-[#138808]/20">
          <h3 className="font-medium text-lg text-[#138808]">Afternoon Return</h3>
        </div>
        <div className="divide-y divide-[#138808]/20">
          {data?.return_stops.map((stop, index) => (
            <div key={index} className="p-4 hover:bg-slate-50 transition-colors">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#138808]/10 flex items-center justify-center mr-3 text-[#138808] font-medium">
                    {index + 1}
                  </div>
                  <span className="font-medium">{stop.stop_name}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-[#000080]" />
                  <span className="font-medium text-[#000080]">{stop.departure_time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Schedule;

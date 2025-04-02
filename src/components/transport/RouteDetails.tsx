
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MapPin, Route, Bus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Mock API service for route details data
const fetchRouteDetails = async () => {
  // In a real implementation, this would call the GET /api/parent/transport/route_details API
  await new Promise(resolve => setTimeout(resolve, 700)); // Simulating API delay
  
  return {
    route_id: "ROUTE001",
    route_name: "Route A",
    bus_number: "KA-01-AA-1234",
    driver: {
      name: "Rajesh Kumar",
      phone: "+91 9876543210"
    },
    stops: [
      { stop_id: "STOP1", stop_name: "Indiranagar", latitude: 12.9784, longitude: 77.6408, arrival_time: "08:00" },
      { stop_id: "STOP2", stop_name: "Koramangala", latitude: 12.9316, longitude: 77.6246, arrival_time: "08:15" },
      { stop_id: "STOP3", stop_name: "HSR Layout", latitude: 12.9081, longitude: 77.6476, arrival_time: "08:30" },
      { stop_id: "STOP4", stop_name: "Electronic City", latitude: 12.8399, longitude: 77.6770, arrival_time: "08:45" },
      { stop_id: "STOP5", stop_name: "School", latitude: 12.8228, longitude: 77.6795, arrival_time: "09:00" }
    ]
  };
};

const RouteDetails = () => {
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ['routeDetails'],
    queryFn: fetchRouteDetails,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card className="p-4">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64 mb-6" />
          
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-24 w-full mb-6" />
          
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-60 w-full" />
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load route details. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Route Information */}
      <Card className="overflow-hidden">
        <div className="bg-[#FF9933] p-5">
          <h2 className="text-white text-xl font-bold flex items-center">
            <Route className="mr-2" size={20} />
            Route Information
          </h2>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-500">Route ID</p>
              <p className="font-medium text-[#000080]">{data?.route_id}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Route Name</p>
              <p className="font-medium">{data?.route_name}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Bus Number</p>
              <p className="font-medium flex items-center">
                <Bus className="mr-2 text-[#FF9933]" size={16} />
                {data?.bus_number}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Driver Name</p>
              <p className="font-medium">{data?.driver.name}</p>
            </div>
          </div>
          
          <div className="mt-2">
            <p className="text-sm text-slate-500">Contact Number</p>
            <p className="font-medium text-[#000080]">{data?.driver.phone}</p>
          </div>
        </div>
      </Card>

      {/* Stop Details */}
      <Card className="overflow-hidden">
        <div className="p-5 border-b border-slate-200">
          <h3 className="font-semibold text-lg">Stop Details</h3>
          <p className="text-slate-500 text-sm">All stops on this route</p>
        </div>
        
        <div className="divide-y divide-slate-100">
          {data?.stops.map((stop, index) => (
            <div key={index} className="p-5 flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-8 h-8 rounded-full bg-[#138808] text-white flex items-center justify-center font-medium">
                  {index + 1}
                </div>
                {index < data.stops.length - 1 && (
                  <div className="w-0.5 h-full bg-[#138808] mx-auto my-1"></div>
                )}
              </div>
              
              <div className="flex-grow">
                <h4 className="font-medium text-[#138808]">{stop.stop_name}</h4>
                <div className="flex items-center mt-1 space-x-4">
                  <div className="text-sm text-slate-500">
                    <span className="font-medium text-[#000080]">{stop.arrival_time}</span>
                  </div>
                  <div className="text-sm text-slate-500 flex items-center">
                    <MapPin className="mr-1 h-3 w-3" />
                    {stop.latitude.toFixed(4)}, {stop.longitude.toFixed(4)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default RouteDetails;

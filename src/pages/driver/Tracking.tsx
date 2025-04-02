
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { toast } from "sonner";
import { Map, Navigation, MapPin, AlertTriangle, Clock } from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';

// Mock route data - would come from API in production
const routeData = {
  route_id: "ROUTE001",
  route_name: "Route A",
  stops: [
    { 
      stop_id: "STOP1", 
      stop_name: "Green Park", 
      latitude: 12.9716, 
      longitude: 77.5946, 
      arrival_time: "08:00", 
      status: "completed" 
    },
    { 
      stop_id: "STOP2", 
      stop_name: "Silicon Valley School", 
      latitude: 12.9766, 
      longitude: 77.5993, 
      arrival_time: "08:15", 
      status: "completed" 
    },
    { 
      stop_id: "STOP3", 
      stop_name: "Harmony Heights", 
      latitude: 12.9811, 
      longitude: 77.6046, 
      arrival_time: "08:30", 
      status: "current" 
    },
    { 
      stop_id: "STOP4", 
      stop_name: "Tech Park Junction", 
      latitude: 12.9850, 
      longitude: 77.6100, 
      arrival_time: "08:45", 
      status: "pending" 
    },
    { 
      stop_id: "STOP5", 
      stop_name: "Rainbow Residency", 
      latitude: 12.9900, 
      longitude: 77.6150, 
      arrival_time: "09:00", 
      status: "pending" 
    }
  ]
};

// Mock current location - would be tracked via GPS in production
const currentLocation = {
  latitude: 12.9811,
  longitude: 77.6046,
  updated_at: new Date().toISOString()
};

const DriverTracking = () => {
  const [showMap, setShowMap] = useState(false);
  const [updatingLocation, setUpdatingLocation] = useState(false);
  const [currentStop, setCurrentStop] = useState(
    routeData.stops.find(stop => stop.status === 'current')?.stop_id || ''
  );
  
  const handleUpdateLocation = () => {
    setUpdatingLocation(true);
    
    // In a real app, this would get GPS coordinates and make an API call
    setTimeout(() => {
      console.log("Location updated");
      toast.success("Location updated successfully!");
      setUpdatingLocation(false);
    }, 1500);
  };
  
  const handleMarkCompleted = (stopId: string) => {
    // In a real app, this would make an API call
    console.log("Marking stop completed:", stopId);
    
    // Find current stop index
    const currentIndex = routeData.stops.findIndex(stop => stop.stop_id === stopId);
    if (currentIndex >= 0 && currentIndex < routeData.stops.length - 1) {
      // Set next stop as current
      setCurrentStop(routeData.stops[currentIndex + 1].stop_id);
      toast.success(`Completed stop: ${routeData.stops[currentIndex].stop_name}`);
    } else if (currentIndex === routeData.stops.length - 1) {
      toast.success("All stops completed for this route!");
      setCurrentStop('');
    }
  };
  
  const getStopStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="secondary" className="bg-[#138808] text-white">Completed</Badge>;
      case 'current':
        return <Badge className="bg-[#FF9933] text-white">Current</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-slate-300 text-slate-500">Pending</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <DashboardLayout>
      <div className="container p-6">
        <h1 className="text-3xl font-bold mb-6 text-[#FF9933]">Route Tracking</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Route Details */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#000080]">Route Details</CardTitle>
                <CardDescription>
                  Today's assigned route information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-[#FF9933] mb-2">{routeData.route_name}</h3>
                  <p className="text-slate-600">Route ID: {routeData.route_id}</p>
                  <p className="text-slate-600">Total Stops: {routeData.stops.length}</p>
                </div>
                
                <div className="mb-6">
                  <Alert>
                    <Clock className="h-4 w-4 text-[#138808]" />
                    <AlertTitle className="text-[#000080]">Current Status</AlertTitle>
                    <AlertDescription className="text-slate-600">
                      {currentStop ? `Currently at: ${routeData.stops.find(stop => stop.stop_id === currentStop)?.stop_name}` : 'All stops completed'}
                    </AlertDescription>
                  </Alert>
                </div>
                
                <Button
                  className="w-full bg-[#FF9933] hover:bg-[#FF9933]/90 text-white flex items-center justify-center gap-2 mb-4"
                  onClick={handleUpdateLocation}
                  disabled={updatingLocation}
                >
                  {updatingLocation ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Navigation className="h-4 w-4" />
                      Update My Location
                    </>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full border-[#138808]/30 hover:bg-[#138808]/5 text-[#000080]"
                  onClick={() => setShowMap(!showMap)}
                >
                  <Map className="mr-2 h-4 w-4 text-[#138808]" />
                  {showMap ? 'Hide Map' : 'Show Map'}
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Map and Stops List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#000080]">
                  {showMap ? 'Route Map' : 'Stops List'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {showMap ? (
                  <div className="bg-white border border-[#138808]/20 rounded-xl overflow-hidden shadow-md">
                    {/* In a real app, this would be a Google Maps component */}
                    <div className="aspect-[16/9] bg-slate-100 flex items-center justify-center">
                      <div className="text-center p-6">
                        <Map className="h-10 w-10 text-slate-400 mx-auto mb-2" />
                        <p className="text-slate-500">Map would display here with the route highlighted</p>
                        <p className="text-slate-500 text-sm mt-1">Showing stops from {routeData.stops[0].stop_name} to {routeData.stops[routeData.stops.length - 1].stop_name}</p>
                        
                        <div className="mt-4 inline-flex items-center px-3 py-1 bg-[#FF9933]/20 text-[#FF9933] rounded-full text-sm">
                          <Navigation className="h-4 w-4 mr-1" />
                          Current location tracking active
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {routeData.stops.map((stop) => (
                      <div 
                        key={stop.stop_id} 
                        className={`border rounded-xl p-4 ${
                          stop.status === 'current' 
                            ? 'border-[#FF9933] bg-[#FF9933]/5' 
                            : 'border-[#138808]/30'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                              stop.status === 'completed' 
                                ? 'bg-[#138808] text-white' 
                                : stop.status === 'current'
                                  ? 'bg-[#FF9933] text-white'
                                  : 'bg-slate-200 text-slate-500'
                            }`}>
                              <MapPin className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="font-medium text-[#000080]">{stop.stop_name}</h3>
                              <p className="text-sm text-slate-500">Arrival: {stop.arrival_time}</p>
                            </div>
                          </div>
                          {getStopStatusBadge(stop.status)}
                        </div>
                        
                        {stop.status === 'current' && (
                          <div className="mt-3">
                            <Button 
                              size="sm"
                              className="bg-[#138808] hover:bg-[#138808]/90 text-white"
                              onClick={() => handleMarkCompleted(stop.stop_id)}
                            >
                              Mark as Completed
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                {!showMap && (
                  <Alert className="mt-6" variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Important</AlertTitle>
                    <AlertDescription>
                      Remember to mark each stop as completed when you arrive to keep parents updated.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DriverTracking;

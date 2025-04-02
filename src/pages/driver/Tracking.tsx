
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle, MapPin, Clock, Navigation, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import DriverDashboardLayout from '@/components/layouts/DriverDashboardLayout';

// Define Google Maps types to avoid TypeScript errors
declare global {
  interface Window {
    google: any;
  }
}

// Mock API service for driver route data
const fetchDriverRoute = async () => {
  // In a real implementation, this would call the GET /api/driver/tracking/current_route API
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API delay
  
  return {
    route_id: "ROUTE001", 
    route_name: "Route A", 
    stops: [
      { stop_id: "STOP1", stop_name: "Indiranagar", latitude: 12.9784, longitude: 77.6408, arrival_time: "08:00", status: "completed" },
      { stop_id: "STOP2", stop_name: "Koramangala", latitude: 12.9316, longitude: 77.6246, arrival_time: "08:15", status: "pending" },
      { stop_id: "STOP3", stop_name: "HSR Layout", latitude: 12.9081, longitude: 77.6476, arrival_time: "08:30", status: "pending" },
      { stop_id: "STOP4", stop_name: "Electronic City", latitude: 12.8399, longitude: 77.6770, arrival_time: "08:45", status: "pending" },
      { stop_id: "STOP5", stop_name: "School", latitude: 12.8228, longitude: 77.6795, arrival_time: "09:00", status: "pending" }
    ],
    current_location: { 
      latitude: 12.9316, 
      longitude: 77.6246  // Currently at Koramangala stop
    }
  };
};

const updateLocation = async (location: { latitude: number, longitude: number }) => {
  // In a real implementation, this would call the POST /api/driver/update_location API
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulating API delay
  return { success: true, message: "Location updated successfully" };
};

const updateStopStatus = async (stopId: string, status: 'completed' | 'pending') => {
  // In a real implementation, this would call the POST /api/driver/update_status API
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulating API delay
  return { success: true, message: `Stop ${stopId} marked as ${status}` };
};

const Tracking = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('live');
  const [map, setMap] = useState<any | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<GeolocationPosition | null>(null);
  const [isUpdatingLocation, setIsUpdatingLocation] = useState(false);
  const [isUpdatingStop, setIsUpdatingStop] = useState(false);
  const [updatingStopId, setUpdatingStopId] = useState<string | null>(null);

  const { data: routeData, isLoading, error, refetch } = useQuery({
    queryKey: ['driverRoute'],
    queryFn: fetchDriverRoute,
  });

  // Get current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition(position);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location Error",
            description: "Could not get your current location. Please enable location services.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Location Not Supported",
        description: "Your browser does not support geolocation.",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Load Google Maps
  useEffect(() => {
    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
    googleMapsScript.async = true;
    googleMapsScript.onload = () => setMapLoaded(true);
    document.head.appendChild(googleMapsScript);

    return () => {
      const scriptTag = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
      if (scriptTag && scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, []);

  // Initialize map when data is loaded
  useEffect(() => {
    if (!mapLoaded || !routeData || !window.google) return;

    const mapElement = document.getElementById('driver-map');
    if (mapElement) {
      const newMap = new window.google.maps.Map(mapElement, {
        center: { lat: routeData.current_location.latitude, lng: routeData.current_location.longitude },
        zoom: 14,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#000080" }] },
        ],
      });
      setMap(newMap);

      // Add current location marker
      const busMarker = new window.google.maps.Marker({
        position: { lat: routeData.current_location.latitude, lng: routeData.current_location.longitude },
        map: newMap,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#FF9933",
          fillOpacity: 1,
          strokeColor: "#FFFFFF",
          strokeWeight: 2,
        },
        title: "Current Location",
      });

      // Add stop markers
      routeData.stops.forEach((stop, index) => {
        const isCompleted = stop.status === 'completed';
        const stopMarker = new window.google.maps.Marker({
          position: { lat: stop.latitude, lng: stop.longitude },
          map: newMap,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 7,
            fillColor: isCompleted ? "#9B9B9B" : "#138808",
            fillOpacity: 1,
            strokeColor: "#FFFFFF",
            strokeWeight: 1,
          },
          title: stop.stop_name,
          label: { text: `${index + 1}`, color: "#FFFFFF", fontSize: "10px" },
        });

        // Add info window for each stop
        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div style="padding: 5px;">
                      <p style="font-weight: bold; color: #000080;">${stop.stop_name}</p>
                      <p>Arrival time: ${stop.arrival_time}</p>
                      <p>Status: ${isCompleted ? 'Completed' : 'Pending'}</p>
                    </div>`
        });

        stopMarker.addListener('click', () => {
          infoWindow.open(newMap, stopMarker);
        });
      });

      // Draw the route polyline
      const routeCoordinates = routeData.stops.map(stop => ({
        lat: stop.latitude,
        lng: stop.longitude
      }));

      const routePath = new window.google.maps.Polyline({
        path: routeCoordinates,
        geodesic: true,
        strokeColor: "#000080",
        strokeOpacity: 1.0,
        strokeWeight: 3,
      });

      routePath.setMap(newMap);
    }
  }, [mapLoaded, routeData]);

  // Handle update location button click
  const handleUpdateLocation = async () => {
    if (!currentPosition) {
      toast({
        title: "Location Error",
        description: "Could not get your current location.",
        variant: "destructive",
      });
      return;
    }

    setIsUpdatingLocation(true);
    try {
      const location = {
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude
      };
      
      const result = await updateLocation(location);
      toast({
        title: "Location Updated",
        description: result.message,
      });
      
      // Refetch route data
      refetch();
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update location.",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingLocation(false);
    }
  };

  // Handle mark stop as complete
  const handleMarkStopComplete = async (stopId: string) => {
    setIsUpdatingStop(true);
    setUpdatingStopId(stopId);
    try {
      const result = await updateStopStatus(stopId, 'completed');
      toast({
        title: "Stop Updated",
        description: result.message,
      });
      
      // Refetch route data
      refetch();
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update stop status.",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingStop(false);
      setUpdatingStopId(null);
    }
  };

  if (isLoading) {
    return (
      <DriverDashboardLayout>
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex flex-col space-y-6">
            <Skeleton className="h-8 w-60 mb-2" />
            <Skeleton className="h-6 w-80 mb-4" />
            <Skeleton className="h-[500px] w-full rounded-md" />
          </div>
        </div>
      </DriverDashboardLayout>
    );
  }

  if (error) {
    return (
      <DriverDashboardLayout>
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load route data. Please try again later.
            </AlertDescription>
          </Alert>
        </div>
      </DriverDashboardLayout>
    );
  }

  return (
    <DriverDashboardLayout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-[#FF9933]">Driver Tracking</h1>
            <p className="text-[#000080]">Route: {routeData?.route_id} - {routeData?.route_name}</p>
          </div>

          <Alert className="border-[#FF9933] bg-[#FFF9F0]">
            <AlertTriangle className="h-4 w-4 text-[#FF9933]" />
            <AlertTitle className="text-[#000080] font-medium">Safety Reminder</AlertTitle>
            <AlertDescription className="text-slate-600">
              Please ensure to update your location regularly and mark stops as completed. 
              Only use the app when the bus is stationary.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="live" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-6 bg-slate-100 p-1">
              <TabsTrigger 
                value="live" 
                className={`${activeTab === 'live' ? 'bg-[#FF9933] text-white font-medium' : 'text-slate-700'}`}>
                Live Location
              </TabsTrigger>
              <TabsTrigger 
                value="stops"
                className={`${activeTab === 'stops' ? 'bg-[#FF9933] text-white font-medium' : 'text-slate-700'}`}>
                Manage Stops
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="live">
              <Card className="p-6 border-[#138808] border-t-4 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-[#FF9933]">
                      <Navigation className="inline mr-2 text-[#FF9933]" size={20} />
                      Live Location Tracking
                    </h2>
                    <p className="text-slate-600">Update your current location</p>
                  </div>
                  <Button 
                    className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-white text-base" 
                    onClick={handleUpdateLocation}
                    disabled={isUpdatingLocation}
                  >
                    {isUpdatingLocation ? "Updating..." : "Update Location"}
                  </Button>
                </div>

                <div 
                  id="driver-map"
                  className="h-[400px] w-full rounded-lg shadow-md border border-slate-200"
                />

                <div className="mt-4 flex items-center justify-between p-3 bg-[#F9F9F9] rounded-md">
                  <div>
                    <p className="text-slate-600">
                      <MapPin className="inline mr-2 text-[#138808]" size={16} />
                      <span className="font-medium">Next stop:</span> {
                        routeData?.stops.find(stop => stop.status === 'pending')?.stop_name || 'All stops completed'
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">
                      Last updated: {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="stops">
              <Card className="p-6 border-[#138808] border-t-4 shadow-md">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-[#FF9933]">
                    <CheckCircle className="inline mr-2 text-[#FF9933]" size={20} />
                    Manage Stops
                  </h2>
                  <p className="text-slate-600">Mark stops as completed when you reach them</p>
                </div>

                <div className="space-y-4">
                  {routeData?.stops.map((stop) => (
                    <div 
                      key={stop.stop_id} 
                      className={`p-4 rounded-xl border ${
                        stop.status === 'completed' 
                          ? 'border-gray-300 bg-gray-50' 
                          : 'border-[#138808]/30 bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className={`font-medium text-lg ${
                            stop.status === 'completed' ? 'text-gray-500' : 'text-[#000080]'
                          }`}>
                            {stop.stop_name}
                          </h3>
                          <p className="text-sm text-slate-500">
                            <Clock className="inline mr-1 h-4 w-4" /> 
                            Scheduled arrival: {stop.arrival_time}
                          </p>
                        </div>
                        <Button
                          className={`${
                            stop.status === 'completed' 
                              ? 'bg-gray-300 hover:bg-gray-300 cursor-not-allowed' 
                              : 'bg-[#138808] hover:bg-[#138808]/90'
                          } text-white text-base`}
                          disabled={stop.status === 'completed' || isUpdatingStop}
                          onClick={() => handleMarkStopComplete(stop.stop_id)}
                        >
                          {stop.status === 'completed'
                            ? 'Completed' 
                            : isUpdatingStop && updatingStopId === stop.stop_id
                              ? 'Marking...'
                              : 'Mark Complete'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DriverDashboardLayout>
  );
};

export default Tracking;

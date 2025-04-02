
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Clock, Bus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

// Define Google Maps types to avoid TypeScript errors
declare global {
  interface Window {
    google: any;
  }
}

// Mock API service for transport data
const fetchLiveTracking = async () => {
  // In a real implementation, this would call the GET /api/parent/transport/live_tracking API
  // with authentication headers
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API delay
  
  return {
    route_id: "ROUTE001", 
    route_name: "Route A", 
    stops: [
      { stop_id: "STOP1", stop_name: "Indiranagar", latitude: 12.9784, longitude: 77.6408, arrival_time: "08:00" },
      { stop_id: "STOP2", stop_name: "Koramangala", latitude: 12.9316, longitude: 77.6246, arrival_time: "08:15" },
      { stop_id: "STOP3", stop_name: "HSR Layout", latitude: 12.9081, longitude: 77.6476, arrival_time: "08:30" },
      { stop_id: "STOP4", stop_name: "Electronic City", latitude: 12.8399, longitude: 77.6770, arrival_time: "08:45" },
      { stop_id: "STOP5", stop_name: "School", latitude: 12.8228, longitude: 77.6795, arrival_time: "09:00" }
    ],
    live_location: { 
      latitude: 12.9316, 
      longitude: 77.6246  // Currently at Koramangala stop
    }, 
    eta_to_next_stop: "15 mins",
    next_stop: "HSR Layout"
  };
};

const LiveTracking = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [map, setMap] = useState<any | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['liveTracking'],
    queryFn: fetchLiveTracking,
    refetchInterval: 30000, // Refetch every 30 seconds for live updates
  });

  useEffect(() => {
    // Load the Google Maps script
    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
    googleMapsScript.async = true;
    googleMapsScript.onload = () => setMapLoaded(true);
    document.head.appendChild(googleMapsScript);

    return () => {
      // Clean up script tag on component unmount
      const scriptTag = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
      if (scriptTag && scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, []);

  useEffect(() => {
    if (!mapLoaded || !data || !window.google) return;

    // Initialize Google Map
    const mapElement = document.getElementById('map');
    if (mapElement) {
      const newMap = new window.google.maps.Map(mapElement, {
        center: { lat: data.live_location.latitude, lng: data.live_location.longitude },
        zoom: 14,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#000080" }] },
        ],
      });
      setMap(newMap);

      // Add bus marker
      const busMarker = new window.google.maps.Marker({
        position: { lat: data.live_location.latitude, lng: data.live_location.longitude },
        map: newMap,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#FF9933",
          fillOpacity: 1,
          strokeColor: "#FFFFFF",
          strokeWeight: 2,
        },
        title: "School Bus",
      });

      // Add stop markers
      data.stops.forEach((stop, index) => {
        const stopMarker = new window.google.maps.Marker({
          position: { lat: stop.latitude, lng: stop.longitude },
          map: newMap,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 7,
            fillColor: "#138808",
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
                    </div>`
        });

        stopMarker.addListener('click', () => {
          infoWindow.open(newMap, stopMarker);
        });
      });

      // Draw the route polyline
      const routeCoordinates = data.stops.map(stop => ({
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
  }, [mapLoaded, data]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card className="p-4">
          <Skeleton className="h-6 w-24 mb-2" />
          <Skeleton className="h-4 w-32 mb-4" />
          <Skeleton className="h-[400px] w-full rounded-md" />
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load live tracking data. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="p-6 border-[#138808] border-t-4 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-[#FF9933]">
              <Bus className="inline mr-2 text-[#FF9933]" size={20} />
              Live Bus Tracking
            </h2>
            <p className="text-slate-600">Route: {data?.route_id} - {data?.route_name}</p>
          </div>
          <div className="bg-[#F0F8FF] p-3 rounded-md">
            <p className="text-[#000080] font-bold flex items-center">
              <Clock className="inline mr-2 text-[#000080]" size={16} />
              ETA to {data?.next_stop}: {data?.eta_to_next_stop}
            </p>
          </div>
        </div>

        <div 
          id="map"
          className="h-[400px] w-full rounded-lg shadow-md border border-slate-200"
        />

        <div className="mt-4 flex items-center justify-between p-3 bg-[#F9F9F9] rounded-md">
          <div>
            <p className="text-slate-600">
              <MapPin className="inline mr-2 text-[#138808]" size={16} />
              <span className="font-medium">Next stop:</span> {data?.next_stop}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Last updated: {new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LiveTracking;

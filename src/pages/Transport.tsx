
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import LiveTracking from '@/components/transport/LiveTracking';
import Schedule from '@/components/transport/Schedule';
import RouteDetails from '@/components/transport/RouteDetails';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Bus, CalendarClock, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Transport = () => {
  const [activeTab, setActiveTab] = useState('live');

  return (
    <DashboardLayout>
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center gap-3">
            <Bus className="h-8 w-8 text-[#FF9933]" />
            <div>
              <h1 className="text-2xl font-bold text-[#FF9933]">Transport</h1>
              <p className="text-[#000080]/80 text-lg">Manage and track your child's school transportation</p>
            </div>
          </div>

          <Alert className="border-2 border-[#FF9933] bg-[#FFF9F0] shadow-sm">
            <AlertTriangle className="h-5 w-5 text-[#FF9933]" />
            <AlertTitle className="text-[#000080] font-bold text-base">Upcoming Delay</AlertTitle>
            <AlertDescription className="text-[#000080]/80">
              <span className="font-medium">Bus ROUTE001</span> is running 5 minutes behind schedule due to traffic. ETA updated.
              <div className="mt-2">
                <Badge className="bg-[#FF9933]/20 text-[#FF9933] hover:bg-[#FF9933]/30">5 min delay</Badge>
              </div>
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="live" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6 bg-white border border-[#138808]/30 p-1 rounded-xl">
              <TabsTrigger 
                value="live" 
                className={`py-3 rounded-lg ${activeTab === 'live' ? 'bg-[#FF9933] text-white font-medium' : 'text-[#000080]'}`}>
                <MapPin className="mr-2 h-5 w-5" />
                Live Tracking
              </TabsTrigger>
              <TabsTrigger 
                value="schedule"
                className={`py-3 rounded-lg ${activeTab === 'schedule' ? 'bg-[#FF9933] text-white font-medium' : 'text-[#000080]'}`}>
                <CalendarClock className="mr-2 h-5 w-5" />
                Schedule
              </TabsTrigger>
              <TabsTrigger 
                value="route"
                className={`py-3 rounded-lg ${activeTab === 'route' ? 'bg-[#FF9933] text-white font-medium' : 'text-[#000080]'}`}>
                <Bus className="mr-2 h-5 w-5" />
                Route Details
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="live" className="animate-fade-in">
              <LiveTracking />
            </TabsContent>
            
            <TabsContent value="schedule" className="animate-fade-in">
              <Schedule />
            </TabsContent>
            
            <TabsContent value="route" className="animate-fade-in">
              <RouteDetails />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Transport;

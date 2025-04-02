
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import LiveTracking from '@/components/transport/LiveTracking';
import Schedule from '@/components/transport/Schedule';
import RouteDetails from '@/components/transport/RouteDetails';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const Transport = () => {
  const [activeTab, setActiveTab] = useState('live');

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-[#000080]">Transport</h1>
            <p className="text-slate-500">Manage and track your child's school transportation</p>
          </div>

          <Alert className="border-[#FF9933] bg-[#FFF9F0]">
            <AlertTriangle className="h-4 w-4 text-[#FF9933]" />
            <AlertTitle className="text-[#000080] font-medium">Upcoming Delay</AlertTitle>
            <AlertDescription className="text-slate-600">
              Bus ROUTE001 is running 5 minutes behind schedule due to traffic. ETA updated.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="live" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6 bg-slate-100 p-1">
              <TabsTrigger 
                value="live" 
                className={`${activeTab === 'live' ? 'bg-[#FF9933] text-white font-medium' : 'text-slate-700'}`}>
                Live Tracking
              </TabsTrigger>
              <TabsTrigger 
                value="schedule"
                className={`${activeTab === 'schedule' ? 'bg-[#FF9933] text-white font-medium' : 'text-slate-700'}`}>
                Schedule
              </TabsTrigger>
              <TabsTrigger 
                value="route"
                className={`${activeTab === 'route' ? 'bg-[#FF9933] text-white font-medium' : 'text-slate-700'}`}>
                Route Details
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="live">
              <LiveTracking />
            </TabsContent>
            
            <TabsContent value="schedule">
              <Schedule />
            </TabsContent>
            
            <TabsContent value="route">
              <RouteDetails />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Transport;

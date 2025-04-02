
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import TodayDiary from '@/components/diary/TodayDiary';
import PastEntries from '@/components/diary/PastEntries';

const Diary = () => {
  const [activeTab, setActiveTab] = useState("today");

  return (
    <DashboardLayout>
      <div className="container p-6">
        <h1 className="text-3xl font-bold mb-6">Student Diary</h1>
        
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

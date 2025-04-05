
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import LeaveHistoryItem from './LeaveHistoryItem';
import LeavePolicy from './LeavePolicy';

interface LeaveHistoryProps {
  leaveHistory: Array<{
    id: number;
    type: string;
    startDate: string;
    endDate: string;
    days: number;
    reason: string;
    status: string;
    approvedBy?: string;
    approvedOn?: string;
    submittedOn?: string;
  }>;
  selectedYear: string;
}

const LeaveHistory = ({ leaveHistory, selectedYear }: LeaveHistoryProps) => {
  return (
    <Card className="border-[#138808]/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-[#000080]">Leave History</CardTitle>
        <CardDescription>All your leave applications for {selectedYear}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaveHistory.map((leave) => (
            <LeaveHistoryItem
              key={leave.id}
              id={leave.id}
              type={leave.type}
              startDate={leave.startDate}
              endDate={leave.endDate}
              days={leave.days}
              reason={leave.reason}
              status={leave.status}
              approvedBy={leave.approvedBy}
              approvedOn={leave.approvedOn}
              submittedOn={leave.submittedOn}
            />
          ))}
        </div>
        
        <LeavePolicy />
      </CardContent>
    </Card>
  );
};

export default LeaveHistory;

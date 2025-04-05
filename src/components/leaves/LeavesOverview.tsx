
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import LeaveTypeCard from './LeaveTypeCard';
import LeaveHistoryItem from './LeaveHistoryItem';

interface LeaveType {
  id: number;
  name: string;
  total: number;
  availed: number;
  remaining: number;
}

interface LeaveHistory {
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
}

interface LeavesOverviewProps {
  leaveTypes: LeaveType[];
  leaveHistory: LeaveHistory[];
}

const LeavesOverview = ({ leaveTypes, leaveHistory }: LeavesOverviewProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {leaveTypes.map((leaveType) => (
          <LeaveTypeCard 
            key={leaveType.id}
            id={leaveType.id}
            name={leaveType.name}
            total={leaveType.total}
            availed={leaveType.availed}
            remaining={leaveType.remaining}
          />
        ))}
      </div>
      
      <Card className="border-[#138808]/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-[#000080]">Recent Leave Requests</CardTitle>
          <CardDescription>Your most recent leave applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaveHistory.slice(0, 3).map((leave) => (
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
                compact={true}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default LeavesOverview;

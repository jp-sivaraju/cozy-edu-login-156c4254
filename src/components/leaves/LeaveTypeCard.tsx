
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LeaveTypeCardProps {
  id: number;
  name: string;
  total: number;
  availed: number;
  remaining: number;
}

const LeaveTypeCard = ({ id, name, total, availed, remaining }: LeaveTypeCardProps) => {
  const percentUsed = Math.round((availed / total) * 100);
  
  return (
    <Card key={id} className="border-[#138808]/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-[#000080]">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <span className="text-slate-500">Total Allowed</span>
          <span className="font-medium">{total} days</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-slate-500">Availed</span>
          <span className="font-medium">{availed} days</span>
        </div>
        <div className="flex justify-between items-center mb-3 pb-3 border-b border-[#138808]/20">
          <span className="text-slate-500">Remaining</span>
          <span className="font-semibold text-[#138808]">{remaining} days</span>
        </div>
        
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div className="text-xs font-semibold text-[#138808]">
              {percentUsed}% Used
            </div>
          </div>
          <div className="flex h-2 overflow-hidden rounded bg-[#138808]/10">
            <div
              className="flex flex-col justify-center bg-[#138808]"
              style={{ width: `${percentUsed}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaveTypeCard;

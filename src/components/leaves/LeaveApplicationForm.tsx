
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon } from 'lucide-react';

interface LeaveType {
  id: number;
  name: string;
  total: number;
  availed: number;
  remaining: number;
}

interface LeaveApplicationFormProps {
  leaveTypes: LeaveType[];
  onClose?: () => void;
}

const LeaveApplicationForm = ({ leaveTypes, onClose }: LeaveApplicationFormProps) => {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [reason, setReason] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!leaveType || !startDate || !endDate || !reason) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Calculate days
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    toast({
      title: "Leave request submitted",
      description: `Your ${leaveType} request for ${diffDays} day(s) has been submitted successfully.`
    });
    
    // Reset form
    setLeaveType("");
    setStartDate(undefined);
    setEndDate(undefined);
    setReason("");
    
    if (onClose) {
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="grid gap-4">
        <div>
          <label htmlFor="leaveType" className="text-sm font-medium">
            Leave Type
          </label>
          <select 
            id="leaveType"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            className="mt-1 block w-full rounded-md border border-[#138808]/30 px-3 py-2 text-sm focus:border-[#138808] focus:outline-none focus:ring-1 focus:ring-[#138808]"
            required
          >
            <option value="" disabled>Select leave type</option>
            {leaveTypes.map(type => (
              <option key={type.id} value={type.name}>
                {type.name} ({type.remaining} remaining)
              </option>
            ))}
          </select>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Start Date</label>
            <div className="mt-1 relative">
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 absolute left-3 text-slate-400" />
                <Input 
                  value={startDate ? startDate.toLocaleDateString() : ''} 
                  readOnly
                  placeholder="Select start date"
                  className="pl-9"
                />
              </div>
              <div className="absolute top-full mt-1 z-10">
                {!startDate && (
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    className="rounded-md border bg-white shadow-md pointer-events-auto"
                    disabled={(date) => date < new Date() || (endDate ? date > endDate : false)}
                  />
                )}
              </div>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">End Date</label>
            <div className="mt-1 relative">
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 absolute left-3 text-slate-400" />
                <Input 
                  value={endDate ? endDate.toLocaleDateString() : ''} 
                  readOnly
                  placeholder="Select end date"
                  className="pl-9"
                />
              </div>
              <div className="absolute top-full mt-1 z-10">
                {!endDate && (
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    className="rounded-md border bg-white shadow-md pointer-events-auto"
                    disabled={(date) => (startDate ? date < startDate : date < new Date())}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="reason" className="text-sm font-medium">
            Reason for Leave
          </label>
          <Textarea 
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Please provide a reason for your leave request"
            className="mt-1 resize-none h-24"
            required
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        {onClose && (
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="tricolor">
          Submit Leave Request
        </Button>
      </div>
    </form>
  );
};

export default LeaveApplicationForm;

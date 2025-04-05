
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Check, Clock, X, FileText } from 'lucide-react';

interface LeaveHistoryItemProps {
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
  compact?: boolean;
}

const LeaveHistoryItem = ({
  id,
  type,
  startDate,
  endDate,
  days,
  reason,
  status,
  approvedBy,
  approvedOn,
  submittedOn,
  compact = false
}: LeaveHistoryItemProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-[#138808]/10 text-[#138808] border-[#138808]/30';
      case 'pending':
        return 'bg-[#FF9933]/10 text-[#FF9933] border-[#FF9933]/30';
      case 'rejected':
        return 'bg-red-100 text-red-600 border-red-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <Check className="h-3 w-3 mr-1" />;
      case 'pending':
        return <Clock className="h-3 w-3 mr-1" />;
      case 'rejected':
        return <X className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div key={id} className="p-4 rounded-lg border border-[#138808]/20 hover:bg-slate-50 transition-colors">
      {compact ? (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="font-medium text-[#000080]">{type}</h3>
            <p className="text-sm text-slate-500">
              {formatDate(startDate)} to {formatDate(endDate)} ({days} day{days > 1 ? 's' : ''})
            </p>
          </div>
          <Badge className={`${getStatusColor(status)} border flex items-center`}>
            {getStatusIcon(status)}
            {status}
          </Badge>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-[#138808]/10 flex items-center justify-center mr-3">
              <FileText className="h-4 w-4 text-[#138808]" />
            </div>
            <div>
              <h3 className="font-medium text-[#000080]">{type}</h3>
              <p className="text-xs text-slate-500">
                {formatDate(startDate)} to {formatDate(endDate)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-[#000080]">{days} day{days > 1 ? 's' : ''}</Badge>
            <Badge className={`${getStatusColor(status)} border flex items-center`}>
              {getStatusIcon(status)}
              {status}
            </Badge>
          </div>
        </div>
      )}
      
      <p className="mt-2 text-sm text-slate-600">
        <span className="font-medium">Reason:</span> {reason}
      </p>
      
      {status === 'Approved' && approvedBy && approvedOn && (
        <p className="mt-1 text-xs text-slate-500">
          Approved by {approvedBy} on {formatDate(approvedOn)}
        </p>
      )}
      
      {status === 'Pending' && submittedOn && (
        <p className="mt-1 text-xs text-slate-500">
          Submitted on {formatDate(submittedOn)}
        </p>
      )}
    </div>
  );
};

export default LeaveHistoryItem;

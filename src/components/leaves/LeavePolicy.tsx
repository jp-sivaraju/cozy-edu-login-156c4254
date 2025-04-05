
import React from 'react';
import { File } from 'lucide-react';

const LeavePolicy = () => {
  return (
    <div className="mt-6 p-4 bg-[#138808]/5 rounded-lg border border-[#138808]/20 text-sm text-[#000080]/80">
      <p className="font-semibold mb-2 flex items-center">
        <File className="h-4 w-4 mr-2" />
        Leave Policy Highlights:
      </p>
      <ul className="list-disc list-inside space-y-1">
        <li>Leave requests must be submitted at least 2 days in advance</li>
        <li>Emergency leave can be applied for on the same day</li>
        <li>Leaves during examination period require special approval</li>
        <li>Medical leaves of more than 3 days require a doctor's certificate</li>
        <li>Unused leaves cannot be carried forward to the next academic year</li>
      </ul>
    </div>
  );
};

export default LeavePolicy;

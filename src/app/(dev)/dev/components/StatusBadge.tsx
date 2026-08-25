'use client';

import React from 'react';

interface StatusBadgeProps {
  status: 'Running' | 'Idle' | 'Error' | 'Active' | 'Beta' | 'Planned' | 'High' | 'Medium' | 'Low' | string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getColors = () => {
    switch (status.toLowerCase()) {
      case 'running':
      case 'active':
      case 'high':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'idle':
      case 'medium':
      case 'beta':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'error':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'planned':
      case 'low':
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getColors()}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
      {status}
    </span>
  );
};

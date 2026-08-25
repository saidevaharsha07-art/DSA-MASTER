'use client';

import React from 'react';

export interface TimelineEntry {
  id: string;
  timestamp: string;
  action: string;
  module: string;
  durationMs: number;
  status: 'success' | 'warning' | 'error';
}

interface TimelineProps {
  entries: ReadonlyArray<TimelineEntry>;
}

export const Timeline: React.FC<TimelineProps> = ({ entries }) => {
  if (!entries || entries.length === 0) {
    return <div className="text-xs text-slate-500 py-2">No timeline execution records.</div>;
  }

  return (
    <div className="space-y-2">
      {entries.map((item) => (
        <div key={item.id} className="flex items-center justify-between bg-slate-900/40 border border-slate-800/80 rounded px-3 py-2 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-mono text-slate-500 text-[11px]">{item.timestamp}</span>
            <span className="font-semibold text-slate-200">{item.action}</span>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">{item.module}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-slate-400 text-[11px]">{item.durationMs}ms</span>
            <span className={`w-2 h-2 rounded-full ${item.status === 'success' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

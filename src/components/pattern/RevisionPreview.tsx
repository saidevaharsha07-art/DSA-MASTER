'use client';

import { motion } from 'framer-motion';
import { RevisionRule } from '@/src/types/curriculum';
import { Calendar, RefreshCw } from 'lucide-react';

interface RevisionPreviewProps {
  revisionPlan: RevisionRule[];
}

export function RevisionPreview({ revisionPlan }: RevisionPreviewProps) {
  if (!revisionPlan || revisionPlan.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 mt-4 bg-slate-900/40 rounded-3xl border border-white/5 p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-6 opacity-5">
        <RefreshCw className="w-32 h-32 text-cyan-500" />
      </div>

      <div className="flex items-center justify-between relative z-10 mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-cyan-400" />
          <h3 className="text-xl font-bold text-white">Revision Schedule</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Priority</span>
          <span className="text-lg font-bold text-amber-400">High</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Retention</span>
          <span className="text-lg font-bold text-cyan-400">64%</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Revised</span>
          <span className="text-lg font-bold text-slate-300">Never</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Next Revision</span>
          <span className="text-lg font-bold text-white">Tomorrow</span>
        </div>
      </div>
    </div>
  );
}

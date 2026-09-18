'use client';

/**
 * DSA MASTER — Daily Study Planner 2.0 Page
 * Route: /study-plan
 */
import React, { Suspense } from 'react';
import { StudyPlanHomeView } from '@/src/features/study-plan/components/StudyPlanHomeView';
import { Loader2 } from 'lucide-react';

export default function StudyPlanPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
          <div className="flex items-center gap-3 text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
            <span>Loading Daily Study Plan...</span>
          </div>
        </div>
      }
    >
      <StudyPlanHomeView />
    </Suspense>
  );
}

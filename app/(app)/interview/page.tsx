'use client';

/**
 * Real Adaptive Mock Interview Simulator — Interview Arena 2.0
 */
import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useActiveUser } from '@/src/hooks/useActiveUser';
import { useSettings } from '@/src/context/SettingsContext';
import { InterviewArenaService } from '@/src/features/interview/services/interview-arena.service';
import {
  InterviewConfig,
  InterviewArenaSession,
  InterviewArenaReport,
  InterviewHistoryRecord,
  InterviewSimulatorMode,
} from '@/src/features/interview/types/interview.types';
import { InterviewSetupView } from '@/src/features/interview/components/InterviewSetupView';
import { InterviewWorkspaceView } from '@/src/features/interview/components/InterviewWorkspaceView';
import { InterviewReportView } from '@/src/features/interview/components/InterviewReportView';
import { Loader2 } from 'lucide-react';

function InterviewPageContent() {
  const { userId, isAuthenticated } = useActiveUser();
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';
  const searchParams = useSearchParams();

  // Query parameter deep-linking
  const queryMode = (searchParams?.get('mode') as InterviewSimulatorMode | null) || undefined;
  const queryArea = searchParams?.get('area') || undefined;
  const querySubtopic = searchParams?.get('subtopic') || undefined;
  const queryPattern = searchParams?.get('pattern') || undefined;
  const queryCompany = searchParams?.get('company') || undefined;

  const [viewMode, setViewMode] = useState<'SETUP' | 'WORKSPACE' | 'REPORT'>('SETUP');
  const [activeSession, setActiveSession] = useState<InterviewArenaSession | null>(null);
  const [activeReport, setActiveReport] = useState<InterviewArenaReport | null>(null);
  const [isSamplePreview, setIsSamplePreview] = useState<boolean>(false);
  const [historyKey, setHistoryKey] = useState<number>(0);
  const [isRestoring, setIsRestoring] = useState<boolean>(true);

  // Load isolated history for authenticated user
  const history = useMemo(() => {
    return InterviewArenaService.getHistory(userId);
  }, [userId, historyKey]);

  const sampleReport = useMemo(() => {
    return InterviewArenaService.getSampleReport();
  }, []);

  // Restore in-progress active session on refresh/mount
  useEffect(() => {
    try {
      const existing = InterviewArenaService.loadActiveSession(userId);
      if (existing && existing.problems && existing.problems.length > 0) {
        // Verify session is not expired
        const expires = new Date(existing.expiresAt).getTime();
        if (existing.isPaused || expires > Date.now()) {
          setActiveSession(existing);
          setViewMode('WORKSPACE');
        } else {
          // Auto-finalize if expired while tab closed
          const finalizedReport = InterviewArenaService.finishSession(existing.id, userId, 'expired');
          setActiveReport(finalizedReport);
          setViewMode('REPORT');
        }
      }
    } catch (e) {
      console.error('Error restoring active interview session:', e);
    } finally {
      setIsRestoring(false);
    }
  }, [userId]);

  // Handle Start Interview
  const handleStartInterview = (config: InterviewConfig) => {
    const session = InterviewArenaService.createSession(config, userId);
    setActiveSession(session);
    setActiveReport(null);
    setIsSamplePreview(false);
    setViewMode('WORKSPACE');
  };

  // Handle Finish Interview (Completed or Expired)
  const handleFinishInterview = (status: 'completed' | 'expired') => {
    if (!activeSession) return;
    const report = InterviewArenaService.finishSession(activeSession.id, userId, status);
    setActiveReport(report);
    setActiveSession(null);
    setIsSamplePreview(false);
    setHistoryKey((prev) => prev + 1);
    setViewMode('REPORT');
  };

  // Handle View Specific Report (Historical or Sample)
  const handleViewReport = (report: InterviewArenaReport) => {
    setActiveReport(report);
    setIsSamplePreview(report.id === sampleReport.id);
    setViewMode('REPORT');
  };

  // Handle Take Another Interview
  const handleTakeAnother = () => {
    setActiveSession(null);
    setActiveReport(null);
    setIsSamplePreview(false);
    setViewMode('SETUP');
  };

  if (isRestoring) {
    return (
      <div className={`min-h-[60vh] flex flex-col items-center justify-center gap-3 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
        <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
        <span className="text-xs font-semibold">Restoring Interview Arena session...</span>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'} ${
        viewMode === 'WORKSPACE' ? 'p-2 sm:p-4 pt-3' : 'pt-6 px-4 md:px-8'
      }`}
    >
      {viewMode === 'SETUP' && (
        <InterviewSetupView
          isLight={isLight}
          isAuthenticated={isAuthenticated}
          userId={userId}
          history={history}
          onStartInterview={handleStartInterview}
          onViewReport={handleViewReport}
          sampleReport={sampleReport}
          initialMode={queryMode || undefined}
          initialArea={queryArea}
          initialSubtopic={querySubtopic}
          initialPattern={queryPattern}
          initialCompany={queryCompany}
        />
      )}

      {viewMode === 'WORKSPACE' && activeSession && (
        <InterviewWorkspaceView
          isLight={isLight}
          session={activeSession}
          userId={userId}
          onFinishInterview={handleFinishInterview}
          onSessionUpdate={(updated) => setActiveSession({ ...updated })}
        />
      )}

      {viewMode === 'REPORT' && activeReport && (
        <InterviewReportView
          isLight={isLight}
          report={activeReport}
          onTakeAnother={handleTakeAnother}
          isSamplePreview={isSamplePreview}
        />
      )}
    </div>
  );
}

export default function InterviewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
        </div>
      }
    >
      <InterviewPageContent />
    </Suspense>
  );
}

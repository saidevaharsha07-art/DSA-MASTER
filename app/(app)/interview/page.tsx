'use client';

/**
 * Real Adaptive Mock Interview Simulator — Interview Arena
 */
import React, { useState, useEffect, useMemo } from 'react';
import { useActiveUser } from '@/src/hooks/useActiveUser';
import { useSettings } from '@/src/context/SettingsContext';
import { InterviewArenaService } from '@/src/features/interview/services/interview-arena.service';
import {
  InterviewConfig,
  InterviewArenaSession,
  InterviewArenaReport,
  InterviewHistoryRecord,
} from '@/src/features/interview/types/interview.types';
import { InterviewSetupView } from '@/src/features/interview/components/InterviewSetupView';
import { InterviewWorkspaceView } from '@/src/features/interview/components/InterviewWorkspaceView';
import { InterviewReportView } from '@/src/features/interview/components/InterviewReportView';

export default function InterviewPage() {
  const { userId, isAuthenticated } = useActiveUser();
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';

  const [viewMode, setViewMode] = useState<'SETUP' | 'WORKSPACE' | 'REPORT'>('SETUP');
  const [activeSession, setActiveSession] = useState<InterviewArenaSession | null>(null);
  const [activeReport, setActiveReport] = useState<InterviewArenaReport | null>(null);
  const [isSamplePreview, setIsSamplePreview] = useState<boolean>(false);
  const [historyKey, setHistoryKey] = useState<number>(0);

  // Load isolated history for authenticated user (or empty for guests)
  const history = useMemo(() => {
    return InterviewArenaService.getHistory(userId);
  }, [userId, historyKey]);

  const sampleReport = useMemo(() => {
    return InterviewArenaService.getSampleReport();
  }, []);

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
          history={history}
          onStartInterview={handleStartInterview}
          onViewReport={handleViewReport}
          sampleReport={sampleReport}
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

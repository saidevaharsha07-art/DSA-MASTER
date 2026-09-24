'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useActiveUser } from '@/src/hooks/useActiveUser';
import { useSettings } from '@/src/context/SettingsContext';
import { useToast } from '@/src/context/ToastContext';
import { GuestPreviewBanner } from '@/src/lib/auth/components/GuestPreviewBanner';
import { ContestArenaService } from '@/src/features/contest/services/contest-arena.service';
import { ContestLobbyView } from '@/src/features/contest/components/ContestLobbyView';
import { ContestSetupView } from '@/src/features/contest/components/ContestSetupView';
import { ContestWorkspaceView } from '@/src/features/contest/components/ContestWorkspaceView';
import { ContestResultsView } from '@/src/features/contest/components/ContestResultsView';
import {
  ContestConfig,
  ContestSession,
  ContestPerformanceReport,
  ContestPreset,
  LeaderboardEntry,
} from '@/src/features/contest/types/contest.types';

export default function ContestPage() {
  const { userId, isAuthenticated } = useActiveUser();
  const { toast } = useToast();

  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<'lobby' | 'setup' | 'workspace' | 'results'>('lobby');
  const [activeSession, setActiveSession] = useState<ContestSession | null>(null);
  const [activeReport, setActiveReport] = useState<ContestPerformanceReport | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [setupInitialConfig, setSetupInitialConfig] = useState<Partial<ContestConfig> | undefined>(undefined);
  const [history, setHistory] = useState<ContestPerformanceReport[]>([]);

  const presets = useMemo(() => ContestArenaService.getPresets(), []);

  // Hydration safety & Initial load
  useEffect(() => {
    setMounted(true);
    const userHistory = ContestArenaService.getUserHistory(userId);
    setHistory(userHistory);
  }, [userId]);

  // Handle preset selection from lobby
  const handleSelectPreset = useCallback((preset: ContestPreset) => {
    setSetupInitialConfig({
      title: preset.title,
      format: preset.format,
      durationMinutes: preset.durationMinutes,
      problemCount: preset.problemCount,
      difficultyMix: preset.difficulty,
      topic: preset.topics[0] || 'General DSA',
      mode: 'real',
      targetWeaknesses: false,
    });
    setView('setup');
  }, []);

  // Open custom contest setup
  const handleOpenCustomSetup = useCallback(() => {
    setSetupInitialConfig(undefined);
    setView('setup');
  }, []);

  // Start contest countdown
  const handleStartContest = useCallback(
    (config: ContestConfig) => {
      try {
        const session = ContestArenaService.createSession(config, userId);
        setActiveSession(session);
        setView('workspace');
        toast(`Contest "${config.title}" started! Timer is ticking.`, 'success');
      } catch (err: any) {
        toast(`Failed to start contest: ${err.message}`, 'error');
      }
    },
    [userId, toast]
  );

  // Update telemetry during contest
  const handleUpdateTelemetry = useCallback(
    (problemId: string, update: any) => {
      if (!activeSession) return;
      const updated = ContestArenaService.updateProblemTelemetry(activeSession.id, problemId, update);
      if (updated) {
        setActiveSession({ ...updated });
      }
    },
    [activeSession]
  );

  // Record submission
  const handleRecordSubmission = useCallback(
    (
      problemId: string,
      language: string,
      code: string,
      verdict: string,
      passedCases: number,
      totalCases: number
    ) => {
      if (!activeSession) return;
      try {
        const { session } = ContestArenaService.recordSubmission(
          activeSession.id,
          problemId,
          language,
          code,
          verdict,
          passedCases,
          totalCases
        );
        setActiveSession({ ...session });
      } catch (err: any) {
        toast(err.message || 'Submission error', 'error');
      }
    },
    [activeSession, toast]
  );

  // Finish contest and show results
  const handleFinishContest = useCallback(() => {
    if (!activeSession) return;
    try {
      const report = ContestArenaService.finalizeContest(activeSession.id);
      const board = ContestArenaService.getLeaderboard(activeSession.id);

      setActiveReport(report);
      setLeaderboard(board);
      setHistory((prev) => [report, ...prev]);
      setView('results');
      toast('Contest finalized! Performance report and leaderboard generated.', 'success');
    } catch (err: any) {
      toast(`Failed to finalize contest: ${err.message}`, 'error');
    }
  }, [activeSession, toast]);

  // View past report
  const handleViewReport = useCallback((report: ContestPerformanceReport) => {
    setActiveReport(report);
    const board = ContestArenaService.getLeaderboard(report.contestId);
    setLeaderboard(board);
    setView('results');
  }, []);

  if (!mounted) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center text-[var(--text-muted)] text-sm">
        Loading Contest Arena...
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-6 pt-4 px-4 sm:px-6">
      {/* Public-First Guest Banner */}
      {!isAuthenticated && view !== 'workspace' && (
        <GuestPreviewBanner
          featureName="Tournament & Contest Arena"
          description="You are exploring DSA Magna Contest Arena. You can take practice contests and preview competitive leaderboards freely. Log in or create an account to record your official rating, track history, and sync mistake signals."
          redirectPath="/contest"
        />
      )}

      {/* State Router */}
      {view === 'lobby' && (
        <ContestLobbyView
          presets={presets}
          history={history}
          isAuthenticated={isAuthenticated}
          onSelectPreset={handleSelectPreset}
          onOpenCustomSetup={handleOpenCustomSetup}
          onViewReport={handleViewReport}
        />
      )}

      {view === 'setup' && (
        <ContestSetupView
          initialConfig={setupInitialConfig}
          onStartContest={handleStartContest}
          onCancel={() => setView('lobby')}
        />
      )}

      {view === 'workspace' && activeSession && (
        <ContestWorkspaceView
          session={activeSession}
          onUpdateTelemetry={handleUpdateTelemetry}
          onRecordSubmission={handleRecordSubmission}
          onFinishContest={handleFinishContest}
        />
      )}

      {view === 'results' && activeReport && (
        <ContestResultsView
          report={activeReport}
          leaderboard={leaderboard}
          onReturnToLobby={() => setView('lobby')}
        />
      )}
    </div>
  );
}

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { EngineStatusService, EngineMetric } from './services/engine-status.service';
import { DevMockDataManager, ProfilePreset } from './services/mock-data.manager';
import { DevExecutionTimeline, TimelineLogEntry } from './services/execution-timeline';
import { DevPerformanceMonitor, PerformanceStats } from './services/performance-monitor';
import { LearningProfile } from '@/src/intelligence/models/learning-profile';
import { ContestRecord } from '@/src/intelligence/contests/contest.models';

interface DevContextType {
  metrics: ReadonlyArray<EngineMetric>;
  profile: LearningProfile;
  contestHistory: ReadonlyArray<ContestRecord>;
  timelineLogs: ReadonlyArray<TimelineLogEntry>;
  performanceStats: PerformanceStats;
  currentPreset: ProfilePreset;
  setPreset: (preset: ProfilePreset) => void;
  recordSolve: (problemId: string, topic: string) => void;
  recordFailure: (problemId: string, topic: string) => void;
  addContest: (contest: ContestRecord) => void;
  resetAll: () => void;
  refreshAll: () => void;
  logAction: (action: string, module: string, durationMs?: number) => void;
}

const DevContext = createContext<DevContextType | undefined>(undefined);

export const DevProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPreset, setCurrentPreset] = useState<ProfilePreset>('Intermediate');
  const [profile, setProfile] = useState<LearningProfile>(() => DevMockDataManager.getProfilePreset('Intermediate'));
  const [contestHistory, setContestHistory] = useState<ReadonlyArray<ContestRecord>>(() => DevMockDataManager.getDemoContestHistory());
  const [metrics, setMetrics] = useState<ReadonlyArray<EngineMetric>>(() => EngineStatusService.getInstance().getMetrics());
  const [timelineLogs, setTimelineLogs] = useState<ReadonlyArray<TimelineLogEntry>>(() => DevExecutionTimeline.getInstance().getLogs());
  const [performanceStats, setPerformanceStats] = useState<PerformanceStats>(() => DevPerformanceMonitor.getStats());

  const refreshAll = () => {
    setMetrics(EngineStatusService.getInstance().getMetrics());
    setTimelineLogs(DevExecutionTimeline.getInstance().getLogs());
    setPerformanceStats(DevPerformanceMonitor.getStats());
  };

  const logAction = (action: string, module: string, durationMs: number = 2) => {
    DevExecutionTimeline.getInstance().addLog(action, module, durationMs);
    EngineStatusService.getInstance().recordExecution(module, durationMs);
    refreshAll();
  };

  const handleSetPreset = (preset: ProfilePreset) => {
    setCurrentPreset(preset);
    const newProfile = DevMockDataManager.getProfilePreset(preset);
    setProfile(newProfile);
    logAction(`Loaded Preset: ${preset}`, 'Intelligence Service', 1);
  };

  const recordSolve = (problemId: string, topic: string) => {
    const solved = new Set(profile.solvedProblemIds);
    const attempted = new Set(profile.attemptedProblemIds);
    solved.add(problemId);
    attempted.add(problemId);

    const newProfile: LearningProfile = {
      ...profile,
      totalXp: profile.totalXp + 20,
      solvedProblemIds: Object.freeze(solved),
      attemptedProblemIds: Object.freeze(attempted),
      lastActivityAt: new Date().toISOString(),
    };
    setProfile(newProfile);
    logAction(`Simulated Solve: ${problemId} (${topic})`, 'Profile Service', 2);
  };

  const recordFailure = (problemId: string, topic: string) => {
    const attempted = new Set(profile.attemptedProblemIds);
    attempted.add(problemId);

    const newProfile: LearningProfile = {
      ...profile,
      attemptedProblemIds: Object.freeze(attempted),
      lastActivityAt: new Date().toISOString(),
    };
    setProfile(newProfile);
    logAction(`Simulated Failure: ${problemId} (${topic})`, 'Profile Service', 2);
  };

  const addContest = (contest: ContestRecord) => {
    const updated = [contest, ...contestHistory];
    setContestHistory(updated);
    logAction(`Added Contest: ${contest.name}`, 'Contest Intelligence', 3);
  };

  const resetAll = () => {
    setCurrentPreset('Empty');
    setProfile(DevMockDataManager.getProfilePreset('Empty'));
    setContestHistory([]);
    DevExecutionTimeline.getInstance().clear();
    logAction('Reset All Dev Data', 'System', 1);
  };

  return (
    <DevContext.Provider
      value={{
        metrics,
        profile,
        contestHistory,
        timelineLogs,
        performanceStats,
        currentPreset,
        setPreset: handleSetPreset,
        recordSolve,
        recordFailure,
        addContest,
        resetAll,
        refreshAll,
        logAction,
      }}
    >
      {children}
    </DevContext.Provider>
  );
};

export const useDev = () => {
  const context = useContext(DevContext);
  if (!context) throw new Error('useDev must be used within a DevProvider');
  return context;
};

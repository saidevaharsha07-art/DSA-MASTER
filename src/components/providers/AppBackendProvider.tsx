'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Container } from '@/src/core/container/container';
import { initializeServiceRegistry } from '@/src/core/container/service-registry';
import { EventBus } from '@/src/core/events/event-bus';
import {
  OracleService,
  OracleContextService,
  OracleContextBundle,
  OracleDashboardSnapshot,
  ProfileService,
  MemoryEngine,
  ContestEngine,
  RatingEngine,
  AdaptiveEngine,
  LearningProfile,
  IOracleStrategy,
  OracleBalancedStrategy,
  OracleRevisionStrategy,
  OracleContestStrategy,
  OracleInterviewStrategy,
  OracleRatingStrategy,
  OracleMasteryStrategy,
} from '@/src/intelligence';
import { NotificationApi } from '@/src/lib/notifications/api/notification.api';
import { AnalyticsService } from '@/src/lib/analytics/services/analytics.service';

interface AppBackendContextType {
  profile: LearningProfile;
  snapshot: OracleDashboardSnapshot | null;
  bundle: OracleContextBundle | null;
  activeStrategyName: string;
  isLoading: boolean;
  error: string | null;
  setStrategy: (strategyName: string) => void;
  refreshData: () => void;
  recordAttempt: (problemId: string, status: 'accepted' | 'wrong_answer', durationSeconds: number, topic: string) => void;
  processMemoryReview: (conceptId: string, outcome: 'success' | 'failure') => void;
}

const AppBackendContext = createContext<AppBackendContextType | undefined>(undefined);

export function AppBackendProvider({ children }: { children: ReactNode }) {
  // Ensure IoC container service registry is initialized
  initializeServiceRegistry();

  const [profile, setProfile] = useState<LearningProfile>(() => ProfileService.createEmptyProfile('prod-user-1'));

  // Resolve singleton engines from Container (IoC Validation)
  const contestEngine = Container.resolve<ContestEngine>('ContestEngine');
  const ratingEngine = Container.resolve<RatingEngine>('RatingEngine');
  const memoryEngine = Container.resolve<MemoryEngine>('MemoryEngine');
  const oracleService = Container.resolve<OracleService>('OracleService');
  const analyticsService = Container.resolve<AnalyticsService>('AnalyticsService');

  const [activeStrategyName, setActiveStrategyName] = useState<string>('Balanced');
  const [bundle, setBundle] = useState<OracleContextBundle | null>(null);
  const [snapshot, setSnapshot] = useState<OracleDashboardSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refreshData = () => {
    try {
      setIsLoading(true);
      setError(null);
      const b = OracleContextService.buildContextBundle(profile, contestEngine, ratingEngine, memoryEngine);
      const s = oracleService.getDashboardSnapshot(b);
      setBundle(b);
      setSnapshot(s);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load backend engine snapshot.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial memory seed & snapshot refresh
    memoryEngine.processReview(profile.userId, 'concept-arrays', 'success');
    refreshData();

    // EventBus Subscribers (Part 13 Validation)
    const unsubProblem = EventBus.subscribe('ProblemSolved', () => {
      refreshData();
    });

    const unsubAchievement = EventBus.subscribe('AchievementUnlocked', (event) => {
      NotificationApi.scheduleReminder(
        '🏆 Achievement Unlocked!',
        (event.payload as { title?: string }).title || 'You earned a new badge!',
        'achievement',
        'once'
      );
    });

    return () => {
      unsubProblem();
      unsubAchievement();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setStrategy = (strategyName: string) => {
    setActiveStrategyName(strategyName);
    let strat: IOracleStrategy = new OracleBalancedStrategy();
    if (strategyName === 'Revision Focus') strat = new OracleRevisionStrategy();
    else if (strategyName === 'Contest Prep') strat = new OracleContestStrategy();
    else if (strategyName === 'Interview Prep') strat = new OracleInterviewStrategy();
    else if (strategyName === 'Rating Climb') strat = new OracleRatingStrategy();
    else if (strategyName === 'Topic Mastery') strat = new OracleMasteryStrategy();

    oracleService.setStrategy(strat);
    EventBus.publish('StrategyChanged', { strategyName });
    refreshData();
  };

  const recordAttempt = (problemId: string, status: 'accepted' | 'wrong_answer', durationSeconds: number, topic: string) => {
    const updated = ProfileService.recordAttempt(profile, {
      id: `att-${Date.now()}`,
      userId: profile.userId,
      problemId,
      platform: 'codechef',
      status,
      timestamp: new Date().toISOString(),
      durationSeconds,
      xpEarned: status === 'accepted' ? 25 : 0,
      hintsUsed: 0,
      topic,
    });
    setProfile(updated);

    if (status === 'accepted') {
      EventBus.publish('ProblemSolved', { problemId, topic, durationSeconds });
    }
  };

  const processMemoryReview = (conceptId: string, outcome: 'success' | 'failure') => {
    memoryEngine.processReview(profile.userId, conceptId, outcome);
    EventBus.publish('MemoryReviewed', { conceptId, outcome });
    refreshData();
  };

  return (
    <AppBackendContext.Provider
      value={{
        profile,
        snapshot,
        bundle,
        activeStrategyName,
        isLoading,
        error,
        setStrategy,
        refreshData,
        recordAttempt,
        processMemoryReview,
      }}
    >
      {children}
    </AppBackendContext.Provider>
  );
}

export function useAppBackend(): AppBackendContextType {
  const ctx = useContext(AppBackendContext);
  if (!ctx) {
    throw new Error('useAppBackend must be used within AppBackendProvider');
  }
  return ctx;
}

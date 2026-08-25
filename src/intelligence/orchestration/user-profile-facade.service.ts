/**
 * User Learning Profile Facade (Phase 10)
 * Provides a single READ-ONLY unified candidate profile aggregating telemetry
 * across ProgressService, MemoryEngine, CareerAdapterService, InterviewPrepAdapterService,
 * CampaignAdapterService, and Intelligence Analyzers.
 *
 * DATA INTEGRITY GUARANTEE:
 * Does NOT store or duplicate state. Reads strictly from canonical engines and adapters.
 */

import { progressService, ProgressService } from '@/src/services/progress/progress.service';
import { Container } from '@/src/core/container/container';
import { MemoryEngine } from '@/src/intelligence/memory/engine/memory.engine';
import { StrengthAnalyzer } from '@/src/intelligence/analyzers/strength.analyzer';
import { WeaknessAnalyzer } from '@/src/intelligence/analyzers/weakness.analyzer';
import { CareerAdapterService } from '@/src/features/career/services/career-adapter.service';
import { InterviewPreparationAdapterService } from '@/src/features/interview/services/interview-prep-adapter.service';
import { CampaignAdapterService } from '@/src/features/learn/services/campaign-adapter.service';
import { PracticeAttempt } from '@/src/intelligence/models/practice-history';

export interface UnifiedUserProfile {
  userId: string;
  xp: number;
  level: number;
  streak: number;
  solvedCount: number;
  dailyGoal: number;

  memoryHealth: number;
  revisionDueCount: number;
  conceptsAtRisk: number;

  primaryStrengths: string[];
  primaryWeaknesses: string[];

  targetCompany: string;
  companyReadiness: number | 'Unrated';
  interviewReadiness: number | 'Unrated';

  campaign: {
    currentKingdomId: number;
    currentKingdomTitle: string;
    unlockedKingdomsCount: number;
    totalKingdomsCount: number;
    completionPercentage: number;
  };

  isUnratedCandidate: boolean;
}

export class UserLearningProfileFacade {
  private static get memoryEngine(): MemoryEngine {
    if (!Container.has('MemoryEngine')) {
      Container.registerSingleton('MemoryEngine', new MemoryEngine());
    }
    return Container.resolve<MemoryEngine>('MemoryEngine');
  }

  /**
   * Retrieves a single READ-ONLY unified user learning profile for a candidate.
   */
  public static getProfile(userId = 'default_user', targetCompany = 'Amazon'): UnifiedUserProfile {
    const state = progressService.getState(userId);
    const logs = progressService.getActivityLog(userId);

    const xp = state.xp || 0;
    const level = ProgressService.calculateLevel(xp);
    const streak = state.currentStreak || 0;
    const dailyGoal = state.dailyGoal || 3;

    const solvedCount = (state.completedProblemIds || []).length;
    const isUnratedCandidate = solvedCount === 0;

    // 1. Memory Health Signals
    const memoryHealthReport = this.memoryEngine.getMemoryHealth(userId);
    const revisionQueue = this.memoryEngine.getRevisionQueue(userId);

    const memoryHealth = isUnratedCandidate ? 100 : (memoryHealthReport as any).overallMemoryScore || (memoryHealthReport as any).overallScore || 75;
    const revisionDueCount = revisionQueue.length;
    const conceptsAtRisk = revisionQueue.filter((item) => item.forgettingRisk >= 0.5).length;

    // Map ActivityRecord[] to PracticeAttempt[]
    const attempts: PracticeAttempt[] = logs.map((log) => ({
      id: log.id,
      userId,
      problemId: log.problemId,
      platform: (log.platform || 'leetcode') as any,
      status: log.action === 'solve' ? 'accepted' : 'wrong_answer',
      timestamp: log.timestamp,
      durationSeconds: log.durationSeconds || 300,
      xpEarned: log.xpEarned || 20,
      hintsUsed: 0,
      topic: log.topic || 'Arrays & Hashing',
      pattern: log.pattern || 'Core Pattern',
      difficulty: (log.difficulty || 'Easy') as any,
    }));

    // 2. Strengths and Weaknesses Analyzers
    const strengthAnalysis = StrengthAnalyzer.analyze(attempts);
    const weaknessAnalysis = WeaknessAnalyzer.analyze(attempts);

    const primaryStrengths = strengthAnalysis.masteredTopics.length > 0
      ? strengthAnalysis.masteredTopics.map((m) => m.topic).slice(0, 3)
      : ['Fundamental Problem Solving'];

    const primaryWeaknesses = weaknessAnalysis.weakTopics.length > 0
      ? weaknessAnalysis.weakTopics.map((w) => w.topic).slice(0, 3)
      : ['Sliding Window', 'Two Pointers'];

    // 3. Career & Interview Readiness
    const careerSummary = CareerAdapterService.getCareerSummary(userId);
    const companyTrack = careerSummary.companyTracks.find((c) => c.name.toLowerCase() === targetCompany.toLowerCase()) || careerSummary.companyTracks[0];

    const prepSummary = InterviewPreparationAdapterService.getInterviewPrepSummary(userId, companyTrack.name);

    // 4. Campaign & RPG World Map Progression
    const campaignSummary = CampaignAdapterService.getCampaignSummary(userId);
    const activeKingdom = campaignSummary.kingdoms.find((k) => k.status === 'available') || campaignSummary.kingdoms[0];
    const unlockedCount = campaignSummary.kingdoms.filter((k) => k.status !== 'locked').length;
    const overallProgressPct = Math.round((campaignSummary.hud.solvedCount / Math.max(1, campaignSummary.hud.totalProblems)) * 100);

    return {
      userId,
      xp,
      level,
      streak,
      solvedCount,
      dailyGoal,
      memoryHealth,
      revisionDueCount,
      conceptsAtRisk,
      primaryStrengths,
      primaryWeaknesses,
      targetCompany: companyTrack.name,
      companyReadiness: companyTrack.readinessPercentage,
      interviewReadiness: prepSummary.readiness.readinessScore,
      campaign: {
        currentKingdomId: activeKingdom.id,
        currentKingdomTitle: activeKingdom.title,
        unlockedKingdomsCount: unlockedCount,
        totalKingdomsCount: campaignSummary.kingdoms.length,
        completionPercentage: overallProgressPct,
      },
      isUnratedCandidate,
    };
  }
}

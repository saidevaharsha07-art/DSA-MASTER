/**
 * DSA MASTER — Unified Recommendation Engine Service
 * Single source of truth for deterministic, user-scoped next-best-action intelligence.
 * Consumes:
 * - AdaptiveRoadmapService (14-topic dependency graph, mastery, blockers)
 * - WeaknessAnalyzer & Mistake Intelligence (error patterns, fail signals)
 * - MemoryEngine & ProgressService (SRS spaced repetition retention)
 * - Practice Submissions & Telemetry
 * - InterviewArenaService & ContestArenaService (tournament evidence)
 */

import { AdaptiveRoadmapService } from '@/src/features/journey/services/adaptive-roadmap.service';
import { AdaptiveDataAdapterService } from '@/src/features/adaptive/services/adaptive-data-adapter.service';
import { WeaknessAnalyzer } from '@/src/intelligence/analyzers/weakness.analyzer';
import { progressService } from '@/src/services/progress/progress.service';
import { storage } from '@/src/core/storage/LocalStorageAdapter';
import { InterviewArenaService } from '@/src/features/interview/services/interview-arena.service';
import { ContestArenaService } from '@/src/features/contest/services/contest-arena.service';
import { RevisionAdapterService } from '@/src/features/revision/services/revision-adapter.service';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { EventBus } from '@/src/core/events/event-bus';
import {
  UnifiedRecommendation,
  RecommendationActionType,
  RecommendationPriority,
  RecommendationLifecycleState,
  RecommendationLifecycleRecord,
  RecommendationAnalyticsSummary,
  MentorContextPayload,
} from '../types/recommendation.types';
import { RoadmapTopicNode } from '@/src/features/journey/types/journey.types';

const STORAGE_KEY_LIFECYCLE_PREFIX = 'dsa_rec_lifecycle_v2';
const STORAGE_KEY_DISMISSED_PREFIX = 'dsa_rec_dismissed_v2';
const STORAGE_KEY_COMPLETED_PREFIX = 'dsa_rec_completed_v2';

export class RecommendationEngineService {
  /**
   * Generates a deterministic, ranked list of unified recommendations for a user.
   */
  public static getRecommendations(userId = 'default_user', limit = 5): UnifiedRecommendation[] {
    const isGuest = !userId || userId === 'guest' || userId === 'default_user';
    const cleanUserId = userId || 'guest-user';

    // 1. Consume Adaptive Roadmap 2.0 graph and evidence
    const roadmap = AdaptiveRoadmapService.computeRoadmap(cleanUserId);
    const dismissedIds = new Set<string>(this.getDismissedIds(cleanUserId));
    const completedIds = new Set<string>(this.getCompletedIds(cleanUserId));

    const candidateRecs: UnifiedRecommendation[] = [];

    // ── ZERO STATE HANDLING ──────────────────────────────────────────
    if (roadmap.isZeroState) {
      const firstTopic = roadmap.topics[0] || {
        id: 'arrays-hashing',
        title: 'Arrays & Hashing',
        slug: 'beginnings',
        tier: 'Beginner',
        masteryScore: 0,
        evidence: { practiceSolved: 0, practiceAttempted: 0 },
      };

      const zeroStateRec: UnifiedRecommendation = {
        id: `rec_zero_${firstTopic.id}_${cleanUserId}`,
        actionType: 'LEARN',
        title: 'Start with Arrays & Hashing',
        explanation: 'Foundation topic to begin your algorithmic problem-solving journey.',
        priority: 'HIGH',
        priorityRank: 2,
        topic: firstTopic.title,
        topicId: firstTopic.id,
        sourceSignals: ['AdaptiveRoadmap:Foundation'],
        destinationRoute: '/learn/beginnings',
        supportingEvidence: [
          'Foundation topic with no prior attempts',
          'Core prerequisite for Two Pointers, Stacks, and Trees',
          'Optimal entry point for beginner and intermediate patterns',
        ],
        createdAt: new Date().toISOString(),
        userId: cleanUserId,
        confidenceStrength: 'high',
        lifecycleState: this.resolveLifecycleState(
          `rec_zero_${firstTopic.id}_${cleanUserId}`,
          dismissedIds,
          completedIds
        ),
        targetDifficulty: 'Easy',
        estimatedMinutes: 20,
        mentorContextPayload: {
          topic: firstTopic.title,
          masteryScore: 0,
          failedAttempts: 0,
          recentAccuracy: 0,
          srsRetention: 0,
          recommendedAction: 'LEARN',
          contextSummary: 'Fresh learner starting Arrays & Hashing foundational patterns.',
        },
        isZeroState: true,
        isGuest,
      };

      return [zeroStateRec];
    }

    // ── 1. PRIORITY 1 (URGENT, Rank 1): URGENT REVISION & RETENTION DECAY ──
    const revisionDecayTopics = roadmap.topics.filter(
      (t) =>
        t.evidence.practiceSolved > 0 &&
        ((t.evidence.revisionRetentionPercent > 0 && t.evidence.revisionRetentionPercent < 70) || t.status === 'NEEDS_REVIEW')
    );

    revisionDecayTopics.forEach((t) => {
      const recId = `rec_revise_${t.id}_${cleanUserId}`;
      const evidenceList = [
        `SRS retention decaying at ${t.evidence.revisionRetentionPercent}% (Threshold: 70%)`,
        `${t.evidence.practiceSolved} solves completed previously`,
      ];
      if (t.evidence.failedAttemptsCount > 0) {
        evidenceList.push(`${t.evidence.failedAttemptsCount} recent failed attempts recorded`);
      }

      candidateRecs.push({
        id: recId,
        actionType: 'REVISE',
        title: `Revise ${t.title} Retention`,
        explanation: `Spaced repetition flashcards and formula drills needed to reinforce ${t.title}.`,
        priority: 'URGENT',
        priorityRank: 1,
        topic: t.title,
        topicId: t.id,
        sourceSignals: ['MemoryEngine:SRSDecay', 'AdaptiveRoadmap:NeedsReview'],
        destinationRoute: '/revision',
        supportingEvidence: evidenceList,
        createdAt: new Date().toISOString(),
        userId: cleanUserId,
        confidenceStrength: 'high',
        lifecycleState: this.resolveLifecycleState(recId, dismissedIds, completedIds),
        estimatedMinutes: 15,
        mentorContextPayload: {
          topic: t.title,
          masteryScore: t.masteryScore,
          failedAttempts: t.evidence.failedAttemptsCount,
          recentAccuracy: t.evidence.recentAccuracyPercent,
          srsRetention: t.evidence.revisionRetentionPercent,
          recommendedAction: 'REVISE',
          contextSummary: `Learner is experiencing retention decay (${t.evidence.revisionRetentionPercent}%) on ${t.title}.`,
        },
        isZeroState: false,
        isGuest,
      });
    });

    // Check direct overdue queue if no topic is explicitly marked decaying
    if (revisionDecayTopics.length === 0) {
      let dueProblemsCount = 0;
      try {
        const revSummary = RevisionAdapterService.getRevisionSummary(cleanUserId);
        dueProblemsCount = revSummary?.dueTodayProblems?.length || 0;
      } catch {
        // fallback
      }

      if (dueProblemsCount === 0) {
        const pState = progressService.getState(cleanUserId);
        const overdueStateItems = Object.entries(pState.revision || {}).filter(([_, dateStr]) => {
          return new Date(dateStr).getTime() <= Date.now();
        });
        dueProblemsCount = overdueStateItems.length;
      }

      if (dueProblemsCount > 0) {
        const recId = `rec_revise_queue_${cleanUserId}`;
        candidateRecs.push({
          id: recId,
          actionType: 'REVISE',
          title: 'Review Spaced Repetition Queue',
          explanation: `${dueProblemsCount} problems have reached memory decay thresholds and need revision today.`,
          priority: 'URGENT',
          priorityRank: 1,
          topic: 'Spaced Repetition',
          topicId: 'revision-queue',
          sourceSignals: ['MemoryEngine:OverdueQueue', 'SpacedRepetition:SM2'],
          destinationRoute: '/revision',
          supportingEvidence: [
            `${dueProblemsCount} problems overdue for retention review`,
            'Retention decay threshold reached (SM-2 Spaced Repetition)',
            'Reinforce solutions before memory fades',
          ],
          createdAt: new Date().toISOString(),
          userId: cleanUserId,
          confidenceStrength: 'high',
          lifecycleState: this.resolveLifecycleState(recId, dismissedIds, completedIds),
          estimatedMinutes: 15,
          mentorContextPayload: {
            topic: 'Spaced Repetition',
            masteryScore: 50,
            failedAttempts: 0,
            recentAccuracy: 75,
            srsRetention: 60,
            recommendedAction: 'REVISE',
            contextSummary: `Learner has ${dueProblemsCount} overdue spaced repetition reviews.`,
          },
          isZeroState: false,
          isGuest,
        });
      }
    }

    // ── 2. PRIORITY 2 (HIGH, Rank 2): REPEATED MISTAKE / ERROR PATTERNS ─
    const strugglingTopics = roadmap.topics.filter(
      (t) =>
        (t.status === 'NEEDS_REVIEW' && t.evidence.practiceSolved === 0) ||
        t.evidence.failedAttemptsCount >= 2 ||
        (t.evidence.practiceAttempted >= 2 && t.evidence.recentAccuracyPercent < 50)
    );

    strugglingTopics.forEach((t) => {
      const recId = `rec_mistake_${t.id}_${cleanUserId}`;
      const errorTags = t.evidence.repeatedErrorPatterns.length > 0
        ? t.evidence.repeatedErrorPatterns.join(', ')
        : 'Boundary conditions & edge cases';

      candidateRecs.push({
        id: recId,
        actionType: 'REVIEW_MISTAKE',
        title: `Review ${t.title} Mistake Patterns`,
        explanation: `Repeated failures detected on ${t.title}. Targeted debug review will raise accuracy.`,
        priority: 'HIGH',
        priorityRank: 2,
        topic: t.title,
        topicId: t.id,
        sourceSignals: ['MistakeAnalyzer', 'AdaptiveRoadmap:MistakePatterns'],
        destinationRoute: `/practice?topic=${encodeURIComponent(t.title)}`,
        supportingEvidence: [
          `${t.evidence.failedAttemptsCount} failed attempts recorded on ${t.title}`,
          `Recent accuracy is ${t.evidence.recentAccuracyPercent}% across ${t.evidence.practiceAttempted} attempts`,
          `Observed error patterns: ${errorTags}`,
        ],
        createdAt: new Date().toISOString(),
        userId: cleanUserId,
        confidenceStrength: 'high',
        lifecycleState: this.resolveLifecycleState(recId, dismissedIds, completedIds),
        targetProblemId: t.recommendedProblemIds[0],
        targetDifficulty: 'Medium',
        estimatedMinutes: 20,
        mentorContextPayload: {
          topic: t.title,
          masteryScore: t.masteryScore,
          failedAttempts: t.evidence.failedAttemptsCount,
          recentAccuracy: t.evidence.recentAccuracyPercent,
          srsRetention: t.evidence.revisionRetentionPercent,
          recommendedAction: 'REVIEW_MISTAKE',
          contextSummary: `Learner struggled with ${t.evidence.failedAttemptsCount} failed attempts on ${t.title}. Error patterns: ${errorTags}.`,
        },
        isZeroState: false,
        isGuest,
      });
    });

    // ── 3. PRIORITY 3 (MEDIUM, Rank 3): NEWLY UNLOCKED LEARNING ────────
    const newlyUnlockedTopics = roadmap.topics.filter(
      (t) => t.status === 'NOT_STARTED' || t.status === 'LEARNING'
    );

    newlyUnlockedTopics.forEach((t) => {
      const recId = `rec_learn_${t.id}_${cleanUserId}`;
      const prereqs = t.prerequisites.length > 0 ? t.prerequisites.join(', ') : 'None';

      candidateRecs.push({
        id: recId,
        actionType: 'LEARN',
        title: `Learn ${t.title} Foundations`,
        explanation: `Prerequisites met (${prereqs}). Ready to master fundamental patterns and templates.`,
        priority: 'MEDIUM',
        priorityRank: 3,
        topic: t.title,
        topicId: t.id,
        sourceSignals: ['AdaptiveRoadmap:DAGPrerequisitesMet'],
        destinationRoute: `/learn`,
        supportingEvidence: [
          `Prerequisites completed: ${prereqs}`,
          `Current topic progress: ${t.evidence.practiceSolved} / ${t.totalCurriculumProblems} solves`,
          `Tier: ${t.tier} (${t.category})`,
        ],
        createdAt: new Date().toISOString(),
        userId: cleanUserId,
        confidenceStrength: 'medium',
        lifecycleState: this.resolveLifecycleState(recId, dismissedIds, completedIds),
        targetDifficulty: t.tier === 'Beginner' ? 'Easy' : 'Medium',
        estimatedMinutes: 25,
        mentorContextPayload: {
          topic: t.title,
          masteryScore: t.masteryScore,
          failedAttempts: t.evidence.failedAttemptsCount,
          recentAccuracy: t.evidence.recentAccuracyPercent,
          srsRetention: t.evidence.revisionRetentionPercent,
          recommendedAction: 'LEARN',
          contextSummary: `Learner is initiating ${t.title} with prerequisites (${prereqs}) satisfied.`,
        },
        isZeroState: false,
        isGuest,
      });
    });

    // ── 4. PRIORITY 4 (NORMAL, Rank 4): ACTIVE PRACTICE OPPORTUNITY ─────
    const activePracticeTopics = roadmap.topics.filter(
      (t) => t.status === 'PRACTICING' || (t.status === 'LEARNING' && t.evidence.practiceSolved > 0)
    );

    activePracticeTopics.forEach((t) => {
      const recId = `rec_practice_${t.id}_${cleanUserId}`;
      const diff: 'Easy' | 'Medium' | 'Hard' =
        t.evidence.easySolved >= 2 ? 'Medium' : 'Easy';

      candidateRecs.push({
        id: recId,
        actionType: 'PRACTICE',
        title: `Practice ${diff} ${t.title}`,
        explanation: `Reinforce ${t.title} problem-solving speed with standard ${diff.toLowerCase()} patterns.`,
        priority: 'NORMAL',
        priorityRank: 4,
        topic: t.title,
        topicId: t.id,
        sourceSignals: ['AdaptiveRoadmap:ActiveFocus'],
        destinationRoute: `/practice?topic=${encodeURIComponent(t.title)}`,
        supportingEvidence: [
          `${t.evidence.practiceSolved} solved so far (${t.evidence.easySolved}E • ${t.evidence.medSolved}M • ${t.evidence.hardSolved}H)`,
          `Recent accuracy is ${t.evidence.recentAccuracyPercent}%`,
          `Target difficulty: ${diff}`,
        ],
        createdAt: new Date().toISOString(),
        userId: cleanUserId,
        confidenceStrength: 'high',
        lifecycleState: this.resolveLifecycleState(recId, dismissedIds, completedIds),
        targetProblemId: t.recommendedProblemIds[0],
        targetDifficulty: diff,
        estimatedMinutes: 25,
        mentorContextPayload: {
          topic: t.title,
          masteryScore: t.masteryScore,
          failedAttempts: t.evidence.failedAttemptsCount,
          recentAccuracy: t.evidence.recentAccuracyPercent,
          srsRetention: t.evidence.revisionRetentionPercent,
          recommendedAction: 'PRACTICE',
          contextSummary: `Learner is practicing ${diff} problems on ${t.title} (Mastery: ${t.masteryScore}%).`,
        },
        isZeroState: false,
        isGuest,
      });
    });

    // ── 5. PRIORITY 5 (NORMAL, Rank 5): INTERVIEW READINESS ────────────
    const interviewReadyTopics = roadmap.topics.filter(
      (t) => (t.status === 'STRONG' || t.status === 'MASTERED') && t.masteryScore >= 60
    );

    if (interviewReadyTopics.length > 0) {
      const topTopic = interviewReadyTopics[0];
      const recId = `rec_interview_${topTopic.id}_${cleanUserId}`;

      candidateRecs.push({
        id: recId,
        actionType: 'INTERVIEW',
        title: `Simulate Interview on ${topTopic.title}`,
        explanation: `Strong foundation in ${topTopic.title} (Mastery: ${topTopic.masteryScore}%). Validate speed and communication under realistic 45-min interview timer.`,
        priority: 'NORMAL',
        priorityRank: 5,
        topic: topTopic.title,
        topicId: topTopic.id,
        sourceSignals: ['AdaptiveRoadmap:HighMastery', 'InterviewArena:Eligibility'],
        destinationRoute: '/interview',
        supportingEvidence: [
          `Mastery is ${topTopic.masteryScore}% in ${topTopic.title}`,
          `${topTopic.evidence.practiceSolved} problems solved with ${topTopic.evidence.recentAccuracyPercent}% accuracy`,
          'Meets mock interview qualification benchmark',
        ],
        createdAt: new Date().toISOString(),
        userId: cleanUserId,
        confidenceStrength: 'medium',
        lifecycleState: this.resolveLifecycleState(recId, dismissedIds, completedIds),
        targetDifficulty: 'Medium',
        estimatedMinutes: 45,
        mentorContextPayload: {
          topic: topTopic.title,
          masteryScore: topTopic.masteryScore,
          failedAttempts: topTopic.evidence.failedAttemptsCount,
          recentAccuracy: topTopic.evidence.recentAccuracyPercent,
          srsRetention: topTopic.evidence.revisionRetentionPercent,
          recommendedAction: 'INTERVIEW',
          contextSummary: `Learner qualified for mock interview on ${topTopic.title} (Mastery: ${topTopic.masteryScore}%).`,
        },
        isZeroState: false,
        isGuest,
      });
    }

    // ── 6. PRIORITY 6 (LOW, Rank 6): CONTEST READINESS ─────────────────
    if (roadmap.overallMasteryPercent >= 25 || roadmap.masteredCount >= 1 || roadmap.strongCount >= 2) {
      const recId = `rec_contest_sprint_${cleanUserId}`;
      candidateRecs.push({
        id: recId,
        actionType: 'CONTEST',
        title: 'Compete in Weekly Contest Sprint',
        explanation: 'Test speed, penalty management, and problem selection under competitive ICPC contest conditions.',
        priority: 'LOW',
        priorityRank: 6,
        topic: 'Mixed DSA Patterns',
        sourceSignals: ['ContestArena:WeeklySchedule', 'AdaptiveRoadmap:OverallProficiency'],
        destinationRoute: '/contest',
        supportingEvidence: [
          `Overall roadmap mastery is ${roadmap.overallMasteryPercent}%`,
          `${roadmap.masteredCount} topics mastered, ${roadmap.strongCount} strong topics`,
          'Competitive tournament rating active',
        ],
        createdAt: new Date().toISOString(),
        userId: cleanUserId,
        confidenceStrength: 'medium',
        lifecycleState: this.resolveLifecycleState(recId, dismissedIds, completedIds),
        targetDifficulty: 'Medium',
        estimatedMinutes: 30,
        mentorContextPayload: {
          topic: 'Mixed DSA Patterns',
          masteryScore: roadmap.overallMasteryPercent,
          failedAttempts: 0,
          recentAccuracy: 80,
          srsRetention: 85,
          recommendedAction: 'CONTEST',
          contextSummary: `Learner is participating in competitive contest rounds across mixed topics.`,
        },
        isZeroState: false,
        isGuest,
      });
    }

    // ── 7. PRIORITY 7 (LOW, Rank 7): MENTOR SUPPORT ────────────────────
    if (roadmap.blockers.length > 0) {
      const topBlocker = roadmap.blockers[0];
      const recId = `rec_mentor_${topBlocker.topicId}_${cleanUserId}`;
      candidateRecs.push({
        id: recId,
        actionType: 'ASK_MENTOR',
        title: `Consult AI Mentor on ${topBlocker.topicTitle}`,
        explanation: `Receive algorithmic breakdowns and conceptual guidance for: ${topBlocker.explanation}`,
        priority: 'LOW',
        priorityRank: 7,
        topic: topBlocker.topicTitle,
        sourceSignals: ['AdaptiveRoadmap:BlockerDetector'],
        destinationRoute: `/mentor?context=recommendation&topic=${encodeURIComponent(
          topBlocker.topicTitle
        )}`,
        supportingEvidence: [
          `Blocker identified: ${topBlocker.explanation}`,
          `Suggested unlock action: ${topBlocker.unlockAction}`,
        ],
        createdAt: new Date().toISOString(),
        userId: cleanUserId,
        confidenceStrength: 'medium',
        lifecycleState: this.resolveLifecycleState(recId, dismissedIds, completedIds),
        estimatedMinutes: 10,
        mentorContextPayload: {
          topic: topBlocker.topicTitle,
          masteryScore: 30,
          failedAttempts: 3,
          recentAccuracy: 40,
          srsRetention: 50,
          recommendedAction: 'ASK_MENTOR',
          contextSummary: `Learner blocked on ${topBlocker.topicTitle}: ${topBlocker.explanation}`,
        },
        isZeroState: false,
        isGuest,
      });
    }

    // ── SORT & DEDUPLICATE ─────────────────────────────────────────────
    // Sort by priorityRank (1..7 ascending)
    candidateRecs.sort((a, b) => a.priorityRank - b.priorityRank);

    // Filter out dismissed or completed if active
    const activeRecs = candidateRecs.filter(
      (r) => r.lifecycleState !== 'DISMISSED' && r.lifecycleState !== 'COMPLETED'
    );

    // Fallback: if all were dismissed/completed, return candidates
    const finalRecs = activeRecs.length > 0 ? activeRecs : candidateRecs;

    return finalRecs.slice(0, limit);
  }

  /**
   * Returns the single highest-priority recommendation for a user.
   */
  public static getTopRecommendation(userId = 'default_user'): UnifiedRecommendation {
    const list = this.getRecommendations(userId, 1);
    if (list.length > 0) return list[0];

    // Fallback guaranteed recommendation
    return {
      id: `rec_default_${userId}`,
      actionType: 'PRACTICE',
      title: 'Practice Arrays & Hashing',
      explanation: 'Continuous daily algorithmic practice builds permanent fluency.',
      priority: 'NORMAL',
      priorityRank: 4,
      topic: 'Arrays & Hashing',
      sourceSignals: ['RecommendationEngine:Default'],
      destinationRoute: '/practice?topic=Arrays%20%26%20Hashing',
      supportingEvidence: ['Foundational DSA topic with essential algorithmic patterns.'],
      createdAt: new Date().toISOString(),
      userId,
      confidenceStrength: 'medium',
      lifecycleState: 'GENERATED',
      estimatedMinutes: 20,
      isZeroState: false,
      isGuest: false,
    };
  }

  /**
   * Contextual Recommendation Generator: After solving or failing a problem in Practice.
   */
  public static getPostPracticeRecommendation(
    userId = 'default_user',
    problemIdOrOptions: string | { problemId: string; topic?: string; outcome?: string; durationSeconds?: number; failCount?: number; verdict?: string; runtimeMs?: number },
    verdictParam?: string,
    runtimeMsParam = 0
  ): UnifiedRecommendation {
    let problemId: string;
    let verdict: string;
    let runtimeMs: number;
    let explicitTopic: string | undefined;

    if (typeof problemIdOrOptions === 'object' && problemIdOrOptions !== null) {
      problemId = problemIdOrOptions.problemId;
      explicitTopic = problemIdOrOptions.topic;
      verdict = problemIdOrOptions.verdict || (problemIdOrOptions.outcome?.toUpperCase() === 'SOLVED' || problemIdOrOptions.outcome?.toUpperCase() === 'ACCEPTED' ? 'Accepted' : 'Wrong Answer');
      runtimeMs = problemIdOrOptions.runtimeMs || (problemIdOrOptions.durationSeconds ? problemIdOrOptions.durationSeconds * 1000 : 0);
    } else {
      problemId = String(problemIdOrOptions || 'unknown');
      verdict = verdictParam || 'Accepted';
      runtimeMs = runtimeMsParam || 0;
    }

    const allProblems = CurriculumRepository.getAllProblems();
    const currentProb = allProblems.find((p) => p.id === problemId || p.slug === problemId);
    const topic = explicitTopic || currentProb?.categoryTitle || currentProb?.categorySlug || 'Arrays & Hashing';
    const isPassed = verdict.toLowerCase() === 'accepted' || verdict.toLowerCase() === 'solved';

    if (isPassed) {
      const nextDiff = (currentProb?.difficulty || 'Easy').toLowerCase() === 'easy' ? 'Medium' : 'Hard';
      return {
        id: `rec_post_solve_${problemId}_${Date.now()}`,
        actionType: 'PRACTICE',
        title: `Next Up: Solve ${nextDiff} ${topic}`,
        explanation: `Clean solve on "${currentProb?.title || problemId}" (${runtimeMs}ms). Progress to the next ${nextDiff.toLowerCase()} variation.`,
        priority: 'NORMAL',
        priorityRank: 4,
        topic,
        sourceSignals: ['PracticeExecution:AcceptedVerdict'],
        destinationRoute: `/practice?topic=${encodeURIComponent(topic)}&difficulty=${nextDiff}`,
        supportingEvidence: [
          `Successfully solved "${currentProb?.title || problemId}" with ${verdict}`,
          `Runtime performance: ${runtimeMs}ms`,
          `Ready for ${nextDiff} progression`,
        ],
        createdAt: new Date().toISOString(),
        userId,
        confidenceStrength: 'high',
        lifecycleState: 'GENERATED',
        targetDifficulty: nextDiff as any,
        estimatedMinutes: 25,
        mentorContextPayload: {
          topic,
          masteryScore: 70,
          failedAttempts: 0,
          recentAccuracy: 100,
          srsRetention: 85,
          recommendedAction: 'PRACTICE',
          contextSummary: `Learner successfully solved ${currentProb?.title || problemId} in ${runtimeMs}ms.`,
        },
        isZeroState: false,
        isGuest: !userId || userId === 'guest',
      };
    } else {
      return {
        id: `rec_post_fail_${problemId}_${Date.now()}`,
        actionType: 'REVIEW_MISTAKE',
        title: `Debug & Revise ${topic}`,
        explanation: `Encountered ${verdict} on "${currentProb?.title || problemId}". Review edge cases and pattern constraints.`,
        priority: 'HIGH',
        priorityRank: 2,
        topic,
        sourceSignals: ['PracticeExecution:FailedVerdict'],
        destinationRoute: `/practice/${problemId}`,
        supportingEvidence: [
          `Submission failed with verdict: ${verdict}`,
          `Review boundary checks and time complexity`,
        ],
        createdAt: new Date().toISOString(),
        userId,
        confidenceStrength: 'high',
        lifecycleState: 'GENERATED',
        targetProblemId: problemId,
        estimatedMinutes: 15,
        mentorContextPayload: {
          topic,
          masteryScore: 40,
          failedAttempts: 1,
          recentAccuracy: 0,
          srsRetention: 60,
          recommendedAction: 'REVIEW_MISTAKE',
          contextSummary: `Learner hit ${verdict} on ${currentProb?.title || problemId}. Needs targeted debugging.`,
        },
        isZeroState: false,
        isGuest: !userId || userId === 'guest',
      };
    }
  }

  /**
   * Contextual Recommendation Generator: After completing an Interview Arena session.
   */
  public static getPostInterviewRecommendation(
    userId = 'default_user',
    report: any
  ): UnifiedRecommendation {
    const score = report?.overallScore || report?.score || 70;
    const weakestBreakdown = (report?.problemBreakdown || []).find(
      (b: any) => b.result !== 'Passed' && b.verdict !== 'Accepted'
    );
    const targetTopic = report?.weakestTopic || weakestBreakdown?.pattern || weakestBreakdown?.topic || 'Algorithms';

    if (weakestBreakdown || score < 80 || report?.weakestTopic) {
      return {
        id: `rec_post_interview_${Date.now()}`,
        actionType: 'PRACTICE',
        title: `Strengthen Interview Weakness: ${targetTopic}`,
        explanation: `Identified time pressure / logic gap on "${weakestBreakdown?.title || targetTopic}" during interview (${score}% score).`,
        priority: 'HIGH',
        priorityRank: 2,
        topic: targetTopic,
        topicId: targetTopic.toLowerCase().replace(/\s+/g, '-'),
        sourceSignals: ['InterviewArena:PostReportAnalysis'],
        destinationRoute: `/practice?topic=${encodeURIComponent(targetTopic)}`,
        supportingEvidence: [
          `Interview score: ${score}/100`,
          weakestBreakdown ? `Failed or slow problem: "${weakestBreakdown.title || targetTopic}"` : `Target weakness: ${targetTopic}`,
          `Attempts required: ${weakestBreakdown?.attempts || 1}`,
        ],
        createdAt: new Date().toISOString(),
        userId,
        confidenceStrength: 'high',
        lifecycleState: 'GENERATED',
        estimatedMinutes: 30,
        mentorContextPayload: {
          topic: targetTopic,
          masteryScore: score,
          failedAttempts: 2,
          recentAccuracy: score,
          srsRetention: 75,
          recommendedAction: 'PRACTICE',
          contextSummary: `Learner finished a mock interview with an ${score}% score. Struggled with ${targetTopic}.`,
        },
        isZeroState: false,
        isGuest: !userId || userId === 'guest',
      };
    } else {
      return {
        id: `rec_post_interview_pass_${Date.now()}`,
        actionType: 'CONTEST',
        title: 'Interview Ready: Join Contest Arena',
        explanation: `Flawless interview performance (${score}%). Test multi-problem stamina in a live competitive contest.`,
        priority: 'NORMAL',
        priorityRank: 6,
        topic: 'Mixed DSA Patterns',
        sourceSignals: ['InterviewArena:AllPassed'],
        destinationRoute: '/contest',
        supportingEvidence: [
          `100% test cases passed across all interview problems`,
          `Clean execution under time pressure`,
        ],
        createdAt: new Date().toISOString(),
        userId,
        confidenceStrength: 'high',
        lifecycleState: 'GENERATED',
        estimatedMinutes: 30,
        isZeroState: false,
        isGuest: !userId || userId === 'guest',
      };
    }
  }

  /**
   * Contextual Recommendation Generator: After completing a Contest Arena session.
   */
  public static getPostContestRecommendation(
    userId = 'default_user',
    report: any
  ): UnifiedRecommendation {
    const weakTopic = report?.weakTopics?.[0] || report?.weaknesses?.[0];
    const unacceptedProblems = (report?.problemBreakdown || []).filter(
      (p: any) => p.verdict !== 'ACCEPTED' && p.status !== 'solved'
    );

    const isPartialSolve = (report?.solvedCount !== undefined && report?.totalProblems !== undefined && report.solvedCount < report.totalProblems);

    if (unacceptedProblems.length > 0 || weakTopic || isPartialSolve) {
      const topMissed = unacceptedProblems[0];
      const topic = weakTopic || topMissed?.topic || 'Dynamic Programming';
      const missedTitle = topMissed?.title || `${topic} Problem`;

      return {
        id: `rec_post_contest_${Date.now()}`,
        actionType: 'PRACTICE',
        title: `Upsolve Contest Problem: ${missedTitle}`,
        explanation: `Missed "${missedTitle}" during "${report.contestTitle || 'Contest'}". Upsolving solidifies contest growth.`,
        priority: 'HIGH',
        priorityRank: 2,
        topic,
        topicId: topic.toLowerCase().replace(/\s+/g, '-'),
        sourceSignals: ['ContestArena:UpsolvingOpportunity'],
        destinationRoute: topMissed?.problemId ? `/practice/${topMissed.problemId}` : `/practice?topic=${encodeURIComponent(topic)}`,
        supportingEvidence: [
          report.solvedCount !== undefined ? `Contest result: solved ${report.solvedCount}/${report.totalProblems} problems` : `Missed during contest (Score: ${report.totalScore || 0} Pts)`,
          `Topic: ${topic}`,
          `Upsolving builds algorithmic resilience`,
        ],
        createdAt: new Date().toISOString(),
        userId,
        confidenceStrength: 'high',
        lifecycleState: 'GENERATED',
        targetProblemId: topMissed?.problemId,
        estimatedMinutes: 25,
        mentorContextPayload: {
          topic,
          masteryScore: 50,
          failedAttempts: topMissed?.attemptCount || 1,
          recentAccuracy: report.accuracyPercent || 50,
          srsRetention: 75,
          recommendedAction: 'PRACTICE',
          contextSummary: `Learner needs to upsolve ${missedTitle} missed in contest.`,
        },
        isZeroState: false,
        isGuest: !userId || userId === 'guest',
      };
    } else {
      return {
        id: `rec_post_contest_clean_${Date.now()}`,
        actionType: 'REVISE',
        title: 'Maintain Streak: Run Spaced Revision',
        explanation: `Excellent contest solves! Cement algorithmic edge cases in long-term memory.`,
        priority: 'NORMAL',
        priorityRank: 1,
        topic: 'Spaced Repetition',
        sourceSignals: ['ContestArena:CleanSweep'],
        destinationRoute: '/revision',
        supportingEvidence: [
          `All contest problems solved cleanly`,
          `Accurate penalty management achieved`,
        ],
        createdAt: new Date().toISOString(),
        userId,
        confidenceStrength: 'high',
        lifecycleState: 'GENERATED',
        estimatedMinutes: 15,
        isZeroState: false,
        isGuest: !userId || userId === 'guest',
      };
    }
  }

  /**
   * Contextual Recommendation Generator: After an SRS Revision session.
   */
  public static getPostRevisionRecommendation(
    userId = 'default_user',
    paramOrCount: number | { reviewedCount?: number; decayedCount?: number; avgRetention?: number } = 0,
    paramAvgRetention = 80
  ): UnifiedRecommendation {
    let reviewedCount = 0;
    let avgRetention = 80;

    if (typeof paramOrCount === 'object' && paramOrCount !== null) {
      reviewedCount = paramOrCount.reviewedCount || 0;
      avgRetention = paramOrCount.avgRetention ?? 80;
    } else {
      reviewedCount = typeof paramOrCount === 'number' ? paramOrCount : 0;
      avgRetention = paramAvgRetention;
    }
    if (avgRetention >= 75) {
      return {
        id: `rec_post_rev_strong_${Date.now()}`,
        actionType: 'PRACTICE',
        title: 'Retention Strong: Resume Practice Flow',
        explanation: `Reviewed ${reviewedCount} flashcard concepts with strong retention (${avgRetention}%). Return to active coding challenges.`,
        priority: 'NORMAL',
        priorityRank: 4,
        topic: 'Active Roadmap',
        sourceSignals: ['MemoryEngine:RetentionHealthy'],
        destinationRoute: '/practice',
        supportingEvidence: [
          `${reviewedCount} cards reviewed with ${avgRetention}% memory retention`,
          'Knowledge graph concepts refreshed and active in working memory',
        ],
        createdAt: new Date().toISOString(),
        userId,
        confidenceStrength: 'high',
        lifecycleState: 'GENERATED',
        estimatedMinutes: 25,
        isZeroState: false,
        isGuest: !userId || userId === 'guest',
      };
    } else {
      return {
        id: `rec_post_rev_weak_${Date.now()}`,
        actionType: 'LEARN',
        title: 'Deepen Weak Concepts in Learning Center',
        explanation: `Retention score is ${avgRetention}%. Review fundamental visual explanations to build stronger mental models.`,
        priority: 'HIGH',
        priorityRank: 3,
        topic: 'Conceptual Foundations',
        sourceSignals: ['MemoryEngine:RetentionLow'],
        destinationRoute: '/learn',
        supportingEvidence: [
          `Review accuracy below 75% (${avgRetention}%)`,
          'Visual animations and step-by-step proofs recommended',
        ],
        createdAt: new Date().toISOString(),
        userId,
        confidenceStrength: 'high',
        lifecycleState: 'GENERATED',
        estimatedMinutes: 20,
        isZeroState: false,
        isGuest: !userId || userId === 'guest',
      };
    }
  }

  // =========================================================================
  // LIFECYCLE & ANALYTICS TRACKING
  // =========================================================================

  private static normalizeArgs(arg1: string, arg2: string): { userId: string; recommendationId: string } {
    if (arg1 && arg1.startsWith('rec_') && (!arg2 || !arg2.startsWith('rec_'))) {
      return { userId: arg2 || 'default_user', recommendationId: arg1 };
    }
    return { userId: arg1 || 'default_user', recommendationId: arg2 || 'unknown' };
  }

  public static recordView(param1: string, param2: string): void {
    const { userId, recommendationId } = this.normalizeArgs(param1, param2);
    this.recordLifecycleEvent(userId, recommendationId, 'VIEWED');
  }

  public static recordStart(param1: string, param2: string): void {
    const { userId, recommendationId } = this.normalizeArgs(param1, param2);
    this.recordLifecycleEvent(userId, recommendationId, 'STARTED');
  }

  public static recordComplete(param1: string, param2: string): void {
    const { userId, recommendationId } = this.normalizeArgs(param1, param2);
    this.recordLifecycleEvent(userId, recommendationId, 'COMPLETED');
    const completed = this.getCompletedIds(userId);
    if (!completed.includes(recommendationId)) {
      completed.push(recommendationId);
      storage.save(`${STORAGE_KEY_COMPLETED_PREFIX}_${userId || 'default_user'}`, completed.slice(-100));
    }
    EventBus.publish('RecommendationCompleted', { userId, recommendationId, timestamp: new Date().toISOString() } as any);
  }

  public static recordDismiss(param1: string, param2: string): void {
    const { userId, recommendationId } = this.normalizeArgs(param1, param2);
    this.recordLifecycleEvent(userId, recommendationId, 'DISMISSED');
    const dismissed = this.getDismissedIds(userId);
    if (!dismissed.includes(recommendationId)) {
      dismissed.push(recommendationId);
      storage.save(`${STORAGE_KEY_DISMISSED_PREFIX}_${userId || 'default_user'}`, dismissed.slice(-100));
    }
  }

  public static getAnalytics(userId = 'default_user'): RecommendationAnalyticsSummary {
    const key = `${STORAGE_KEY_LIFECYCLE_PREFIX}_${userId || 'default_user'}`;
    const events = storage.get<RecommendationLifecycleRecord[]>(key) || [];

    let totalGenerated = 0;
    let totalViewed = 0;
    let totalStarted = 0;
    let totalCompleted = 0;
    let totalDismissed = 0;

    const actionTypeBreakdown: Record<RecommendationActionType, number> = {
      LEARN: 0,
      PRACTICE: 0,
      REVISE: 0,
      INTERVIEW: 0,
      CONTEST: 0,
      REVIEW_MISTAKE: 0,
      ASK_MENTOR: 0,
    };

    events.forEach((ev) => {
      if (ev.state === 'GENERATED') totalGenerated++;
      else if (ev.state === 'VIEWED') totalViewed++;
      else if (ev.state === 'STARTED') totalStarted++;
      else if (ev.state === 'COMPLETED') totalCompleted++;
      else if (ev.state === 'DISMISSED') totalDismissed++;

      if (ev.actionType && actionTypeBreakdown[ev.actionType] !== undefined) {
        actionTypeBreakdown[ev.actionType]++;
      }
    });

    let topActionType = 'PRACTICE';
    let maxActionCount = 0;
    (Object.entries(actionTypeBreakdown) as [RecommendationActionType, number][]).forEach(([type, count]) => {
      if (count > maxActionCount) {
        maxActionCount = count;
        topActionType = type;
      }
    });

    const completionRatePercent =
      totalStarted > 0 ? Math.round((totalCompleted / totalStarted) * 100) : 0;

    return {
      totalGenerated: Math.max(totalGenerated, totalViewed, totalCompleted + totalDismissed + totalStarted, events.length > 0 ? 1 : 0),
      totalViewed,
      totalStarted,
      totalCompleted,
      totalDismissed,
      completionRatePercent,
      completionRatePct: completionRatePercent,
      topActionType,
      actionTypeBreakdown,
      topicProgressionAfterActionCount: totalCompleted,
      recentEvents: events.slice(-20),
    };
  }

  private static recordLifecycleEvent(
    userId: string,
    recommendationId: string,
    state: RecommendationLifecycleState
  ): void {
    const key = `${STORAGE_KEY_LIFECYCLE_PREFIX}_${userId || 'default_user'}`;
    const existing = storage.get<RecommendationLifecycleRecord[]>(key) || [];

    const record: RecommendationLifecycleRecord = {
      recommendationId,
      userId,
      actionType: 'PRACTICE',
      state,
      timestamp: new Date().toISOString(),
      topic: '',
      destinationRoute: '',
    };

    const updated = [...existing, record].slice(-200);
    storage.save(key, updated);
  }

  private static getDismissedIds(userId: string): string[] {
    const key = `${STORAGE_KEY_DISMISSED_PREFIX}_${userId || 'default_user'}`;
    return storage.get<string[]>(key) || [];
  }

  private static getCompletedIds(userId: string): string[] {
    const key = `${STORAGE_KEY_COMPLETED_PREFIX}_${userId || 'default_user'}`;
    return storage.get<string[]>(key) || [];
  }

  private static resolveLifecycleState(
    id: string,
    dismissedIds: Set<string>,
    completedIds: Set<string>
  ): RecommendationLifecycleState {
    if (completedIds.has(id)) return 'COMPLETED';
    if (dismissedIds.has(id)) return 'DISMISSED';
    return 'GENERATED';
  }
}

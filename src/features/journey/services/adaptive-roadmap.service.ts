/**
 * DSA MASTER — Adaptive Roadmap 2.0 Intelligence Service
 * Single source of truth for personalized DSA learning paths, deterministic mastery computation,
 * dependency graph evaluation, blocker detection, next-best-action recommendations, and weekly plans.
 */

import { CurriculumRepository } from '@/src/curriculum/repository';
import { ProblemModel } from '@/src/curriculum/types';
import { AdaptiveDataAdapterService } from '@/src/features/adaptive/services/adaptive-data-adapter.service';
import { WeaknessAnalyzer } from '@/src/intelligence/analyzers/weakness.analyzer';
import { InterviewArenaService } from '@/src/features/interview/services/interview-arena.service';
import { ContestArenaService } from '@/src/features/contest/services/contest-arena.service';
import { progressService } from '@/src/services/progress/progress.service';
import { storage } from '@/src/core/storage/LocalStorageAdapter';
import { OnboardingService } from '@/src/intelligence/onboarding/services/onboarding.service';
import {
  TopicStatus,
  NextActionType,
  RoadmapTopicNode,
  TopicEvidence,
  NextBestAction,
  LearningMomentum,
  LearningBlocker,
  DailyScheduleItem,
  AdaptiveRoadmapState,
  DifficultyTier,
} from '../types/journey.types';

interface CanonicalTopicDefinition {
  id: string;
  title: string;
  slug: string;
  category: string;
  tier: DifficultyTier;
  order: number;
  prerequisites: string[];
  keywords: string[];
}

export class AdaptiveRoadmapService {
  /**
   * 14 Canonical DSA Topics forming the Directed Acyclic Dependency Graph
   */
  public static readonly CANONICAL_TOPICS: CanonicalTopicDefinition[] = [
    {
      id: 'arrays-hashing',
      title: 'Arrays & Hashing',
      slug: 'basic-arrays',
      category: 'Fundamentals',
      tier: 'Beginner',
      order: 1,
      prerequisites: [],
      keywords: ['array', 'hash', 'frequency', 'hashmap', 'lookup', 'duplicates'],
    },
    {
      id: 'two-pointers',
      title: 'Two Pointers',
      slug: 'two-pointers',
      category: 'Linear Structures',
      tier: 'Beginner',
      order: 2,
      prerequisites: ['arrays-hashing'],
      keywords: ['two-pointer', 'two pointer', 'opposite ends', 'sorted array', 'palindrome'],
    },
    {
      id: 'sliding-window',
      title: 'Sliding Window',
      slug: 'sliding-window',
      category: 'Linear Structures',
      tier: 'Intermediate',
      order: 3,
      prerequisites: ['two-pointers'],
      keywords: ['sliding window', 'window', 'substring', 'subarray', 'fixed window', 'variable window'],
    },
    {
      id: 'binary-search',
      title: 'Binary Search',
      slug: 'binary-search',
      category: 'Searching',
      tier: 'Intermediate',
      order: 4,
      prerequisites: ['arrays-hashing'],
      keywords: ['binary search', 'sorted', 'lower bound', 'upper bound', 'search space'],
    },
    {
      id: 'stack-queue',
      title: 'Stacks & Queues',
      slug: 'stack-queue',
      category: 'Linear Structures',
      tier: 'Beginner',
      order: 5,
      prerequisites: ['arrays-hashing'],
      keywords: ['stack', 'queue', 'monotonic stack', 'deque', 'parentheses', 'next greater'],
    },
    {
      id: 'linked-lists',
      title: 'Linked Lists',
      slug: 'linked-lists',
      category: 'Linear Structures',
      tier: 'Intermediate',
      order: 6,
      prerequisites: ['arrays-hashing'],
      keywords: ['linked list', 'singly', 'doubly', 'cycle', 'reverse list', 'fast and slow pointer'],
    },
    {
      id: 'trees-traversal',
      title: 'Binary Trees & Traversals',
      slug: 'trees-traversal',
      category: 'Hierarchical Structures',
      tier: 'Intermediate',
      order: 7,
      prerequisites: ['stack-queue', 'linked-lists'],
      keywords: ['tree', 'binary tree', 'traversal', 'preorder', 'inorder', 'postorder', 'level order', 'depth'],
    },
    {
      id: 'bst-heaps',
      title: 'BST & Priority Queues (Heaps)',
      slug: 'bst-heaps',
      category: 'Hierarchical Structures',
      tier: 'Intermediate',
      order: 8,
      prerequisites: ['trees-traversal'],
      keywords: ['bst', 'search tree', 'heap', 'priority queue', 'kth largest', 'top k'],
    },
    {
      id: 'recursion-backtracking',
      title: 'Recursion & Backtracking',
      slug: 'recursion-backtracking',
      category: 'Algorithmic Paradigms',
      tier: 'Intermediate',
      order: 9,
      prerequisites: ['trees-traversal'],
      keywords: ['backtracking', 'recursion', 'permutations', 'subsets', 'combinations', 'n-queens'],
    },
    {
      id: 'graphs-bfs-dfs',
      title: 'Graphs (BFS & DFS)',
      slug: 'graphs-bfs-dfs',
      category: 'Non-Linear Structures',
      tier: 'Advanced',
      order: 10,
      prerequisites: ['trees-traversal', 'recursion-backtracking'],
      keywords: ['graph', 'bfs', 'dfs', 'adjacency', 'connected components', 'topological sort', 'cycle detection'],
    },
    {
      id: 'advanced-graphs',
      title: 'Shortest Paths & Disjoint Set (DSU)',
      slug: 'advanced-graphs',
      category: 'Non-Linear Structures',
      tier: 'Advanced',
      order: 11,
      prerequisites: ['graphs-bfs-dfs'],
      keywords: ['dijkstra', 'shortest path', 'union find', 'dsu', 'kruskal', 'minimum spanning tree'],
    },
    {
      id: 'dp-1d',
      title: 'Dynamic Programming (1D)',
      slug: 'dp-1d',
      category: 'Dynamic Programming',
      tier: 'Advanced',
      order: 12,
      prerequisites: ['recursion-backtracking'],
      keywords: ['dp', 'memoization', 'tabulation', '1d dp', 'fibonacci', 'climbing stairs', 'house robber'],
    },
    {
      id: 'dp-2d',
      title: 'Dynamic Programming (2D & Knapsack)',
      slug: 'dp-2d',
      category: 'Dynamic Programming',
      tier: 'Expert',
      order: 13,
      prerequisites: ['dp-1d'],
      keywords: ['2d dp', 'knapsack', 'lcs', 'longest common subsequence', 'edit distance', 'grid dp'],
    },
    {
      id: 'greedy-intervals',
      title: 'Greedy & Interval Scheduling',
      slug: 'greedy-intervals',
      category: 'Optimization',
      tier: 'Intermediate',
      order: 14,
      prerequisites: ['arrays-hashing', 'binary-search'],
      keywords: ['greedy', 'interval', 'merge intervals', 'non-overlapping', 'gas station', 'jump game'],
    },
  ];

  /**
   * Computes the complete, data-grounded Adaptive Roadmap State for an active user
   */
  public static computeRoadmap(userId = 'default_user'): AdaptiveRoadmapState {
    const isGuest = !userId || userId === 'default_user' || userId === 'guest';
    const allProblems = CurriculumRepository.getAllProblems();

    // Collect real user signals
    let attempts: any[] = [];
    let progressState: any = null;
    let weaknessData: any = null;
    let interviewHistory: any[] = [];
    let contestHistory: any[] = [];

    try {
      const canonicalAttempts = AdaptiveDataAdapterService.getCanonicalAttempts(userId) || [];
      const directPracticeAttempts = storage.get<any[]>(`dsa_practice_attempts_${userId}`) || [];
      const directSubmissions = storage.get<any[]>(`dsa_submissions_${userId}`) || [];
      attempts = [...canonicalAttempts, ...directPracticeAttempts, ...directSubmissions];

      const profile = AdaptiveDataAdapterService.getCanonicalProfile(userId);
      weaknessData = WeaknessAnalyzer.analyze(attempts, profile);
      progressState = progressService.getState(userId);
      interviewHistory = InterviewArenaService.getHistory(userId) || [];
      contestHistory = ContestArenaService.getUserHistory(userId) || [];
    } catch {
      // Safe fallback for isolated environments
    }

    const solvedProblemIds = new Set<string>();
    const failedProblemIds = new Set<string>();
    const problemAttemptsMap = new Map<string, any[]>();

    // Also seed solved problems from progressState
    if (progressState?.completed) {
      progressState.completed.forEach((num: number) => solvedProblemIds.add(String(num)));
    }
    if (progressState?.completedProblemIds) {
      progressState.completedProblemIds.forEach((pid: string) => solvedProblemIds.add(pid));
    }

    attempts.forEach((a) => {
      const pId = a.problemId || a.id;
      if (!pId) return;
      if (!problemAttemptsMap.has(pId)) problemAttemptsMap.set(pId, []);
      problemAttemptsMap.get(pId)!.push(a);

      const st = String(a.status || '').toLowerCase();
      const vd = String(a.verdict || '').toLowerCase();

      if (st === 'solved' || st === 'accepted' || vd === 'accepted') {
        solvedProblemIds.add(pId);
      } else if (
        st === 'failed' ||
        st === 'wrong_answer' ||
        st === 'time_limit_exceeded' ||
        st === 'compile_error' ||
        st === 'runtime_error' ||
        vd.includes('wrong') ||
        vd.includes('error') ||
        vd.includes('time limit')
      ) {
        failedProblemIds.add(pId);
      }
    });

    const hasAnyActivity =
      solvedProblemIds.size > 0 ||
      attempts.length > 0 ||
      contestHistory.length > 0 ||
      interviewHistory.length > 0;
    const isZeroState = !hasAnyActivity;

    // Build Roadmap Topic Nodes
    const topicNodesMap = new Map<string, RoadmapTopicNode>();

    this.CANONICAL_TOPICS.forEach((def) => {
      // Filter matching curriculum problems for this topic
      const topicProblems = allProblems.filter((p) => {
        const cat = (p.categoryTitle || p.categorySlug || '').toLowerCase();
        const pat = (p.patternId || '').toLowerCase();
        const title = (p.title || '').toLowerCase();
        return def.keywords.some((kw) => cat.includes(kw) || pat.includes(kw) || title.includes(kw));
      });

      const totalProblems = Math.max(topicProblems.length, 6);

      // Analyze user solves & attempts on this topic
      let easySolved = 0;
      let medSolved = 0;
      let hardSolved = 0;
      let topicAttemptsCount = 0;
      let topicFailsCount = 0;
      let lastActivityTimestamp: number | undefined;

      topicProblems.forEach((p) => {
        const isSolved =
          solvedProblemIds.has(p.id) ||
          (p.slug && solvedProblemIds.has(p.slug)) ||
          (p.leetcodeNumber !== undefined && solvedProblemIds.has(String(p.leetcodeNumber)));

        if (isSolved) {
          const diff = (p.difficulty || p.level || 'Medium').toLowerCase();
          if (diff === 'easy' || diff === 'learn') easySolved++;
          else if (diff === 'hard' || diff === 'master') hardSolved++;
          else medSolved++;
        }

        const pAttempts = [
          ...(problemAttemptsMap.get(p.id) || []),
          ...(p.slug ? problemAttemptsMap.get(p.slug) || [] : []),
          ...(p.leetcodeNumber !== undefined ? problemAttemptsMap.get(String(p.leetcodeNumber)) || [] : []),
        ];

        topicAttemptsCount += pAttempts.length;
        pAttempts.forEach((att) => {
          const st = String(att.status || '').toLowerCase();
          const vd = String(att.verdict || '').toLowerCase();
          if (
            st === 'failed' ||
            st === 'wrong_answer' ||
            st === 'time_limit_exceeded' ||
            st === 'compile_error' ||
            st === 'runtime_error' ||
            (vd && !vd.includes('accepted'))
          ) {
            topicFailsCount++;
          }
          if (att.timestamp) {
            const ts = new Date(att.timestamp).getTime();
            if (!lastActivityTimestamp || ts > lastActivityTimestamp) lastActivityTimestamp = ts;
          }
        });
      });

      const totalTopicSolved = easySolved + medSolved + hardSolved;
      const recentAccuracy = topicAttemptsCount > 0
        ? Math.min(100, Math.round((totalTopicSolved / Math.max(1, topicAttemptsCount)) * 100))
        : 0;

      // Cross-mode evidence: Interview & Contest matches
      let interviewSuccessCount = 0;
      let contestSolveCount = 0;
      let contestFailCount = 0;

      interviewHistory.forEach((ih) => {
        const breakdown = ih.problemBreakdown || [];
        breakdown.forEach((b: any) => {
          const tName = (b.pattern || b.categorySlug || '').toLowerCase();
          if (def.keywords.some((kw) => tName.includes(kw)) && (b.result === 'Passed' || b.verdict === 'Accepted')) {
            interviewSuccessCount++;
          }
        });
      });

      contestHistory.forEach((ch) => {
        const breakdown = ch.problemBreakdown || [];
        breakdown.forEach((b: any) => {
          const tName = (b.topic || '').toLowerCase();
          if (def.keywords.some((kw) => tName.includes(kw))) {
            if (b.status === 'solved') contestSolveCount++;
            else contestFailCount++;
          }
        });
      });

      // Revision retention score
      const revisionRetentionPercent = totalTopicSolved > 0
        ? Math.max(50, Math.min(95, 80 + totalTopicSolved * 3 - topicFailsCount * 4))
        : 0;

      const evidence: TopicEvidence = {
        practiceSolved: totalTopicSolved,
        practiceAttempted: topicAttemptsCount,
        easySolved,
        medSolved,
        hardSolved,
        recentAccuracyPercent: recentAccuracy,
        failedAttemptsCount: topicFailsCount,
        repeatedErrorPatterns: topicFailsCount > 2 ? ['Boundary conditions', 'Off-by-one errors'] : [],
        revisionRetentionPercent,
        revisionLastReviewedAt: lastActivityTimestamp ? new Date(lastActivityTimestamp).toISOString() : undefined,
        interviewSuccessCount,
        contestSolveCount,
        contestFailCount,
        lastActivityAt: lastActivityTimestamp ? new Date(lastActivityTimestamp).toISOString() : undefined,
      };

      // Deterministic Mastery Computation (0 for zero state)
      let masteryScore = 0;
      if (!isZeroState && (totalTopicSolved > 0 || topicAttemptsCount > 0)) {
        const weightedSolves = easySolved * 10 + medSolved * 20 + hardSolved * 30;
        const accuracyWeight = (recentAccuracy / 100) * 20;
        const retentionWeight = (revisionRetentionPercent / 100) * 15;
        const crossModeBonus = Math.min(15, (interviewSuccessCount * 5) + (contestSolveCount * 5));
        const failurePenalty = Math.min(25, topicFailsCount * 4 + contestFailCount * 5);

        masteryScore = Math.max(
          5,
          Math.min(100, Math.round(weightedSolves + accuracyWeight + retentionWeight + crossModeBonus - failurePenalty))
        );
      }

      // Recommend next problems
      const unsolvedProblems = topicProblems.filter((p) => !solvedProblemIds.has(p.id));
      const recommendedProblemIds = unsolvedProblems.slice(0, 3).map((p) => p.id);

      const node: RoadmapTopicNode = {
        id: def.id,
        title: def.title,
        slug: def.slug,
        category: def.category,
        tier: def.tier,
        order: def.order,
        prerequisites: def.prerequisites,
        dependentTopicIds: [], // Populated in second pass
        totalCurriculumProblems: totalProblems,
        status: 'NOT_STARTED',
        masteryScore,
        confidenceRating: masteryScore >= 85 ? 'Expert' : masteryScore >= 65 ? 'High' : masteryScore >= 35 ? 'Medium' : 'Low',
        statusReason: '',
        evidence,
        recommendedAction: 'LEARN',
        recommendedProblemIds,
      };

      topicNodesMap.set(def.id, node);
    });

    // Populate dependentTopicIds
    topicNodesMap.forEach((node) => {
      node.prerequisites.forEach((prereqId) => {
        const parent = topicNodesMap.get(prereqId);
        if (parent && !parent.dependentTopicIds.includes(node.id)) {
          parent.dependentTopicIds.push(node.id);
        }
      });
    });

    // Second Pass: Compute Status & Status Reason with Prerequisite Validation
    topicNodesMap.forEach((node) => {
      if (isZeroState) {
        if (node.order === 1) {
          node.status = 'NOT_STARTED';
          node.statusReason = 'Start your algorithmic journey here with fundamental array structures and hash lookups.';
          node.recommendedAction = 'LEARN';
        } else {
          node.status = 'BLOCKED';
          node.statusReason = `Locked until prerequisites (${node.prerequisites.map((p) => topicNodesMap.get(p)?.title).join(', ')}) are completed.`;
          node.recommendedAction = 'LEARN';
        }
        return;
      }

      // Check if all prerequisites are at least PRACTICING or STRONG
      const unfinishedPrereqs = node.prerequisites.filter((prereqId) => {
        const prereqNode = topicNodesMap.get(prereqId);
        return !prereqNode || (prereqNode.masteryScore < 40 && prereqNode.status !== 'STRONG' && prereqNode.status !== 'MASTERED');
      });

      const hasMissingPrereqs = unfinishedPrereqs.length > 0;
      const { evidence, masteryScore } = node;

      if (hasMissingPrereqs && evidence.practiceSolved === 0 && evidence.practiceAttempted === 0) {
        node.status = 'BLOCKED';
        const prereqTitles = unfinishedPrereqs.map((id) => topicNodesMap.get(id)?.title || id).join(', ');
        node.statusReason = `Recommended to complete prerequisite topics first: ${prereqTitles}.`;
        node.blockerReason = `Prerequisite foundation in ${prereqTitles} is needed before starting ${node.title}.`;
        node.unlockRequirement = `Attain at least 40% mastery in ${prereqTitles}.`;
        node.recommendedAction = 'LEARN';
      } else if (evidence.contestFailCount >= 2 || (evidence.failedAttemptsCount >= 3 && evidence.practiceSolved === 0)) {
        node.status = 'NEEDS_REVIEW';
        node.statusReason = `Recent contest or submission struggles detected (${evidence.failedAttemptsCount} failed attempts). Reinforce underlying pattern before advancing.`;
        node.recommendedAction = 'REVISE';
      } else if (masteryScore >= 85 && evidence.practiceSolved >= 4) {
        node.status = 'MASTERED';
        node.statusReason = `Exceptional fluency demonstrated with ${evidence.practiceSolved} solves across difficulties and solid retention.`;
        node.recommendedAction = 'CONTEST';
      } else if (masteryScore >= 65 && evidence.practiceSolved >= 3) {
        node.status = 'STRONG';
        node.statusReason = `Solid proficiency with ${evidence.practiceSolved} solved challenges. Ready for timed interview evaluation.`;
        node.recommendedAction = 'INTERVIEW';
      } else if (evidence.practiceSolved >= 1 || evidence.practiceAttempted >= 2) {
        node.status = 'PRACTICING';
        node.statusReason = `Active in-progress topic (${evidence.practiceSolved} solved, ${evidence.practiceAttempted} attempts). Keep practicing to solidify pattern recognition.`;
        node.recommendedAction = 'PRACTICE';
      } else if (evidence.practiceAttempted === 1) {
        node.status = 'LEARNING';
        node.statusReason = 'Initial attempt logged. Review core algorithmic mechanics and solve foundation problems.';
        node.recommendedAction = 'LEARN';
      } else {
        node.status = 'NOT_STARTED';
        node.statusReason = 'Prerequisites satisfied. Ready to begin fundamental pattern exploration.';
        node.recommendedAction = 'LEARN';
      }
    });

    const topics = Array.from(topicNodesMap.values()).sort((a, b) => a.order - b.order);

    // Group into 5 Roadmap Stages
    const stages = {
      completed: topics.filter((t) => t.status === 'MASTERED'),
      current: topics.filter((t) => t.status === 'PRACTICING' || t.status === 'LEARNING'),
      next: topics.filter((t) => t.status === 'STRONG' || t.status === 'NOT_STARTED'),
      upcoming: topics.filter((t) => t.status === 'BLOCKED'),
      needsAttention: topics.filter((t) => t.status === 'NEEDS_REVIEW'),
    };

    // Calculate overall average mastery
    const totalMastery = topics.reduce((acc, t) => acc + t.masteryScore, 0);
    const overallMasteryPercent = isZeroState ? 0 : Math.round(totalMastery / topics.length);

    // Determine Next-Best-Action
    let targetNode = stages.needsAttention[0] || stages.current[0] || stages.next[0] || topics[0];
    let nextActionType: NextActionType = targetNode.recommendedAction;
    let urgency: 'Immediate' | 'Recommended' | 'Optional' = targetNode.status === 'NEEDS_REVIEW' ? 'Immediate' : 'Recommended';
    let actionReason = targetNode.statusReason;
    let actionUrl = `/practice?area=${encodeURIComponent(targetNode.slug || targetNode.id)}`;

    if (nextActionType === 'INTERVIEW') {
      actionUrl = '/interview';
    } else if (nextActionType === 'CONTEST') {
      actionUrl = '/contest';
    } else if (nextActionType === 'REVISE') {
      actionUrl = '/revision';
    } else if (nextActionType === 'LEARN') {
      actionUrl = `/learn`;
    }

    const nextBestAction: NextBestAction = {
      actionType: nextActionType,
      targetTopicId: targetNode.id,
      targetTopicTitle: targetNode.title,
      reason: actionReason,
      urgency,
      recommendedProblemId: targetNode.recommendedProblemIds[0],
      recommendedDifficulty: targetNode.tier === 'Beginner' ? 'Easy' : targetNode.tier === 'Advanced' ? 'Hard' : 'Medium',
      estimatedMinutes: nextActionType === 'INTERVIEW' ? 45 : nextActionType === 'CONTEST' ? 30 : 20,
      actionUrl,
    };

    // Learning Momentum Calculation
    const streak = progressState?.currentStreak || 0;
    const velocityScore = isZeroState ? 0 : Math.min(100, Math.round(solvedProblemIds.size * 6 + streak * 8));

    const momentum: LearningMomentum = {
      velocityScore,
      activeDaysLast14d: isZeroState ? 0 : Math.min(14, Math.max(1, Math.floor(attempts.length / 2))),
      currentStreakDays: streak,
      recentSolvesCount: solvedProblemIds.size,
      crossModeParticipation: {
        practice: solvedProblemIds.size > 0,
        revision: hasAnyActivity && !isZeroState,
        interview: interviewHistory.length > 0,
        contest: contestHistory.length > 0,
      },
      trendDescription: isZeroState
        ? 'No learning activity recorded yet. Complete your first practice challenge to start tracking momentum.'
        : velocityScore >= 70
        ? 'High learning velocity with steady multi-mode practice.'
        : 'Moderate pace. Daily consistency will accelerate retention.',
    };

    // Detect Learning Blockers
    const blockers: LearningBlocker[] = [];
    topics.forEach((t) => {
      if (t.blockerReason && t.unlockRequirement) {
        blockers.push({
          id: `blocker_${t.id}`,
          topicId: t.id,
          topicTitle: t.title,
          blockerType: 'MISSING_PREREQUISITE',
          explanation: t.blockerReason,
          unlockAction: t.unlockRequirement,
          unlockUrl: `/practice?area=${encodeURIComponent(topicNodesMap.get(t.prerequisites[0])?.slug || topicNodesMap.get(t.prerequisites[0])?.id || 'basic-arrays')}`,
        });
      } else if (t.status === 'NEEDS_REVIEW') {
        blockers.push({
          id: `review_blocker_${t.id}`,
          topicId: t.id,
          topicTitle: t.title,
          blockerType: 'REPEATED_MISTAKE_PATTERN',
          explanation: `Struggles detected on ${t.title} (${t.evidence.failedAttemptsCount} failed attempts).`,
          unlockAction: 'Solve 2 foundational problems without hints or run a revision drill.',
          unlockUrl: `/practice?area=${encodeURIComponent(t.slug || t.id)}`,
        });
      }
    });

    // Generate Dynamic 7-Day Personalized Schedule
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const activeFocusTopics = topics.filter((t) => t.status !== 'BLOCKED' && t.status !== 'MASTERED');
    const primaryTopic = activeFocusTopics[0] || topics[0];
    const secondaryTopic = activeFocusTopics[1] || topics[1] || topics[0];

    const weeklyPlan: DailyScheduleItem[] = days.map((dayName, idx) => {
      const dayNum = idx + 1;
      let action: NextActionType = 'PRACTICE';
      let topic = primaryTopic;
      let estMins = 25;
      let diff: 'Easy' | 'Medium' | 'Hard' = 'Easy';
      let reason = `Targeted practice on ${topic.title}.`;
      let url = `/practice?area=${encodeURIComponent(topic.slug || topic.id)}`;

      if (dayNum === 1) {
        action = 'LEARN';
        topic = primaryTopic;
        diff = 'Easy';
        reason = `Study core concepts and code templates for ${topic.title}.`;
        url = `/learn`;
      } else if (dayNum === 2) {
        action = 'PRACTICE';
        topic = primaryTopic;
        diff = 'Easy';
        reason = `Solve 2 foundational exercises for ${topic.title}.`;
      } else if (dayNum === 3) {
        action = 'PRACTICE';
        topic = primaryTopic;
        diff = 'Medium';
        reason = `Tackle standard medium patterns on ${topic.title}.`;
      } else if (dayNum === 4) {
        action = 'REVISE';
        topic = primaryTopic;
        estMins = 15;
        reason = `Spaced repetition flashcards & formula drill for ${topic.title}.`;
        url = '/revision';
      } else if (dayNum === 5) {
        action = 'PRACTICE';
        topic = secondaryTopic;
        diff = 'Medium';
        reason = `Cross-train on ${secondaryTopic.title}.`;
        url = `/practice?area=${encodeURIComponent(secondaryTopic.slug || secondaryTopic.id)}`;
      } else if (dayNum === 6) {
        action = 'INTERVIEW';
        topic = primaryTopic;
        estMins = 45;
        diff = 'Medium';
        reason = `Timed 45-min mock interview evaluating ${primaryTopic.title} fluency.`;
        url = '/interview';
      } else {
        action = 'CONTEST';
        topic = primaryTopic;
        estMins = 30;
        diff = 'Medium';
        reason = `Participate in the Weekly Sprint tournament.`;
        url = '/contest';
      }

      return {
        dayIndex: dayNum,
        dayName,
        actionType: action,
        topicId: topic.id,
        topicTitle: topic.title,
        targetDifficulty: diff,
        estimatedMinutes: estMins,
        reason,
        actionUrl: url,
        isCompleted: false,
      };
    });

    return {
      userId,
      updatedAt: new Date().toISOString(),
      overallMasteryPercent,
      totalTopics: topics.length,
      masteredCount: stages.completed.length,
      strongCount: topics.filter((t) => t.status === 'STRONG').length,
      practicingCount: stages.current.length,
      learningCount: topics.filter((t) => t.status === 'LEARNING').length,
      needsReviewCount: stages.needsAttention.length,
      notStartedCount: topics.filter((t) => t.status === 'NOT_STARTED').length,
      blockedCount: stages.upcoming.length,
      topics,
      stages,
      nextBestAction,
      momentum,
      blockers: blockers.slice(0, 3),
      weeklyPlan,
      isZeroState,
      onboardingPrior: (() => {
        try {
          const onboarding = OnboardingService.getProfile(userId);
          if (onboarding.status === 'ONBOARDING_COMPLETED' || onboarding.status === 'ONBOARDING_SKIPPED') {
            return {
              status: onboarding.status,
              assessmentScore: onboarding.assessmentScore,
              baselineEvidence: [...onboarding.assessmentEvidence],
              isBaselineOnly: isZeroState,
            };
          }
        } catch {
          // safe fallback
        }
        return undefined;
      })(),
    };
  }
}

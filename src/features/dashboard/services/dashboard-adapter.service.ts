/**
 * Dashboard Data Adapter Service (Phase 5A)
 * Converts canonical progress state, activity log, memory engine SRS, and Oracle AI insights
 * into a dynamic DashboardSummary consumed by CommandCenterView.
 */

import { progressService, ProgressService } from '@/src/services/progress/progress.service';
import { Container } from '@/src/core/container/container';
import { MemoryEngine } from '@/src/intelligence/memory/engine/memory.engine';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { AdaptiveDataAdapterService } from '@/src/features/adaptive/services/adaptive-data-adapter.service';
import { AdaptiveRecommendationService, PracticeRecommendation } from '@/src/features/adaptive/services/adaptive-recommendation.service';
import { WeaknessAnalyzer } from '@/src/intelligence/analyzers/weakness.analyzer';
import { StrengthAnalyzer } from '@/src/intelligence/analyzers/strength.analyzer';
import { EventBus } from '@/src/core/events/event-bus';

export interface KingdomProgression {
  slug: string;
  title: string;
  solvedCount: number;
  totalCount: number;
  percentage: number;
}

export interface PlatformTrainNode {
  id: string;
  number: number;
  title: string;
  solvedCount: number;
  totalCount: number;
  isCompleted: boolean;
  isCurrent: boolean;
  slug: string;
  url: string;
}

export interface PlatformTrainJourney {
  platformKey: 'leetcode' | 'codechef' | 'codeforces';
  name: string;
  tagline: string;
  subtitle: string;
  color: string;
  currentStationTitle: string;
  currentStationIndex: number;
  totalStations: number;
  solvedProblems: number;
  totalProblems: number;
  nodes: PlatformTrainNode[];
}

export interface TodaysMission {
  learn: {
    title: string;
    topic: string;
    url: string;
    statusText: string;
  };
  practice: {
    solvedToday: number;
    dailyGoal: number;
    targetTopic: string;
    url: string;
    isCompleted: boolean;
  };
  revise: {
    dueCount: number;
    urgentTopic?: string;
    url: string;
    hasDueItems: boolean;
  };
  mentor: {
    insight: string;
    recommendedTopic: string;
    url: string;
  };
}

export interface RoadmapTopicStatus {
  slug: string;
  title: string;
  solved: number;
  total: number;
  percentage: number;
  accuracy: number;
  status: 'mastered' | 'strong' | 'learning' | 'weak' | 'upcoming';
  url: string;
}

export interface AdaptiveRoadmapState {
  masteredTopics: RoadmapTopicStatus[];
  strongTopics: RoadmapTopicStatus[];
  learningTopics: RoadmapTopicStatus[];
  weakTopics: RoadmapTopicStatus[];
  upcomingTopics: RoadmapTopicStatus[];
  nextBestTopic: {
    slug: string;
    title: string;
    reason: string;
    estimatedMinutes: number;
    url: string;
  };
}

export interface MistakePattern {
  id: string;
  topic: string;
  pattern: string;
  failureCount: number;
  failureType: 'Wrong Answer' | 'Time Limit' | 'Runtime Error' | 'Compilation' | 'Decay';
  observation: string;
  remedy: string;
  practiceUrl: string;
  severity: 'high' | 'medium' | 'low';
}

export interface MistakeIntelligenceState {
  hasData: boolean;
  totalMistakesAnalyzed: number;
  commonPatterns: MistakePattern[];
  summaryNote: string;
}

export interface PrimaryRecommendation {
  problemId: string;
  title: string;
  topic: string;
  difficulty: string;
  reason: string;
  actionLabel: string;
  url: string;
  xp: number;
  estimatedMinutes: number;
}

export interface DashboardSummary {
  playerHud: {
    totalXp: number;
    level: number;
    currentLevelXp: number;
    nextLevelXp: number;
    levelPct: number;
    currentStreak: number;
    solvedCount: number;
  };

  dailyQuest: {
    targetTitle: string;
    currentSolves: number;
    targetSolves: number;
    percentage: number;
    recommendedFocus: string;
  };

  srsMemory: {
    conceptsTracked: number;
    revisionDueCount: number;
    atRiskCount: number;
    memoryHealthScore: number;
    retentionRateText: string;
  };

  oracleInsights: {
    topStrength: string;
    primaryWeakness: string;
    recommendedFocus: string;
    summaryReasoning: string;
    confidenceScore: number | string;
  };

  kingdomProgression: KingdomProgression[];
  platformTrains: PlatformTrainJourney[];

  todaysMission: TodaysMission;
  adaptiveRoadmap: AdaptiveRoadmapState;
  mistakeIntelligence: MistakeIntelligenceState;
  primaryRecommendation: PrimaryRecommendation;

  continueLearning: {
    platformName: string;
    platformTagline: string;
    platformColor: string;
    kingdomTitle: string;
    kingdomSlug: string;
    solvedCount: number;
    totalCount: number;
    percentage: number;
    nextPattern: string;
    estimatedTime: string;
    url: string;
  };

  todayFocus: {
    targetTitle: string;
    currentSolves: number;
    targetSolves: number;
    percentage: number;
    recommendedTopic: string;
    estimatedMinutes: number;
    reason: string;
    url: string;
  };

  performanceInsights: {
    topStrength: string;
    primaryWeakness: string;
    solvedCount: number;
    currentStreak: number;
    topicPerformance: Array<{ topic: string; percentage: number; solved: number; total: number }>;
  };

  needsRevision: {
    hasRevisionData: boolean;
    items: Array<{ topic: string; patternCount: number; status: string; url: string }>;
  };

  weeklyProgress: {
    weeklyProblems: number;
    weeklyTarget: number;
    weeklyPercentage: number;
    weeklyXp: number;
    practiceDays: number;
    currentStreak: number;
    trendText: string;
  };

  platformSnapshot: Array<{
    platformKey: 'leetcode' | 'codechef' | 'codeforces';
    name: string;
    color: string;
    solved: number;
    total: number;
    percentage: number;
    currentCampaign: string;
    url: string;
  }>;

  recentActivity: Array<{
    id: string;
    title: string;
    platform: string;
    platformColor: string;
    action: string;
    xpEarned: number;
    timeAgo: string;
    groupLabel: 'Today' | 'Yesterday' | 'Earlier';
    exactTime: string;
    problemUrl?: string;
    timestamp: string;
  }>;

  recommendations: PracticeRecommendation[];
}

export class DashboardAdapterService {
  private static cache: Map<string, DashboardSummary> = new Map();
  private static subscribedToEvents = false;

  private static get memoryEngine(): MemoryEngine {
    if (!Container.has('MemoryEngine')) {
      Container.registerSingleton('MemoryEngine', new MemoryEngine());
    }
    return Container.resolve<MemoryEngine>('MemoryEngine');
  }

  public static ensureSubscribed(): void {
    if (!this.subscribedToEvents) {
      EventBus.subscribe('ProblemSolved', () => {
        this.clearCache();
      });
      EventBus.subscribe('MemoryReviewed', () => {
        this.clearCache();
      });
      EventBus.subscribe('ProfileUpdated', () => {
        this.clearCache();
      });
      EventBus.subscribe('PlatformSynced', () => {
        this.clearCache();
      });
      this.subscribedToEvents = true;
    }
  }

  public static clearCache(): void {
    this.cache.clear();
  }

  public static getDashboardSummary(userId = 'default_user'): DashboardSummary {
    this.ensureSubscribed();

    if (this.cache.has(userId)) {
      return this.cache.get(userId)!;
    }

    const state = progressService.getState(userId);
    const logs = progressService.getActivityLog(userId);

    // 1. Player HUD Metrics
    const totalXp = state.xp || 0;
    const level = ProgressService.calculateLevel(totalXp);
    const currentLevelXp = totalXp % 500;
    const nextLevelXp = 500;
    const levelPct = Math.min(100, Math.round((currentLevelXp / nextLevelXp) * 100));

    const canonicalSolvedSet = new Set<string>([
      ...state.completed.map((n) => `leetcode:${n}`),
      ...(state.completedProblemIds || []),
    ]);
    const solvedCount = canonicalSolvedSet.size;
    const currentStreak = state.currentStreak || 0;

    // 2. Daily Quest & Focus
    const targetSolves = state.dailyGoal || 3;
    const todayStr = new Date().toISOString().split('T')[0];
    const todaySolvesCount = logs.filter((l) => l.action === 'solve' && l.timestamp.startsWith(todayStr)).length;
    const currentSolves = Math.min(targetSolves, todaySolvesCount);
    const questPct = Math.min(100, Math.round((currentSolves / targetSolves) * 100));

    const recommendations = AdaptiveRecommendationService.getRecommendedPracticeProblems(userId, 'all', 4);
    const recommendedFocus = recommendations[0]?.topic || 'Foundational Practice';

    // 3. SRS Memory Health
    const concepts = this.memoryEngine.getAllConcepts(userId);
    const revisionQueue = this.memoryEngine.getRevisionQueue(userId);
    const health = this.memoryEngine.getMemoryHealth(userId);

    const conceptsTracked = concepts.length;
    const revisionDueCount = revisionQueue.length;
    const atRiskCount = health.conceptsAtRiskCount || 0;
    const memoryHealthScore = conceptsTracked > 0 ? Math.round(health.overallMemoryScore || 0) : 0;
    const retentionRateText =
      conceptsTracked > 0
        ? `${Math.round(concepts.reduce((a, c) => a + c.retentionRate, 0) / conceptsTracked)}%`
        : 'N/A';

    // 4. Oracle Insights
    const attempts = AdaptiveDataAdapterService.getCanonicalAttempts(userId);
    const profile = AdaptiveDataAdapterService.getCanonicalProfile(userId);
    const weakness = WeaknessAnalyzer.analyze(attempts, profile);
    const strength = StrengthAnalyzer.analyze(attempts, profile);

    let topStrength = 'No activity yet';
    let primaryWeakness = 'No weakness detected yet';
    let summaryReasoning = 'Complete your first practice problem to unlock AI telemetry.';
    let confidenceScore: number | string = 'Unrated';

    if (solvedCount > 0) {
      topStrength = strength.masteredTopics[0]?.topic || 'Arrays & Hashing';
      primaryWeakness = weakness.weakTopics[0]?.topic || 'Dynamic Programming';
      summaryReasoning = weakness.primaryWeaknessSummary || 'Practice recommended to repair skill gaps.';
      confidenceScore = 85;
    }

    // 5. Kingdom / Category Progression
    const categories = CurriculumRepository.getAllCategories();
    const kingdomProgression: KingdomProgression[] = categories.map((cat) => {
      const catProblems = CurriculumRepository.filterProblems({ categorySlug: cat.slug }, []);
      let catSolved = 0;
      catProblems.forEach((p) => {
        if (canonicalSolvedSet.has(p.id) || (p.leetcodeNumber && state.completed.includes(p.leetcodeNumber))) {
          catSolved++;
        }
      });

      const totalCount = catProblems.length;
      const percentage = totalCount > 0 ? Math.round((catSolved / totalCount) * 100) : 0;

      return {
        slug: cat.slug,
        title: cat.kingdomTitle,
        solvedCount: catSolved,
        totalCount,
        percentage,
      };
    });

    // 6. Multi-Platform Train Journeys (LeetCode, CodeChef, Codeforces)
    const allProblems = CurriculumRepository.getAllProblems();

    const isProblemSolved = (p: any): boolean => {
      if (typeof p.leetcodeNumber === 'number' && state.completed.includes(p.leetcodeNumber)) return true;
      if (canonicalSolvedSet.has(p.id) || canonicalSolvedSet.has(String(p.leetcodeNumber))) return true;
      const platform = p.url?.includes('codechef.com') ? 'codechef' : p.url?.includes('codeforces.com') ? 'codeforces' : 'leetcode';
      return canonicalSolvedSet.has(`${platform}:${p.id}`) || canonicalSolvedSet.has(`${platform}:${p.leetcodeNumber}`);
    };

    // A. LeetCode Train (25 Kingdoms)
    const lcProblems = allProblems.filter(p => !p.url?.includes('codechef.com') && !p.url?.includes('codeforces.com') && !p.url?.includes('geeksforgeeks.org'));
    let lcTotalSolved = 0;
    let lcCurrentIdx = 0;
    let lcFoundCurrent = false;

    const lcNodes: PlatformTrainNode[] = categories.map((cat, idx) => {
      const catProblems = lcProblems.filter(p => p.categorySlug === cat.slug || p.categoryId === cat.id || p.categoryTitle === cat.title);
      const solved = catProblems.filter(p => isProblemSolved(p)).length;
      const total = catProblems.length;
      lcTotalSolved += solved;
      const isCompleted = total > 0 && solved >= total;

      if (!isCompleted && !lcFoundCurrent) {
        lcCurrentIdx = idx;
        lcFoundCurrent = true;
      }

      return {
        id: `lc-station-${cat.slug}`,
        number: idx + 1,
        title: cat.kingdomTitle || cat.title,
        solvedCount: solved,
        totalCount: total,
        isCompleted,
        isCurrent: false,
        slug: cat.slug,
        url: `/practice/${cat.slug}`,
      };
    });
    if (lcNodes[lcCurrentIdx]) {
      lcNodes[lcCurrentIdx].isCurrent = true;
    }

    // B. CodeChef Train (25 Kingdoms)
    const ccProblems = allProblems.filter(p => p.url?.includes('codechef.com'));
    let ccTotalSolved = 0;
    let ccCurrentIdx = 0;
    let ccFoundCurrent = false;

    const ccNodes: PlatformTrainNode[] = categories.map((cat, idx) => {
      const catProblems = ccProblems.filter(p => p.categorySlug === cat.slug || p.categoryId === cat.id || p.categoryTitle === cat.title || p.kingdomTitle === cat.kingdomTitle);
      const solved = catProblems.filter(p => isProblemSolved(p)).length;
      const total = catProblems.length;
      ccTotalSolved += solved;
      const isCompleted = total > 0 && solved >= total;

      if (!isCompleted && !ccFoundCurrent) {
        ccCurrentIdx = idx;
        ccFoundCurrent = true;
      }

      return {
        id: `cc-station-${cat.slug}`,
        number: idx + 1,
        title: cat.kingdomTitle || cat.title,
        solvedCount: solved,
        totalCount: total,
        isCompleted,
        isCurrent: false,
        slug: cat.slug,
        url: `/practice/codechef`,
      };
    });
    if (ccNodes[ccCurrentIdx]) {
      ccNodes[ccCurrentIdx].isCurrent = true;
    }

    // C. Codeforces Train (4 Divisions)
    const cfProblems = allProblems.filter(p => p.url?.includes('codeforces.com'));
    const cfDivisions = [
      { id: 'div-4', number: 1, title: 'Division 4 (800–1100)', filter: (p: any) => p.level === 'Learn' || p.xp <= 15 },
      { id: 'div-3', number: 2, title: 'Division 3 (1200–1400)', filter: (p: any) => p.level === 'Practice' || (p.xp > 15 && p.xp <= 25) },
      { id: 'div-2', number: 3, title: 'Division 2 (1500–1800)', filter: (p: any) => p.level === 'Master' || (p.xp > 25 && p.xp <= 40) },
      { id: 'div-1', number: 4, title: 'Division 1 (1900+)', filter: (p: any) => p.xp > 40 },
    ];

    let cfTotalSolved = 0;
    let cfCurrentIdx = 0;
    let cfFoundCurrent = false;

    const cfNodes: PlatformTrainNode[] = cfDivisions.map((div, idx) => {
      const divProblems = cfProblems.filter(p => div.filter(p));
      const solved = divProblems.filter(p => isProblemSolved(p)).length;
      const total = divProblems.length;
      cfTotalSolved += solved;
      const isCompleted = total > 0 && solved >= total;

      if (!isCompleted && !cfFoundCurrent) {
        cfCurrentIdx = idx;
        cfFoundCurrent = true;
      }

      return {
        id: `cf-station-${div.id}`,
        number: idx + 1,
        title: div.title,
        solvedCount: solved,
        totalCount: total,
        isCompleted,
        isCurrent: false,
        slug: div.id,
        url: `/practice?platform=codeforces`,
      };
    });
    if (cfNodes[cfCurrentIdx]) {
      cfNodes[cfCurrentIdx].isCurrent = true;
    }

    const platformTrains: PlatformTrainJourney[] = [
      {
        platformKey: 'leetcode',
        name: 'LEETCODE',
        tagline: 'Learning Express',
        subtitle: 'Progress through your LeetCode kingdoms',
        color: '#10B981',
        currentStationTitle: lcNodes[lcCurrentIdx]?.title || 'Kingdom 1',
        currentStationIndex: lcCurrentIdx + 1,
        totalStations: lcNodes.length,
        solvedProblems: lcTotalSolved,
        totalProblems: lcProblems.length,
        nodes: lcNodes,
      },
      {
        platformKey: 'codechef',
        name: 'CODECHEF',
        tagline: 'Coding Express',
        subtitle: 'Progress through your CodeChef kingdoms',
        color: '#F97316',
        currentStationTitle: ccNodes[ccCurrentIdx]?.title || 'Kingdom 1',
        currentStationIndex: ccCurrentIdx + 1,
        totalStations: ccNodes.length,
        solvedProblems: ccTotalSolved,
        totalProblems: ccProblems.length,
        nodes: ccNodes,
      },
      {
        platformKey: 'codeforces',
        name: 'CODEFORCES',
        tagline: 'Contest Express',
        subtitle: 'Progress through your Codeforces divisions',
        color: '#3B82F6',
        currentStationTitle: cfNodes[cfCurrentIdx]?.title || 'Division 4',
        currentStationIndex: cfCurrentIdx + 1,
        totalStations: cfNodes.length,
        solvedProblems: cfTotalSolved,
        totalProblems: cfProblems.length,
        nodes: cfNodes,
      },
    ];

    // 7. CONTINUE LEARNING (Dynamic based on most recent activity & progress)
    const lastActivePlatform = logs[logs.length - 1]?.platform?.toLowerCase() || '';
    let selectedTrain = platformTrains[0]; // default LeetCode
    if (lastActivePlatform.includes('codechef')) {
      selectedTrain = platformTrains[1];
    } else if (lastActivePlatform.includes('codeforces')) {
      selectedTrain = platformTrains[2];
    }

    const activeNode = selectedTrain.nodes[selectedTrain.currentStationIndex - 1] || selectedTrain.nodes[0] || {
      title: 'Kingdom of Beginnings',
      slug: 'beginnings',
      solvedCount: 0,
      totalCount: 30,
      percentage: 0,
      url: '/practice',
    };

    // Lookup next unsolved problem in this category to get real pattern and difficulty
    const categoryProblems = allProblems.filter(
      p => p.categorySlug === activeNode.slug || p.categoryId === activeNode.slug || p.categoryTitle === activeNode.title
    );
    const nextUnsolved = categoryProblems.find(p => !isProblemSolved(p));
    const nextPatternTitle = nextUnsolved?.patternId || nextUnsolved?.title || recommendedFocus || 'Foundational Pattern';
    const estimatedMins = nextUnsolved?.level === 'Master' ? '35–45 min' : nextUnsolved?.level === 'Practice' ? '25–30 min' : '15–20 min';

    const continueLearning = {
      platformName: selectedTrain.name === 'LEETCODE' ? 'LeetCode' : selectedTrain.name === 'CODECHEF' ? 'CodeChef' : 'Codeforces',
      platformTagline: selectedTrain.tagline,
      platformColor: selectedTrain.color,
      kingdomTitle: activeNode.title,
      kingdomSlug: activeNode.slug,
      solvedCount: activeNode.solvedCount,
      totalCount: activeNode.totalCount,
      percentage: activeNode.totalCount > 0 ? Math.round((activeNode.solvedCount / activeNode.totalCount) * 100) : 0,
      nextPattern: nextPatternTitle,
      estimatedTime: estimatedMins,
      url: activeNode.url,
    };

    // 8. TODAY'S FOCUS (Dynamic, Weakness & Goal-Driven)
    const isBaseline = solvedCount === 0;
    const focusTopic = weakness.weakTopics[0]?.topic || recommendations[0]?.topic || (solvedCount > 0 ? 'Core Algorithms' : 'Foundational Practice');
    const todayFocus = {
      targetTitle: isBaseline ? 'Build your baseline' : `Solve ${targetSolves} ${focusTopic} problems`,
      currentSolves,
      targetSolves,
      percentage: questPct,
      recommendedTopic: focusTopic,
      estimatedMinutes: targetSolves * 15,
      reason: isBaseline
        ? 'Solve your first few problems to unlock personalized recommendations.'
        : weakness.weakTopics[0]
        ? `Your accuracy in ${focusTopic} is currently below your other active topics.`
        : 'Continue reinforcing core pattern mastery.',
      url: `/practice`,
    };

    // 9. PERFORMANCE INSIGHTS (100% Calculated Performance)
    const dsaCategories = [
      { name: 'Arrays & Hashing', slug: 'arrays-hashing' },
      { name: 'Two Pointers & Sliding Window', slug: 'two-pointers' },
      { name: 'Trees & Graphs', slug: 'trees' },
      { name: 'Dynamic Programming', slug: 'dynamic-programming' },
    ];

    const topicPerformance = dsaCategories.map(cat => {
      const catProblems = allProblems.filter(p => p.categorySlug === cat.slug || p.categoryId === cat.slug || p.categoryTitle?.toLowerCase().includes(cat.name.toLowerCase()));
      const solved = catProblems.filter(p => isProblemSolved(p)).length;
      const total = Math.max(1, catProblems.length);
      const percentage = Math.round((solved / total) * 100);
      return {
        topic: cat.name,
        solved,
        total,
        percentage,
      };
    });

    const performanceInsights = {
      topStrength: solvedCount > 0 ? topStrength : 'Building Profile',
      primaryWeakness: solvedCount > 0 ? primaryWeakness : 'Building Profile',
      solvedCount,
      currentStreak,
      topicPerformance,
    };

    // 10. NEEDS REVISION (Real SRS Concept Queue)
    const revisionItems = revisionQueue.slice(0, 4).map(c => ({
      topic: c.topic || c.pattern || c.conceptId || 'Key Pattern',
      patternCount: Math.max(1, c.forgettingRisk > 50 ? 2 : 1),
      status: c.priority === 'Critical' ? 'Critical' : 'Due for Review',
      url: '/revision',
    }));

    const needsRevision = {
      hasRevisionData: revisionQueue.length > 0 || conceptsTracked > 0,
      items: revisionItems,
    };

    // 11. WEEKLY PROGRESS (Real Activity aggregation in last 7 days vs previous 7 days)
    const now = Date.now();
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
    const fourteenDaysAgo = now - 14 * 24 * 60 * 60 * 1000;

    const recentWeeklyLogs = logs.filter(l => {
      const t = new Date(l.timestamp).getTime();
      return !isNaN(t) && t >= sevenDaysAgo;
    });

    const previousWeeklyLogs = logs.filter(l => {
      const t = new Date(l.timestamp).getTime();
      return !isNaN(t) && t >= fourteenDaysAgo && t < sevenDaysAgo;
    });

    const weeklyProblems = recentWeeklyLogs.filter(l => l.action === 'solve' || l.action === 'solved').length;
    const previousWeeklyProblems = previousWeeklyLogs.filter(l => l.action === 'solve' || l.action === 'solved').length;
    const weeklyTarget = state.dailyGoal ? state.dailyGoal * 5 : 15;
    const weeklyPercentage = Math.min(100, Math.round((weeklyProblems / weeklyTarget) * 100));
    const weeklyXp = recentWeeklyLogs.reduce((acc, l) => acc + (l.xpEarned || 0), 0);
    const uniqueDays = new Set(recentWeeklyLogs.map(l => l.timestamp.split('T')[0]));
    const practiceDays = uniqueDays.size;

    let trendText = 'Building baseline';
    if (previousWeeklyProblems > 0) {
      const diff = Math.round(((weeklyProblems - previousWeeklyProblems) / previousWeeklyProblems) * 100);
      trendText = diff >= 0 ? `↑ ${diff}% vs prev week` : `↓ ${Math.abs(diff)}% vs prev week`;
    } else if (weeklyProblems > 0) {
      trendText = '↑ Active this week';
    }

    const weeklyProgress = {
      weeklyProblems,
      weeklyTarget,
      weeklyPercentage,
      weeklyXp,
      practiceDays,
      currentStreak,
      trendText,
    };

    // 12. PLATFORM SNAPSHOT (Direct Canonical Problem Counts)
    const platformSnapshot = [
      {
        platformKey: 'leetcode' as const,
        name: 'LeetCode',
        color: '#10B981',
        solved: lcTotalSolved,
        total: lcProblems.length,
        percentage: lcProblems.length > 0 ? Math.round((lcTotalSolved / lcProblems.length) * 100) : 0,
        currentCampaign: lcNodes[lcCurrentIdx]?.title || 'Kingdom of Beginnings',
        url: '/practice',
      },
      {
        platformKey: 'codechef' as const,
        name: 'CodeChef',
        color: '#F97316',
        solved: ccTotalSolved,
        total: ccProblems.length,
        percentage: ccProblems.length > 0 ? Math.round((ccTotalSolved / ccProblems.length) * 100) : 0,
        currentCampaign: ccNodes[ccCurrentIdx]?.title || 'Kingdom of Beginnings',
        url: '/practice/codechef',
      },
      {
        platformKey: 'codeforces' as const,
        name: 'Codeforces',
        color: '#3B82F6',
        solved: cfTotalSolved,
        total: cfProblems.length,
        percentage: cfProblems.length > 0 ? Math.round((cfTotalSolved / cfProblems.length) * 100) : 0,
        currentCampaign: cfNodes[cfCurrentIdx]?.title || 'Division 4',
        url: '/practice?platform=codeforces',
      },
    ];

    // 13. RECENT ACTIVITY (Hardened, Deduplicated Coding History Timeline)
    const formatTimeAgo = (ts: string): string => {
      const diff = Date.now() - new Date(ts).getTime();
      if (isNaN(diff) || diff < 0) return 'Recently';
      const mins = Math.floor(diff / (1000 * 60));
      if (mins < 1) return 'Just now';
      if (mins < 60) return `${mins}m ago`;
      const hours = Math.floor(mins / 60);
      if (hours < 24) return `${hours}h ago`;
      const days = Math.floor(hours / 24);
      if (days === 1) return 'Yesterday';
      return `${days}d ago`;
    };

    const getGroupLabel = (ts: string): 'Today' | 'Yesterday' | 'Earlier' => {
      const eventDate = new Date(ts);
      if (isNaN(eventDate.getTime())) return 'Today';
      const today = new Date();
      const isToday =
        eventDate.getDate() === today.getDate() &&
        eventDate.getMonth() === today.getMonth() &&
        eventDate.getFullYear() === today.getFullYear();
      if (isToday) return 'Today';

      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      const isYesterday =
        eventDate.getDate() === yesterday.getDate() &&
        eventDate.getMonth() === yesterday.getMonth() &&
        eventDate.getFullYear() === yesterday.getFullYear();
      if (isYesterday) return 'Yesterday';

      return 'Earlier';
    };

    // Robust problem resolver to eliminate raw internal IDs
    const resolveProblem = (rawId: string) => {
      if (!rawId) return undefined;
      const stripped = rawId.replace(/^(leetcode|codechef|codeforces|geeksforgeeks):/, '');
      const num = parseInt(stripped.replace(/\D/g, ''), 10);
      return allProblems.find(
        p =>
          p.id === rawId ||
          p.id === stripped ||
          (p.leetcodeNumber && p.leetcodeNumber === num) ||
          (p.title && (p.title.toLowerCase() === rawId.toLowerCase() || p.title.toLowerCase() === stripped.toLowerCase()))
      );
    };

    // Normalize & Deduplicate logs (process newest to oldest)
    const seenActionKeys = new Set<string>();
    const deduplicatedLogs: typeof logs = [];

    for (let i = logs.length - 1; i >= 0; i--) {
      const log = logs[i];
      if (!log || (!log.problemId && !log.topic)) continue;
      // Filter out internal telemetry/sync noise
      if (log.action === 'sync' || log.action === 'telemetry' || log.action === 'cache') continue;

      const prob = resolveProblem(log.problemId || '');
      const normalizedProbId = prob ? prob.id : (log.problemId || log.topic);
      const actionType = log.action === 'unsolve' || log.action === 'unsolved' ? 'unsolve' : (log.action === 'review' || log.action === 'reviewed') ? 'review' : 'solve';

      const key = `${normalizedProbId}_${actionType}`;
      if (!seenActionKeys.has(key)) {
        seenActionKeys.add(key);
        deduplicatedLogs.push(log);
      }
    }

    const recentActivity = deduplicatedLogs.slice(0, 8).map((l, idx) => {
      const matchedProb = resolveProblem(l.problemId || '');
      const title = matchedProb ? matchedProb.title : (l.topic || `Problem #${l.problemId || idx + 1}`);
      const rawPlatform = l.platform || (matchedProb?.url?.includes('codechef') ? 'codechef' : matchedProb?.url?.includes('codeforces') ? 'codeforces' : matchedProb?.url?.includes('geeksforgeeks') ? 'geeksforgeeks' : 'leetcode');
      const platform = rawPlatform.includes('codechef') ? 'CodeChef' : rawPlatform.includes('codeforces') ? 'Codeforces' : rawPlatform.includes('geeksforgeeks') ? 'GeeksForGeeks' : 'LeetCode';
      const platformColor = platform === 'CodeChef' ? '#F97316' : platform === 'Codeforces' ? '#3B82F6' : platform === 'GeeksForGeeks' ? '#64748B' : '#10B981';

      const isCurrentlySolved = matchedProb ? isProblemSolved(matchedProb) : canonicalSolvedSet.has(l.problemId);

      let action = 'Solved';
      if (l.action === 'unsolve' || l.action === 'unsolved' || l.action === 'reopen') {
        action = 'Marked Unsolved';
      } else if (l.action === 'review' || l.action === 'reviewed') {
        action = 'Reviewed';
      } else if (l.action === 'practice' || l.action === 'practiced') {
        action = isCurrentlySolved ? 'Solved' : 'Practiced';
      } else if (l.action === 'contest') {
        action = 'Contest';
      } else if (!isCurrentlySolved && (l.action === 'solve' || l.action === 'solved')) {
        action = 'Marked Unsolved';
      }

      return {
        id: l.id || `act-${idx}`,
        title,
        platform,
        platformColor,
        action,
        xpEarned: action === 'Solved' ? (l.xpEarned || 10) : 0,
        timeAgo: formatTimeAgo(l.timestamp),
        groupLabel: getGroupLabel(l.timestamp),
        exactTime: new Date(l.timestamp).toLocaleString(),
        problemUrl: matchedProb ? `/practice?problem=${matchedProb.id}` : '/practice',
        timestamp: l.timestamp,
      };
    });

    // 14. ADAPTIVE ROADMAP (Categorization: Mastered, Strong, Learning, Weak, Upcoming)
    const masteredTopics: RoadmapTopicStatus[] = [];
    const strongTopics: RoadmapTopicStatus[] = [];
    const learningTopics: RoadmapTopicStatus[] = [];
    const weakTopics: RoadmapTopicStatus[] = [];
    const upcomingTopics: RoadmapTopicStatus[] = [];
    // Reuse existing attempts and categories already declared above
    categories.forEach((cat) => {
      const catProblems = allProblems.filter(
        (p) => p.categorySlug === cat.slug || p.categoryId === cat.id || p.categoryTitle === cat.title
      );
      const solved = catProblems.filter((p) => isProblemSolved(p)).length;
      const total = Math.max(1, catProblems.length);
      const percentage = Math.round((solved / total) * 100);

      const catAttempts = attempts.filter(
        (a) => a.topic === cat.title || a.topic === cat.slug || (a.topic && a.topic.toLowerCase().includes(cat.title.toLowerCase()))
      );
      const accuracy = catAttempts.length > 0
        ? catAttempts.filter((a) => a.status === 'accepted').length / catAttempts.length
        : (solved > 0 ? 0.85 : 0);

      const isWeak = weakness.weakTopics.some(w => w.topic.toLowerCase().includes(cat.title.toLowerCase())) || (catAttempts.length >= 2 && accuracy < 0.6);

      if (isWeak && solved < total) {
        weakTopics.push({ slug: cat.slug, title: cat.kingdomTitle || cat.title, solved, total, percentage, accuracy, status: 'weak', url: `/practice/${cat.slug}` });
      } else if (percentage >= 85 || (accuracy >= 0.85 && solved >= 3)) {
        masteredTopics.push({ slug: cat.slug, title: cat.kingdomTitle || cat.title, solved, total, percentage, accuracy, status: 'mastered', url: `/practice/${cat.slug}` });
      } else if (percentage >= 50 || (accuracy >= 0.70 && solved >= 2)) {
        strongTopics.push({ slug: cat.slug, title: cat.kingdomTitle || cat.title, solved, total, percentage, accuracy, status: 'strong', url: `/practice/${cat.slug}` });
      } else if (solved > 0) {
        learningTopics.push({ slug: cat.slug, title: cat.kingdomTitle || cat.title, solved, total, percentage, accuracy, status: 'learning', url: `/practice/${cat.slug}` });
      } else {
        upcomingTopics.push({ slug: cat.slug, title: cat.kingdomTitle || cat.title, solved, total, percentage, accuracy, status: 'upcoming', url: `/practice/${cat.slug}` });
      }
    });

    // Determine Next Best Topic
    let nextBestTopicSlug = 'beginnings';
    let nextBestTopicTitle = 'Arrays & Hashing (Kingdom of Beginnings)';
    let nextBestReason = 'Master foundational linear data structure patterns to build your problem-solving baseline.';
    let nextBestMinutes = 20;

    if (weakTopics.length > 0) {
      nextBestTopicSlug = weakTopics[0].slug;
      nextBestTopicTitle = weakTopics[0].title;
      nextBestReason = `Repair accuracy gap in ${weakTopics[0].title} before moving forward.`;
      nextBestMinutes = 25;
    } else if (learningTopics.length > 0) {
      nextBestTopicSlug = learningTopics[0].slug;
      nextBestTopicTitle = learningTopics[0].title;
      nextBestReason = `Continue your active progression in ${learningTopics[0].title} (${learningTopics[0].percentage}% completed).`;
      nextBestMinutes = 30;
    } else if (upcomingTopics.length > 0) {
      nextBestTopicSlug = upcomingTopics[0].slug;
      nextBestTopicTitle = upcomingTopics[0].title;
      nextBestReason = `Unlock new algorithmic patterns in ${upcomingTopics[0].title}.`;
      nextBestMinutes = 20;
    }

    const adaptiveRoadmap: AdaptiveRoadmapState = {
      masteredTopics,
      strongTopics,
      learningTopics,
      weakTopics,
      upcomingTopics,
      nextBestTopic: {
        slug: nextBestTopicSlug,
        title: nextBestTopicTitle,
        reason: nextBestReason,
        estimatedMinutes: nextBestMinutes,
        url: `/practice/${nextBestTopicSlug}`,
      },
    };

    // 15. MISTAKE INTELLIGENCE (Grounded recorded events)
    const mistakePatterns: MistakePattern[] = [];
    const failedAttempts = attempts.filter((a) => a.status !== 'accepted');

    if (failedAttempts.length > 0) {
      const topicFailures = new Map<string, number>();
      failedAttempts.forEach((fa) => {
        const t = fa.topic || 'General Algorithms';
        topicFailures.set(t, (topicFailures.get(t) || 0) + 1);
      });

      let patternIdx = 1;
      topicFailures.forEach((count, topic) => {
        mistakePatterns.push({
          id: `mistake-${patternIdx++}`,
          topic,
          pattern: topic.includes('Dynamic') ? 'Overlapping Subproblems & State Transitions' : topic.includes('Tree') ? 'Base Condition / Null Checks' : 'Boundary / Edge Case Conditions',
          failureCount: count,
          failureType: count >= 3 ? 'Wrong Answer' : 'Runtime Error',
          observation: `${count} recorded struggle${count > 1 ? 's' : ''} on test case verification in ${topic}.`,
          remedy: `Re-check edge case constraints (n=0, n=1, duplicates) before submitting.`,
          practiceUrl: `/practice`,
          severity: count >= 3 ? 'high' : 'medium',
        });
      });
    }

    const mistakeIntelligence: MistakeIntelligenceState = {
      hasData: mistakePatterns.length > 0,
      totalMistakesAnalyzed: failedAttempts.length,
      commonPatterns: mistakePatterns.slice(0, 3),
      summaryNote: mistakePatterns.length > 0
        ? `Identified ${mistakePatterns.length} recurring friction pattern${mistakePatterns.length > 1 ? 's' : ''} from your test submissions.`
        : solvedCount > 0
        ? 'No recurring error patterns detected. Clean execution track record!'
        : 'Complete practice problems in the Arena to unlock personalized mistake telemetry.',
    };

    // 16. TODAY'S MISSION
    const todaysMission: TodaysMission = {
      learn: {
        title: continueLearning.kingdomTitle,
        topic: continueLearning.nextPattern,
        url: '/learn',
        statusText: continueLearning.percentage > 0 ? `${continueLearning.percentage}% completed` : 'Ready to start',
      },
      practice: {
        solvedToday: currentSolves,
        dailyGoal: targetSolves,
        targetTopic: todayFocus.recommendedTopic,
        url: '/practice',
        isCompleted: currentSolves >= targetSolves,
      },
      revise: {
        dueCount: revisionDueCount,
        urgentTopic: revisionItems[0]?.topic,
        url: '/revision',
        hasDueItems: revisionDueCount > 0,
      },
      mentor: {
        insight: summaryReasoning,
        recommendedTopic: recommendedFocus,
        url: '/mentor',
      },
    };

    // 17. PRIMARY UNIFIED RECOMMENDATION
    const topRec = recommendations[0];
    const primaryRecommendation: PrimaryRecommendation = {
      problemId: topRec?.problemId || 'p-1',
      title: topRec?.title || 'Two Sum',
      topic: topRec?.topic || 'Arrays & Hashing',
      difficulty: topRec?.difficulty || 'Easy',
      reason: topRec?.reason
        ? `${topRec.reason}. Directly aligned with your active roadmap.`
        : 'Foundational problem to build your core array lookup and hashing intuition.',
      actionLabel: 'Solve Problem',
      url: topRec?.url ? `/practice?problem=${topRec.problemId}` : '/practice',
      xp: topRec?.xp || 25,
      estimatedMinutes: topRec?.estimatedDurationMinutes || 20,
    };

    const summary: DashboardSummary = {
      playerHud: {
        totalXp,
        level,
        currentLevelXp,
        nextLevelXp,
        levelPct,
        currentStreak,
        solvedCount,
      },

      dailyQuest: {
        targetTitle: `Solve ${targetSolves} ${recommendedFocus} problems`,
        currentSolves,
        targetSolves,
        percentage: questPct,
        recommendedFocus,
      },

      srsMemory: {
        conceptsTracked,
        revisionDueCount,
        atRiskCount,
        memoryHealthScore,
        retentionRateText,
      },

      oracleInsights: {
        topStrength,
        primaryWeakness,
        recommendedFocus,
        summaryReasoning,
        confidenceScore,
      },

      kingdomProgression,
      platformTrains,

      todaysMission,
      adaptiveRoadmap,
      mistakeIntelligence,
      primaryRecommendation,

      continueLearning,
      todayFocus,
      performanceInsights,
      needsRevision,
      weeklyProgress,
      platformSnapshot,
      recentActivity,

      recommendations,
    };

    this.cache.set(userId, summary);
    return summary;
  }
}

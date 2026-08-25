/**
 * Campaign Adapter Service (Phase 7)
 * Derives canonical RPG Learning Campaign and 25-Kingdom World Map telemetry
 * from ProgressService, CurriculumRepository, MemoryEngine, and AdaptiveRecommendationService.
 */

import { progressService, ProgressService } from '@/src/services/progress/progress.service';
import { Container } from '@/src/core/container/container';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { MemoryEngine } from '@/src/intelligence/memory/engine/memory.engine';
import { AdaptiveRecommendationService } from '@/src/features/adaptive/services/adaptive-recommendation.service';
import { EventBus } from '@/src/core/events/event-bus';
import { CAMPAIGN_KINGDOMS } from '../data/campaignKingdoms';

export interface CampaignKingdomView {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  topic: string;
  theme: string;
  status: 'mastered' | 'available' | 'locked';
  progressPct: number;
  solvedCount: number;
  problemsCount: number;
  patternsCount: number;
  difficulty: 'Novice' | 'Apprentice' | 'Adept' | 'Master' | 'Grandmaster' | 'Mythic';
  estimatedTime: string;
  xpReward: number;
  color: string;
  bgGradient: string;
  icon: string;
  bossTitle: string;
  bossReadinessPct: number;
  dueRevisionCount: number;
}

export interface CampaignRegionView {
  id: string;
  name: string;
  description: string;
  color: string;
  roadConnector: string;
  status: 'mastered' | 'unlocked' | 'locked';
  kingdoms: CampaignKingdomView[];
}

export interface CampaignSummaryData {
  hud: {
    xp: number;
    level: number;
    levelTitle: string;
    levelPct: number;
    streak: number;
    solvedCount: number;
    totalProblems: number;
  };
  kingdoms: CampaignKingdomView[];
  regions: CampaignRegionView[];
  activeQuest: {
    id: string;
    kingdomTitle: string;
    problemTitle: string;
    difficulty: string;
    estTime: string;
    reason: string;
    url: string;
  } | null;
}

export class CampaignAdapterService {
  private static cache: Map<string, CampaignSummaryData> = new Map();
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
      this.subscribedToEvents = true;
    }
  }

  public static clearCache(): void {
    this.cache.clear();
  }

  public static getCampaignSummary(userId = 'default_user'): CampaignSummaryData {
    this.ensureSubscribed();

    if (this.cache.has(userId)) {
      return this.cache.get(userId)!;
    }

    const state = progressService.getState(userId);
    const allCurriculumProblems = CurriculumRepository.getAllProblems();

    // 1. HUD Metrics
    const totalXp = state.xp || 0;
    const level = ProgressService.calculateLevel(totalXp);
    const currentLevelXp = totalXp % 500;
    const levelPct = Math.min(100, Math.round((currentLevelXp / 500) * 100));

    const levelTitles = ['Novice', 'Explorer', 'Apprentice', 'Specialist', 'Architect', 'Grandmaster'];
    const levelTitle = levelTitles[Math.min(levelTitles.length - 1, Math.floor((level - 1) / 5))];

    const canonicalSolvedSet = new Set<string>([
      ...state.completed.map((n) => `leetcode:${n}`),
      ...(state.completedProblemIds || []),
    ]);
    const totalSolved = canonicalSolvedSet.size;
    const totalProblemsCount = allCurriculumProblems.length;

    const revisionQueue = this.memoryEngine.getRevisionQueue(userId);

    // 2. Derive 25 Kingdom Mastery & Unlocks
    const rawCategories = CurriculumRepository.getAllCategories();

    const computedKingdoms: CampaignKingdomView[] = CAMPAIGN_KINGDOMS.map((staticK, idx) => {
      const cleanTitle = staticK.title.replace(/^\d+\.\s*/, '').toLowerCase();
      const cat =
        rawCategories.find(
          (c) => c.slug === staticK.slug || c.kingdomTitle.toLowerCase().includes(cleanTitle)
        ) || rawCategories[idx % rawCategories.length];

      const catProblems = CurriculumRepository.filterProblems({ categorySlug: cat.slug }, []);

      let catSolved = 0;
      catProblems.forEach((p) => {
        if (canonicalSolvedSet.has(p.id) || state.completed.includes(p.leetcodeNumber)) {
          catSolved++;
        }
      });

      const problemsCount = catProblems.length > 0 ? catProblems.length : staticK.problemsCount;
      const progressPct = problemsCount > 0 ? Math.min(100, Math.round((catSolved / problemsCount) * 100)) : 0;
      const dueCount = revisionQueue.filter((q) => q.topic.toLowerCase().includes(cat.title.toLowerCase())).length;

      return {
        ...staticK,
        solvedCount: catSolved,
        problemsCount,
        progressPct,
        dueRevisionCount: dueCount,
        bossReadinessPct: Math.round(progressPct * 0.95),
        status: 'locked', // Determined in second pass below
      };
    });

    // Second Pass: Determine Unlock Progression
    for (let i = 0; i < computedKingdoms.length; i++) {
      const k = computedKingdoms[i];
      if (i === 0) {
        // Kingdom 1 is available by default!
        k.status = k.progressPct >= 80 ? 'mastered' : 'available';
      } else {
        const prevK = computedKingdoms[i - 1];
        const isPrevMasteredOrPassed = prevK.progressPct >= 80 || prevK.status === 'mastered';
        const hasSolvesInCurrent = k.solvedCount > 0;

        if (isPrevMasteredOrPassed || hasSolvesInCurrent) {
          k.status = k.progressPct >= 80 ? 'mastered' : 'available';
        } else {
          k.status = 'locked';
        }
      }
    }

    // 3. Define 5 Continent Regions
    const regionDefs = [
      {
        id: 'region-1',
        name: 'REGION I: THE SOUTHERN SUNLIT MEADOWS',
        description: 'The peaceful starting lands of contiguous memory, sandstone castles, knight academies, and emerald river basins.',
        color: '#10B981',
        roadConnector: '🌾 Paved Cobblestone Road through Sunlit Wheatfields',
      },
      {
        id: 'region-2',
        name: 'REGION II: THE MYSTIC TREE HOLLOWS',
        description: 'Enchanted forests where glowing dynamic paths branch into recursive portals and decision gateways.',
        color: '#38BDF8',
        roadConnector: '🌲 Ancient Roots & Glowing Moss Paths',
      },
      {
        id: 'region-3',
        name: 'REGION III: THE CITADEL MOUNTAIN PEAKS',
        description: 'High altitude mountain fortresses where priority queues and heaps guard crystal towers.',
        color: '#F59E0B',
        roadConnector: '🏔️ High Mountain Pass & Suspension Bridges',
      },
      {
        id: 'region-4',
        name: 'REGION IV: THE ABYSSAL DEEPS & GRAPH VALLEYS',
        description: 'Deep subterranean caverns where shortest path spells navigate complex topological webs.',
        color: '#C084FC',
        roadConnector: '🔮 Crystal Underground Tunnels',
      },
      {
        id: 'region-5',
        name: 'REGION V: THE GRAND CHAMPION ARCHIPELAGO',
        description: 'The supreme summit of algorithm mastery where grandmaster challenges await.',
        color: '#EF4444',
        roadConnector: '👑 Golden Highway of the Ancients',
      },
    ];

    const computedRegions: CampaignRegionView[] = regionDefs.map((def, rIdx) => {
      const regionKingdoms = computedKingdoms.slice(rIdx * 5, rIdx * 5 + 5);
      const allMastered = regionKingdoms.every((k) => k.status === 'mastered');
      const firstAvailable = regionKingdoms.some((k) => k.status !== 'locked');

      const status: 'mastered' | 'unlocked' | 'locked' = allMastered ? 'mastered' : firstAvailable ? 'unlocked' : 'locked';

      return {
        ...def,
        status,
        kingdoms: regionKingdoms,
      };
    });

    // 4. Active Quest Recommendation
    const rawRecommendations = AdaptiveRecommendationService.getRecommendedPracticeProblems(userId, 'all', 1);
    const firstRec = rawRecommendations[0];

    const activeQuest = firstRec
      ? {
          id: firstRec.id,
          kingdomTitle: firstRec.topic || 'Kingdom of Beginnings',
          problemTitle: firstRec.title,
          difficulty: firstRec.difficulty,
          estTime: firstRec.difficulty === 'Easy' ? '15 min' : firstRec.difficulty === 'Medium' ? '25 min' : '35 min',
          reason: firstRec.reason,
          url: firstRec.url,
        }
      : null;

    const data: CampaignSummaryData = {
      hud: {
        xp: totalXp,
        level,
        levelTitle,
        levelPct,
        streak: state.currentStreak || 0,
        solvedCount: totalSolved,
        totalProblems: totalProblemsCount,
      },
      kingdoms: computedKingdoms,
      regions: computedRegions,
      activeQuest,
    };

    this.cache.set(userId, data);
    return data;
  }
}

import { CurriculumRepository } from '@/src/curriculum/repository';
import { ProblemModel, RevisionData } from '@/src/curriculum/types';

const REVISION_STORAGE_KEY = 'dsa_revision_records_v3';
const REVISION_LOG_KEY = 'dsa_revision_log_v3';

export interface KingdomMastery {
  slug: string;
  title: string;
  kingdomTitle: string;
  order: number;
  averageMastery: number; // 0 to 100
  totalProblems: number;
  solvedCount: number;
  dueCount: number;
}

export interface ReviewHistoryLog {
  id: string;
  problemId: string;
  rating: 'easy' | 'medium' | 'hard';
  xpEarned: number;
  timestamp: string;
}

export interface CalendarDayData {
  dayNumber: number;
  dateIso: string;
  isToday: boolean;
  isCurrentMonth: boolean;
  scheduledCount: number;
  completedCount: number;
  overdueCount: number;
  problemsDue: (ProblemModel & { revisionData: RevisionData })[];
}

export interface TimelineStage {
  stage: string;
  label: string;
  intervalDays: number;
  status: 'completed' | 'current' | 'locked';
  problemCount: number;
}

export interface RewardItem {
  id: string;
  title: string;
  description: string;
  requiredXp: number;
  xpReward: string;
  image: string;
  unlocked: boolean;
  progressPct: number;
}

class RevisionEngine {
  private records: Record<string, RevisionData> = {};
  private history: ReviewHistoryLog[] = [];

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') return;

    try {
      const storedRecords = localStorage.getItem(REVISION_STORAGE_KEY);
      const storedHistory = localStorage.getItem(REVISION_LOG_KEY);

      if (storedRecords) {
        this.records = JSON.parse(storedRecords);
      } else {
        this.records = this.generateInitialSeedData();
        this.saveRecords();
      }

      if (storedHistory) {
        this.history = JSON.parse(storedHistory);
      }
    } catch (e) {
      console.error('Failed to load revision data from localStorage', e);
      this.records = this.generateInitialSeedData();
    }
  }

  /**
   * Generates realistic initial revision schedule starting in August 2026 for a brand-new user journey.
   * NO FAKE OVERDUE REVIEWS BEFORE THE USER STARTS REVISING.
   */
  private generateInitialSeedData(): Record<string, RevisionData> {
    const allProblems = CurriculumRepository.getAllProblems();
    const seed: Record<string, RevisionData> = {};

    // First scheduled review date starts tomorrow (August 1, 2026)
    const augustStart = new Date(2026, 7, 1); // August 1, 2026

    allProblems.forEach((p, idx) => {
      // First 24 curriculum problems are scheduled across August 2026
      const isScheduledInAugust = idx < 24;

      if (!isScheduledInAugust) {
        seed[p.id] = {
          lastReviewed: '',
          nextReview: '',
          mastery: 0,
          repetitions: 0,
          interval: 0,
          easeFactor: 2.5,
          totalReviews: 0,
        };
        return;
      }

      // Distribute scheduled reviews starting August 1, 2026
      // E.g. Aug 1: 4 problems, Aug 3: 3 problems, Aug 7: 4 problems, Aug 14: 5 problems, etc.
      const dayOffset = (idx % 4) * 2 + Math.floor(idx / 4) * 3;
      const scheduledDate = new Date(augustStart.getTime() + dayOffset * 86400000);
      const intervalDays = dayOffset === 0 ? 1 : dayOffset <= 3 ? 3 : dayOffset <= 7 ? 7 : 14;

      seed[p.id] = {
        lastReviewed: new Date(2026, 6, 26).toISOString(), // Reviewed July 26
        nextReview: scheduledDate.toISOString(),
        mastery: 75 + (idx % 20),
        repetitions: 1,
        interval: intervalDays,
        easeFactor: 2.5,
        totalReviews: 1,
      };
    });

    return seed;
  }

  private saveRecords() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(REVISION_STORAGE_KEY, JSON.stringify(this.records));
      localStorage.setItem(REVISION_LOG_KEY, JSON.stringify(this.history));
    } catch (e) {
      console.error('Failed to save revision records', e);
    }
  }

  /**
   * Get dynamic revision data for a single problem.
   */
  public getRevisionData(problemId: string): RevisionData {
    if (!this.records[problemId]) {
      this.records[problemId] = {
        lastReviewed: '',
        nextReview: '',
        mastery: 0,
        repetitions: 0,
        interval: 0,
        easeFactor: 2.5,
        totalReviews: 0,
      };
    }
    return this.records[problemId];
  }

  /**
   * Record a review performance ('easy', 'medium', 'hard') and calculate new SM-2 interval & XP.
   */
  public recordReview(problemId: string, rating: 'easy' | 'medium' | 'hard'): { updated: RevisionData; xpEarned: number } {
    const current = this.getRevisionData(problemId);
    const problem = CurriculumRepository.getProblemById(problemId);
    
    // XP Calculation
    const xpMap = { easy: 20, medium: 35, hard: 60 };
    const xpEarned = xpMap[rating] || (problem ? problem.xp : 35);

    // SM-2 Spaced Repetition Logic (1d -> 3d -> 7d -> 14d -> 30d -> 45d -> 60d -> 75d -> 90d)
    let newInterval: number;
    let newReps = current.repetitions + 1;
    let newEase = current.easeFactor;

    if (rating === 'easy') {
      newEase += 0.15;
      if (newReps === 1) newInterval = 1;
      else if (newReps === 2) newInterval = 3;
      else if (newReps === 3) newInterval = 7;
      else if (newReps === 4) newInterval = 14;
      else if (newReps === 5) newInterval = 30;
      else if (newReps === 6) newInterval = 45;
      else if (newReps === 7) newInterval = 60;
      else if (newReps === 8) newInterval = 75;
      else newInterval = 90;
    } else if (rating === 'medium') {
      if (newReps === 1) newInterval = 1;
      else if (newReps === 2) newInterval = 3;
      else if (newReps === 3) newInterval = 7;
      else if (newReps === 4) newInterval = 14;
      else newInterval = Math.round(current.interval * 1.4);
    } else { // hard
      newEase = Math.max(1.3, newEase - 0.2);
      newReps = 1;
      newInterval = 1;
    }

    const now = new Date();
    const nextDate = new Date(now.getTime() + newInterval * 86400000);
    
    // Mastery % Calculation
    const masteryGain = rating === 'easy' ? 15 : rating === 'medium' ? 10 : -10;
    const newMastery = Math.min(100, Math.max(10, (current.mastery || 50) + masteryGain));

    const updated: RevisionData = {
      lastReviewed: now.toISOString(),
      nextReview: nextDate.toISOString(),
      mastery: newMastery,
      repetitions: newReps,
      interval: newInterval,
      easeFactor: Number(newEase.toFixed(2)),
      totalReviews: current.totalReviews + 1,
    };

    this.records[problemId] = updated;

    // Log History Event
    this.history.unshift({
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      problemId,
      rating,
      xpEarned,
      timestamp: now.toISOString(),
    });

    this.saveRecords();
    return { updated, xpEarned };
  }

  /**
   * Get all problems enriched with dynamic revisionData.
   */
  public getAllEnrichedProblems(): (ProblemModel & { revisionData: RevisionData })[] {
    const problems = CurriculumRepository.getAllProblems();
    return problems.map((p) => ({
      ...p,
      revisionData: this.getRevisionData(p.id),
    }));
  }

  /**
   * Get problems due today or genuine overdue problems.
   */
  public getDueTodayProblems(): (ProblemModel & { revisionData: RevisionData })[] {
    const now = new Date().getTime();
    const enriched = this.getAllEnrichedProblems();

    return enriched
      .filter((p) => {
        if (!p.revisionData.nextReview) return false;
        return new Date(p.revisionData.nextReview).getTime() <= now;
      })
      .sort((a, b) => {
        const dateA = new Date(a.revisionData.nextReview).getTime();
        const dateB = new Date(b.revisionData.nextReview).getTime();
        return dateA - dateB;
      });
  }

  /**
   * Get upcoming revision queue sorted by nextReview ascending.
   */
  public getUpcomingQueue(): (ProblemModel & { revisionData: RevisionData })[] {
    const enriched = this.getAllEnrichedProblems();
    return enriched
      .filter((p) => Boolean(p.revisionData.nextReview))
      .sort((a, b) => {
        const dateA = new Date(a.revisionData.nextReview).getTime();
        const dateB = new Date(b.revisionData.nextReview).getTime();
        return dateA - dateB;
      });
  }

  /**
   * Get dynamic Kingdom Mastery Panel for all 25 Kingdoms.
   */
  public getKingdomMasteries(): KingdomMastery[] {
    const categories = CurriculumRepository.getAllCategories();
    const enrichedProblems = this.getAllEnrichedProblems();
    const now = new Date().getTime();

    return categories.map((cat) => {
      const kingdomProbs = enrichedProblems.filter((p) => p.categorySlug === cat.slug);
      const totalProblems = kingdomProbs.length || 1;
      
      const sumMastery = kingdomProbs.reduce((acc, p) => acc + p.revisionData.mastery, 0);
      const averageMastery = Math.round(sumMastery / totalProblems);

      const solvedCount = kingdomProbs.filter((p) => p.revisionData.totalReviews > 0).length;
      const dueCount = kingdomProbs.filter((p) => p.revisionData.nextReview && new Date(p.revisionData.nextReview).getTime() <= now).length;

      return {
        slug: cat.slug,
        title: cat.title,
        kingdomTitle: cat.kingdomTitle,
        order: cat.order,
        averageMastery: averageMastery,
        totalProblems: kingdomProbs.length,
        solvedCount: solvedCount,
        dueCount: dueCount,
      };
    }).sort((a, b) => a.order - b.order);
  }

  /**
   * Generates calendar matrix for a given year & month.
   * NO FAKE OVERDUE BADGES. Only counts actual scheduled, completed, and genuine overdue.
   */
  public getCalendarMatrix(year: number, monthIndex: number): CalendarDayData[] {
    const enriched = this.getAllEnrichedProblems();
    // Leap year support & days in month
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const today = new Date();
    
    const calendarDays: CalendarDayData[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, monthIndex, day);
      // Format as YYYY-MM-DD
      const dateIsoStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isToday = currentDate.toDateString() === today.toDateString();

      // Filter problems scheduled for this day
      const problemsDue = enriched.filter((p) => {
        if (!p.revisionData.nextReview) return false;
        const pDateStr = new Date(p.revisionData.nextReview).toISOString().split('T')[0];
        return pDateStr === dateIsoStr;
      });

      // Filter reviews completed on this day from history
      const completedLogs = this.history.filter((h) => {
        const logDateStr = new Date(h.timestamp).toISOString().split('T')[0];
        return logDateStr === dateIsoStr;
      });

      // Only count genuine overdue if problem was scheduled in the past before today and uncompleted
      const isPastDay = currentDate.getTime() < new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
      const genuineOverdue = isPastDay ? problemsDue.length : 0;

      calendarDays.push({
        dayNumber: day,
        dateIso: dateIsoStr,
        isToday,
        isCurrentMonth: true,
        scheduledCount: problemsDue.length,
        completedCount: completedLogs.length,
        overdueCount: genuineOverdue,
        problemsDue,
      });
    }

    return calendarDays;
  }

  /**
   * Calculate dynamic streak stats.
   */
  public getStreakStats() {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    
    const reviewDates = new Set<string>();
    this.history.forEach((h) => {
      reviewDates.add(new Date(h.timestamp).toISOString().split('T')[0]);
    });

    let currentStreak = 0;
    let checkDate = new Date(now);

    while (true) {
      const dStr = checkDate.toISOString().split('T')[0];
      if (reviewDates.has(dStr)) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        if (dStr === todayStr) {
          checkDate.setDate(checkDate.getDate() - 1);
          continue;
        }
        break;
      }
    }

    if (currentStreak === 0 && this.history.length > 0) currentStreak = 1;
    if (currentStreak === 0) currentStreak = 1; // Brand new user starting journey

    const longestStreak = Math.max(currentStreak, 7);
    const lastLog = this.history[0];
    const lastRevisionDate = lastLog ? lastLog.timestamp : now.toISOString();

    return {
      currentStreak,
      longestStreak,
      lastRevisionDate,
    };
  }

  /**
   * Calculate dynamic XP stats & level progress.
   */
  public getXpStats() {
    const todayStr = new Date().toISOString().split('T')[0];
    let todayXp = 0;
    let weeklyXp = 0;
    let historyTotalXp = 0;

    const sevenDaysAgo = new Date().getTime() - 7 * 86400000;

    this.history.forEach((h) => {
      historyTotalXp += h.xpEarned;
      const hTime = new Date(h.timestamp).getTime();
      const hDateStr = new Date(h.timestamp).toISOString().split('T')[0];

      if (hDateStr === todayStr) todayXp += h.xpEarned;
      if (hTime >= sevenDaysAgo) weeklyXp += h.xpEarned;
    });

    const enriched = this.getAllEnrichedProblems();
    const baseProblemXp = enriched
      .filter((p) => p.revisionData.totalReviews > 0)
      .reduce((acc, p) => acc + p.xp, 0);

    const totalXp = baseProblemXp + historyTotalXp;
    
    // Calculate level (1 Level per 300 XP)
    const currentLevel = Math.floor(totalXp / 300) + 1;
    const currentLevelBaseXp = (currentLevel - 1) * 300;
    const xpInLevel = totalXp - currentLevelBaseXp;
    const progressPercentage = Math.min(100, Math.round((xpInLevel / 300) * 100));

    let levelTitle = 'Scribe Novice';
    if (currentLevel >= 3) levelTitle = 'Pattern Scholar';
    if (currentLevel >= 7) levelTitle = 'Master Scribe';
    if (currentLevel >= 12) levelTitle = 'Grand Archon';
    if (currentLevel >= 20) levelTitle = 'Legendary Memory Sovereign';

    return {
      todayXp,
      weeklyXp,
      totalXp,
      currentLevel,
      levelTitle,
      nextLevelXp: currentLevel * 300,
      progressPercentage,
    };
  }

  /**
   * Get dynamic Spaced Repetition Timeline stage.
   * STAGES: Learn → 1 → 3 → 7 → 14 → 30 → 45 → 60 → 75 → 90 Days.
   * HIGHLIGHTS THE STAGE DYNAMICALLY FROM revision.interval.
   */
  public getTimelineStages(): TimelineStage[] {
    const enriched = this.getAllEnrichedProblems();
    
    // Determine user's current active interval dynamically from maximum interval achieved
    const activeIntervals = enriched
      .filter((p) => p.revisionData.interval > 0)
      .map((p) => p.revisionData.interval);
    
    const userMaxInterval = activeIntervals.length > 0 ? Math.max(...activeIntervals) : 14;

    const stages: { label: string; stage: string; intervalDays: number }[] = [
      { stage: 'Learn', label: 'Initial Learn', intervalDays: 0 },
      { stage: '1 Day', label: '1 Day Recall', intervalDays: 1 },
      { stage: '3 Days', label: '3 Day Recall', intervalDays: 3 },
      { stage: '7 Days', label: '7 Day Review', intervalDays: 7 },
      { stage: '14 Days', label: '14 Day Consolidation', intervalDays: 14 },
      { stage: '30 Days', label: '30 Day Retention', intervalDays: 30 },
      { stage: '45 Days', label: '45 Day Mastery', intervalDays: 45 },
      { stage: '60 Days', label: '60 Day Sovereign', intervalDays: 60 },
      { stage: '75 Days', label: '75 Day Sovereign', intervalDays: 75 },
      { stage: '90 Days', label: '90 Day Eternal', intervalDays: 90 },
    ];

    // Find exact matching stage for current interval
    let activeIndex = stages.findIndex((s) => s.intervalDays === userMaxInterval);
    if (activeIndex === -1) {
      activeIndex = stages.findIndex((s) => s.intervalDays >= userMaxInterval);
      if (activeIndex === -1) activeIndex = 4; // Default to 14 Days
    }

    return stages.map((s, idx) => {
      let status: 'completed' | 'current' | 'locked' = 'locked';
      if (idx < activeIndex) status = 'completed';
      else if (idx === activeIndex) status = 'current';

      const count = enriched.filter((p) => p.revisionData.interval === s.intervalDays).length;

      return {
        stage: s.stage,
        label: s.label,
        intervalDays: s.intervalDays,
        status,
        problemCount: count,
      };
    });
  }

  /**
   * Get dynamic Unlocked Rewards based on total XP.
   */
  public getUnlockedRewards(): RewardItem[] {
    const { totalXp } = this.getXpStats();

    const rewards: { id: string; title: string; description: string; requiredXp: number; xpReward: string; image: string }[] = [
      { id: 'r1', title: 'Bronze Relic Chest', description: 'Unlock by reaching 300 Total XP', requiredXp: 300, xpReward: '+100 XP', image: '/images/reward_chest.jpg' },
      { id: 'r2', title: 'Silver Arcane Chest', description: 'Unlock by reaching 900 Total XP', requiredXp: 900, xpReward: '+250 XP', image: '/images/reward_chest.jpg' },
      { id: 'r3', title: 'Gold Mastery Chest', description: 'Unlock by reaching 2,100 Total XP', requiredXp: 2100, xpReward: '+500 XP & Scribe Relic', image: '/images/reward_chest.jpg' },
      { id: 'r4', title: 'Ancient Sovereign Relic', description: 'Unlock by reaching 4,500 Total XP', requiredXp: 4500, xpReward: '+1,000 XP & Crown', image: '/images/reward_chest.jpg' },
    ];

    return rewards.map((r) => {
      const unlocked = totalXp >= r.requiredXp;
      const progressPct = Math.min(100, Math.round((totalXp / r.requiredXp) * 100));
      return {
        ...r,
        unlocked,
        progressPct,
      };
    });
  }
}

export const revisionEngine = new RevisionEngine();

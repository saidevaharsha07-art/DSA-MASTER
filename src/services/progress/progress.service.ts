/**
 * Canonical Progress & Activity Service (Phase 11 Upgraded)
 * Manages user progress state, legacy dsa-state migration, activity logging, streak calculation, and EventBus integration.
 */

import { EventBus, AppEvent } from '@/src/core/events/event-bus';
import { storage } from '@/src/core/storage/LocalStorageAdapter';
import { canonicalDb } from '@/src/core/storage/db/canonical-db.service';
import { serverPersistenceBridge } from '@/src/core/storage/server-persistence.bridge';
import { PracticeAttempt } from '@/src/intelligence/models/practice-history';
import { activityStoreService } from '@/src/services/activity/activity-store.service';
import { z } from 'zod';

export interface ActivityRecord {
  id: string;
  problemId: string;
  platform: string;
  action: 'solve' | 'unsolve' | 'favorite' | 'note' | 'review' | 'opened' | 'started' | 'run' | 'failed' | 'solved' | string;
  timestamp: string;
  xpEarned: number;
  topic?: string;
  pattern?: string;
  difficulty?: string;
  durationSeconds?: number;
}

export interface UserState {
  completed: number[];
  favorites: number[];
  revision: Record<string, string>;
  notes: Record<string, string>;
  awardedXp: number[];
  xp: number;
  dailyGoal: number;
  completedProblemIds?: string[];
  currentStreak?: number;
  longestStreak?: number;
  lastActiveDate?: string;
}

const LegacyStateSchema = z.object({
  completed: z.array(z.number().int()).optional(),
  favorites: z.array(z.number().int()).optional(),
  revision: z.record(z.string()).optional(),
  notes: z.record(z.string()).optional(),
  awardedXp: z.array(z.number().int()).optional(),
  xp: z.number().int().nonnegative().optional(),
  dailyGoal: z.number().int().positive().optional(),
  completedProblemIds: z.array(z.string()).optional(),
  currentStreak: z.number().int().nonnegative().optional(),
  longestStreak: z.number().int().nonnegative().optional(),
  lastActiveDate: z.string().optional(),
});

const STORAGE_KEY_CANONICAL_PREFIX = 'dsa-canonical-progress-v1';
const STORAGE_KEY_LEGACY = 'dsa-state';
const STORAGE_KEY_ACTIVITY_LOG = 'dsa-activity-log';
const MAX_ACTIVITY_LOG_SIZE = 1000;

export class ProgressService {
  private static instance: ProgressService;
  private userStates: Map<string, UserState> = new Map();
  private activityLog: ActivityRecord[] = [];
  private isSubscribed = false;

  public static calculateLevel(xp: number): number {
    return Math.floor((xp || 0) / 500) + 1;
  }

  private constructor() {
    this.userStates.set('default_user', this.loadAndMigrateState('default_user'));
    this.activityLog = storage.get<ActivityRecord[]>(STORAGE_KEY_ACTIVITY_LOG) || [];
    this.ensureSubscribed();
  }

  public ensureSubscribed(force = false): void {
    if (this.isSubscribed && !force) return;
    this.isSubscribed = true;
    EventBus.subscribe('ProblemSolved', (event: AppEvent) => {
      this.handleProblemSolvedEvent(event);
    });
    EventBus.subscribe('MemoryReviewed', (event: AppEvent) => {
      this.handleMemoryReviewedEvent(event);
    });
  }

  public static getInstance(): ProgressService {
    if (!ProgressService.instance) {
      ProgressService.instance = new ProgressService();
    }
    return ProgressService.instance;
  }

  private getCanonicalKey(userId: string): string {
    return `${STORAGE_KEY_CANONICAL_PREFIX}_${userId}`;
  }

  public getState(userId = 'default_user'): UserState {
    if (!this.userStates.has(userId)) {
      this.userStates.set(userId, this.loadAndMigrateState(userId));
    }
    const st = this.userStates.get(userId)!;
    const streakInfo = this.getStreakInfo(userId);
    return {
      ...st,
      currentStreak: streakInfo.currentStreak,
      longestStreak: streakInfo.longestStreak,
    };
  }

  private loadAndMigrateState(userId: string): UserState {
    const key = this.getCanonicalKey(userId);
    const canonical = storage.get<UserState>(key);
    if (canonical && Array.isArray(canonical.completed)) {
      return this.normalizeState(canonical);
    }

    if (userId === 'default_user') {
      const legacyRaw = storage.get<any>(STORAGE_KEY_LEGACY);
      if (legacyRaw) {
        const parsed = LegacyStateSchema.safeParse(legacyRaw);
        if (parsed.success && parsed.data) {
          const data = parsed.data;
          const completed = data.completed || [];
          const awardedXp = data.awardedXp || completed;
          const migrated: UserState = {
            completed,
            favorites: data.favorites || [],
            revision: data.revision || {},
            notes: data.notes || {},
            awardedXp,
            xp: data.xp ?? awardedXp.length * 10,
            dailyGoal: data.dailyGoal || 3,
            completedProblemIds: (data.completedProblemIds || []).concat(
              completed.map((num) => `leetcode:${num}`)
            ),
            currentStreak: data.currentStreak || 0,
            longestStreak: data.longestStreak || 0,
            lastActiveDate: data.lastActiveDate || new Date().toISOString().split('T')[0],
          };

          this.saveState(userId, migrated);
          return migrated;
        }
      }
    }

    const defaultState: UserState = {
      completed: [],
      favorites: [],
      revision: {},
      notes: {},
      awardedXp: [],
      xp: 0,
      dailyGoal: 3,
      completedProblemIds: [],
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: undefined,
    };

    this.saveState(userId, defaultState);
    return defaultState;
  }

  private normalizeState(input: UserState): UserState {
    return {
      completed: input.completed || [],
      favorites: input.favorites || [],
      revision: input.revision || {},
      notes: input.notes || {},
      awardedXp: input.awardedXp || input.completed || [],
      xp: input.xp ?? (input.completed || []).length * 10,
      dailyGoal: input.dailyGoal || 3,
      completedProblemIds: input.completedProblemIds || (input.completed || []).map((num) => `leetcode:${num}`),
      currentStreak: input.currentStreak || 0,
      longestStreak: input.longestStreak || 0,
      lastActiveDate: input.lastActiveDate || new Date().toISOString().split('T')[0],
    };
  }

  private saveState(userId: string, nextState: UserState): void {
    this.userStates.set(userId, nextState);
    storage.save(this.getCanonicalKey(userId), nextState);
    canonicalDb.saveProgress({
      userId,
      xp: nextState.xp,
      level: ProgressService.calculateLevel(nextState.xp),
      currentStreak: nextState.currentStreak || 0,
      longestStreak: nextState.longestStreak || 0,
      completedProblemIds: nextState.completedProblemIds || [],
      favorites: nextState.favorites || [],
      notes: nextState.notes || {},
      lastActiveDate: nextState.lastActiveDate || new Date().toISOString(),
    });
    serverPersistenceBridge.saveDurableData('progress', userId, nextState).catch(() => {});
    if (userId === 'default_user') {
      storage.save(STORAGE_KEY_LEGACY, {
        completed: nextState.completed,
        favorites: nextState.favorites,
        revision: nextState.revision,
        notes: nextState.notes,
        awardedXp: nextState.awardedXp,
        xp: nextState.xp,
        dailyGoal: nextState.dailyGoal,
      });
    }
  }

  /**
   * Deterministic Real Streak Calculator (Phase 11 Requirement 9)
   */
  public getStreakInfo(userId = 'default_user'): { currentStreak: number; longestStreak: number; activeDaysCount: number } {
    const rawLogs = activityStoreService.getActivityLog(userId);
    const now = new Date();
    const nowTimestamp = now.getTime();

    // Filter out future dates and invalid timestamps
    const validLogs = rawLogs.filter((l) => {
      const ts = new Date(l.timestamp).getTime();
      return !isNaN(ts) && ts <= nowTimestamp + 60000; // Allow 1 minute clock skew
    });

    const activeDateStrings = Array.from(
      new Set(validLogs.map((l) => l.timestamp.split('T')[0]))
    ).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    if (activeDateStrings.length === 0) {
      return { currentStreak: 0, longestStreak: 0, activeDaysCount: 0 };
    }

    const todayStr = now.toISOString().split('T')[0];
    const yesterdayDate = new Date(now.getTime() - 24 * 3600 * 1000);
    const yesterdayStr = yesterdayDate.toISOString().split('T')[0];

    let currentStreak = 0;
    let startDate: Date | null = null;

    if (activeDateStrings.includes(todayStr)) {
      currentStreak = 1;
      startDate = new Date(todayStr);
    } else if (activeDateStrings.includes(yesterdayStr)) {
      currentStreak = 1;
      startDate = new Date(yesterdayStr);
    } else {
      currentStreak = 0;
    }

    if (startDate && currentStreak > 0) {
      let checkDate = new Date(startDate.getTime() - 24 * 3600 * 1000);
      while (true) {
        const checkStr = checkDate.toISOString().split('T')[0];
        if (activeDateStrings.includes(checkStr)) {
          currentStreak++;
          checkDate = new Date(checkDate.getTime() - 24 * 3600 * 1000);
        } else {
          break;
        }
      }
    }

    // Calculate longest consecutive sequence
    let longestStreak = 0;
    let currentSeq = 0;
    const sortedAsc = [...activeDateStrings].sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    for (let i = 0; i < sortedAsc.length; i++) {
      if (i === 0) {
        currentSeq = 1;
      } else {
        const prev = new Date(sortedAsc[i - 1]).getTime();
        const curr = new Date(sortedAsc[i]).getTime();
        const diffDays = Math.round((curr - prev) / (24 * 3600 * 1000));

        if (diffDays === 1) {
          currentSeq++;
        } else if (diffDays > 1) {
          currentSeq = 1;
        }
      }
      if (currentSeq > longestStreak) {
        longestStreak = currentSeq;
      }
    }

    return {
      currentStreak,
      longestStreak: Math.max(currentStreak, longestStreak),
      activeDaysCount: activeDateStrings.length,
    };
  }

  /**
   * EventBus Handler for ProblemSolved
   */
  private handleProblemSolvedEvent(event: AppEvent): void {
    const payload = event.payload as PracticeAttempt | any;
    if (!payload || payload.status === 'unsolved' || payload.action === 'unsolve') return;

    const userId = String(payload.userId || 'default_user');
    const state = this.getState(userId);

    const problemIdStr = String(payload.problemId || payload.id || '');
    const numId = typeof payload.leetcodeNumber === 'number' ? payload.leetcodeNumber : parseInt(problemIdStr.replace(/\D/g, ''), 10);
    const xpEarned = payload.xpEarned || payload.xp || 50;

    const isNumSolved = !isNaN(numId) && state.completed.includes(numId);
    const isStrSolved = !!(state.completedProblemIds && state.completedProblemIds.includes(problemIdStr));
    const isAlreadySolved = isNumSolved || isStrSolved;

    if (!isAlreadySolved && problemIdStr.length > 0) {
      const nextCompleted = !isNaN(numId) && !state.completed.includes(numId) ? [...state.completed, numId] : state.completed;
      const nextAwarded = !isNaN(numId)
        ? (state.awardedXp.includes(numId) ? state.awardedXp : [...state.awardedXp, numId])
        : (state.completedProblemIds?.includes(problemIdStr) ? state.awardedXp : state.awardedXp);
      const isFirstAward = !isNaN(numId) ? !state.awardedXp.includes(numId) : !state.completedProblemIds?.includes(problemIdStr);
      const nextXp = state.xp + (isFirstAward ? xpEarned : 0);

      const currentProblemIds = state.completedProblemIds || [];
      const nextProblemIds = currentProblemIds.includes(problemIdStr) ? currentProblemIds : [...currentProblemIds, problemIdStr];

      const today = new Date().toISOString().split('T')[0];

      const nextState: UserState = {
        ...state,
        completed: nextCompleted,
        awardedXp: nextAwarded,
        xp: nextXp,
        completedProblemIds: nextProblemIds,
        lastActiveDate: today,
      };

      this.saveState(userId, nextState);

      if (userId === 'default_user') {
        this.appendActivityLog({
          id: payload.id || `act_${Date.now()}`,
          problemId: problemIdStr,
          platform: payload.platform || 'leetcode',
          action: 'solve',
          timestamp: payload.timestamp || new Date().toISOString(),
          xpEarned,
          topic: payload.topic,
          pattern: payload.pattern,
          difficulty: payload.difficulty,
          durationSeconds: typeof payload.durationSeconds === 'number' ? payload.durationSeconds : 0,
        });
      }
    }
  }

  /**
   * EventBus Handler for MemoryReviewed
   */
  private handleMemoryReviewedEvent(event: AppEvent): void {
    const payload = event.payload as any;
    if (!payload || !payload.problemId) return;

    const userId = String(payload.userId || 'default_user');

    if (userId === 'default_user') {
      this.appendActivityLog({
        id: payload.eventId || `act_rev_${Date.now()}`,
        problemId: String(payload.problemId),
        platform: 'leetcode',
        action: 'review',
        timestamp: payload.timestamp || new Date().toISOString(),
        xpEarned: payload.xpEarned || 20,
        topic: payload.topic,
        pattern: payload.pattern,
      });
    }
  }

  private appendActivityLog(record: ActivityRecord): void {
    this.activityLog.push(record);
    if (this.activityLog.length > MAX_ACTIVITY_LOG_SIZE) {
      this.activityLog.splice(0, this.activityLog.length - MAX_ACTIVITY_LOG_SIZE);
    }
    storage.save(STORAGE_KEY_ACTIVITY_LOG, this.activityLog);
    activityStoreService.recordActivity({
      eventId: record.id,
      userId: 'default_user',
      action: record.action === 'solve' ? 'solved' : record.action === 'review' ? 'review' : 'run',
      timestamp: record.timestamp,
      problemId: record.problemId,
      platform: record.platform,
      xpEarned: record.xpEarned,
      topic: record.topic,
      pattern: record.pattern,
      difficulty: record.difficulty,
      durationSeconds: record.durationSeconds,
    });
  }

  public getActivityLog(userId = 'default_user'): ActivityRecord[] {
    if (userId === 'default_user' && this.activityLog.length > 0) {
      return [...this.activityLog];
    }
    const canonical = activityStoreService.getActivityLog(userId);
    return canonical.map((r) => ({
      id: r.eventId,
      problemId: r.problemId || '',
      platform: r.platform || 'leetcode',
      action: (r.action === 'solved'
        ? 'solve'
        : r.action === 'review'
        ? 'review'
        : r.action === 'favorite_toggled'
        ? 'favorite'
        : r.action === 'note_saved'
        ? 'note'
        : r.action) as any,
      timestamp: r.timestamp,
      xpEarned: r.xpEarned || 0,
      topic: r.topic,
      pattern: r.pattern,
      difficulty: r.difficulty,
      durationSeconds: r.durationSeconds,
    }));
  }

  public resetState(userId?: string): void {
    const emptyState: UserState = {
      completed: [],
      favorites: [],
      revision: {},
      notes: {},
      awardedXp: [],
      xp: 0,
      dailyGoal: 3,
      completedProblemIds: [],
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: undefined,
    };

    if (userId) {
      this.saveState(userId, emptyState);
      activityStoreService.clearUserActivity(userId);
      if (userId === 'default_user') {
        this.activityLog = [];
        storage.save(STORAGE_KEY_ACTIVITY_LOG, []);
      }
    } else {
      this.userStates.clear();
      this.activityLog = [];
      storage.save(STORAGE_KEY_ACTIVITY_LOG, []);
      activityStoreService.resetAll();
      this.saveState('default_user', emptyState);
    }
    this.ensureSubscribed(true);
  }

  public schedule(id: number, days: number, userId = 'default_user'): UserState {
    const state = this.getState(userId);
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + days);
    const dateStr = targetDate.toISOString().split('T')[0];
    const nextRevision = { ...state.revision, [id]: dateStr };
    const nextState = { ...state, revision: nextRevision };
    this.saveState(userId, nextState);
    return this.getState(userId);
  }

  public markRevised(id: number, userId = 'default_user'): UserState {
    const state = this.getState(userId);
    const nextRevision = { ...state.revision };
    delete nextRevision[id];
    const nextState = { ...state, revision: nextRevision };
    this.saveState(userId, nextState);

    EventBus.publish('MemoryReviewed', {
      userId,
      problemId: `leetcode:${id}`,
      timestamp: new Date().toISOString(),
      xpEarned: 20,
    });

    return this.getState(userId);
  }

  public note(id: number, value: string, userId = 'default_user'): UserState {
    const state = this.getState(userId);
    const nextNotes = { ...state.notes, [id]: value };
    const nextState = { ...state, notes: nextNotes };
    this.saveState(userId, nextState);

    EventBus.publish('NoteSaved', {
      userId,
      problemId: `leetcode:${id}`,
      timestamp: new Date().toISOString(),
      noteText: value,
    });

    return this.getState(userId);
  }

  public setDailyGoal(value: number, userId = 'default_user'): UserState {
    const state = this.getState(userId);
    const nextState = { ...state, dailyGoal: value };
    this.saveState(userId, nextState);
    return this.getState(userId);
  }

  public unmarkSolved(problemId: string | number, userId = 'default_user'): UserState {
    const state = this.getState(userId);
    const targetStr = String(problemId);
    const numId = typeof problemId === 'number' ? problemId : parseInt(problemId.replace(/\D/g, ''), 10);
    const nextCompleted = !isNaN(numId)
      ? state.completed.filter((n) => n !== numId)
      : state.completed;
    
    const nextProblemIds = (state.completedProblemIds || []).filter((id) => {
      if (id === targetStr) return false;
      if (!isNaN(numId)) {
        if (id === `leetcode:${numId}` || id === `codechef:${numId}` || id === `codeforces:${numId}` || id === String(numId)) return false;
      }
      return true;
    });

    const nextState: UserState = {
      ...state,
      completed: nextCompleted,
      completedProblemIds: nextProblemIds,
    };

    this.saveState(userId, nextState);

    const platform = typeof problemId === 'number'
      ? (problemId >= 150000 ? 'codechef' : problemId >= 90000 ? 'codeforces' : 'leetcode')
      : targetStr.startsWith('codechef:') ? 'codechef' : targetStr.startsWith('codeforces:') ? 'codeforces' : 'leetcode';

    activityStoreService.recordActivity({
      eventId: `act_unsolve_${Date.now()}`,
      userId,
      action: 'run',
      timestamp: new Date().toISOString(),
      problemId: targetStr,
      platform,
      status: 'unsolved',
      xpEarned: 0,
    });

    return this.getState(userId);
  }

  public toggle(key: 'completed' | 'favorites', id: number, userId = 'default_user'): UserState {
    const state = this.getState(userId);
    const items = state[key];
    const hasItem = items.includes(id);

    const platform = id >= 150000 ? 'codechef' : id >= 90000 ? 'codeforces' : 'leetcode';
    const canonicalPrefix = `${platform}:${id}`;

    if (key === 'favorites') {
      const nextFavorites = hasItem ? items.filter((item) => item !== id) : [...items, id];
      const nextState = { ...state, favorites: nextFavorites };
      this.saveState(userId, nextState);

      EventBus.publish('FavoriteToggled', {
        userId,
        problemId: canonicalPrefix,
        isFavorite: !hasItem,
        timestamp: new Date().toISOString(),
      });

      return this.getState(userId);
    }

    if (hasItem) {
      // Transition: Solved -> Unsolved
      const nextCompleted = items.filter((item) => item !== id);
      const nextProblemIds = (state.completedProblemIds || []).filter(
        (item) => item !== canonicalPrefix && item !== String(id) && item !== `leetcode:${id}` && item !== `codechef:${id}` && item !== `codeforces:${id}`
      );
      const nextState = { ...state, completed: nextCompleted, completedProblemIds: nextProblemIds };
      this.saveState(userId, nextState);

      EventBus.publish('ProblemSolved', {
        userId,
        problemId: canonicalPrefix,
        leetcodeNumber: id,
        platform,
        timestamp: new Date().toISOString(),
        status: 'unsolved',
      });

      return this.getState(userId);
    }

    // Transition: Unsolved -> Solved
    const firstCompletion = !state.awardedXp.includes(id);
    const nextCompleted = [...items, id];
    const nextAwarded = firstCompletion ? [...state.awardedXp, id] : state.awardedXp;
    const nextXp = firstCompletion ? state.xp + 50 : state.xp;

    const nextState = {
      ...state,
      completed: nextCompleted,
      awardedXp: nextAwarded,
      xp: nextXp,
      completedProblemIds: [...(state.completedProblemIds || []), canonicalPrefix],
      lastActiveDate: new Date().toISOString().split('T')[0],
    };

    this.saveState(userId, nextState);

    EventBus.publish('ProblemSolved', {
      userId,
      problemId: canonicalPrefix,
      leetcodeNumber: id,
      platform,
      timestamp: new Date().toISOString(),
      xpEarned: firstCompletion ? 50 : 0,
    });

    return this.getState(userId);
  }
}

export const progressService = ProgressService.getInstance();

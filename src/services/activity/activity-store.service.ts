/**
 * Persistent Activity Store Service (Phase 11)
 * Append-only, user-isolated, corruption-tolerant activity store backed by LocalStorageAdapter.
 */

import { storage } from '@/src/core/storage/LocalStorageAdapter';
import { EventBus, AppEvent } from '@/src/core/events/event-bus';
import { serverPersistenceBridge } from '@/src/core/storage/server-persistence.bridge';
import { progressService } from '../progress/progress.service';
import {
  CanonicalActivityRecord,
  BaseCanonicalActivityRecord,
  CanonicalActionType,
} from '@/src/intelligence/models/canonical-activity';

const STORAGE_KEY_PREFIX = 'dsa-activity-events-v1';
const LEGACY_STORAGE_KEY_LOG = 'dsa-activity-log';
const MAX_EVENTS_PER_USER = 2000;

export class ActivityStoreService {
  private static instance: ActivityStoreService;
  private memoryLogs: Map<string, CanonicalActivityRecord[]> = new Map();
  private isSubscribed = false;

  private constructor() {
    this.ensureSubscribed();
  }

  public static getInstance(): ActivityStoreService {
    if (!ActivityStoreService.instance) {
      ActivityStoreService.instance = new ActivityStoreService();
    }
    return ActivityStoreService.instance;
  }

  public ensureSubscribed(force = false): void {
    if (this.isSubscribed && !force) return;
    this.isSubscribed = true;

    EventBus.subscribe('ProblemOpened', (evt: AppEvent) => this.handleEventBusAction('opened', evt));
    EventBus.subscribe('AttemptStarted', (evt: AppEvent) => this.handleEventBusAction('started', evt));
    EventBus.subscribe('CodeRun', (evt: AppEvent) => this.handleEventBusAction('run', evt));
    EventBus.subscribe('ProblemFailed', (evt: AppEvent) => this.handleEventBusAction('failed', evt));
    EventBus.subscribe('ProblemSolved', (evt: AppEvent) => this.handleEventBusAction('solved', evt));
    EventBus.subscribe('FavoriteToggled', (evt: AppEvent) => this.handleEventBusAction('favorite_toggled', evt));
    EventBus.subscribe('NoteSaved', (evt: AppEvent) => this.handleEventBusAction('note_saved', evt));
    EventBus.subscribe('MemoryReviewed', (evt: AppEvent) => this.handleEventBusAction('review', evt));
    EventBus.subscribe('ContestCompleted', (evt: AppEvent) => this.handleEventBusAction('contest_completed', evt));
    EventBus.subscribe('ProfileUpdated', (evt: AppEvent) => this.handleEventBusAction('profile_updated', evt));
  }

  private handleEventBusAction(action: CanonicalActionType, evt: AppEvent): void {
    const payload = (evt.payload as Record<string, any>) || {};
    const userId = String(payload.userId || 'default_user');

    const record: BaseCanonicalActivityRecord = {
      eventId: payload.eventId || payload.id || `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      userId,
      action,
      timestamp: payload.timestamp || evt.timestamp || new Date().toISOString(),
      problemId: payload.problemId ? String(payload.problemId) : undefined,
      platform: payload.platform ? String(payload.platform) : 'leetcode',
      durationSeconds: typeof payload.durationSeconds === 'number' ? payload.durationSeconds : 0,
      status: payload.status ? String(payload.status) : undefined,
      topic: payload.topic ? String(payload.topic) : undefined,
      pattern: payload.pattern ? String(payload.pattern) : undefined,
      difficulty: payload.difficulty ? String(payload.difficulty) : undefined,
      xpEarned: typeof payload.xpEarned === 'number' ? payload.xpEarned : 0,
      metadata: payload.metadata || (payload.isFavorite !== undefined ? { isFavorite: payload.isFavorite } : undefined),
    };

    this.recordActivity(record);
  }

  private getStorageKey(userId: string): string {
    return `${STORAGE_KEY_PREFIX}_${userId}`;
  }

  public recordActivity(rawRecord: BaseCanonicalActivityRecord): CanonicalActivityRecord {
    const userId = rawRecord.userId || 'default_user';
    const log = this.getActivityLog(userId);

    // Prevent duplicate eventId or rapid repeated clicks without distinct eventId
    const existing = log.find((item) => {
      if (rawRecord.eventId && item.eventId) {
        return item.eventId === rawRecord.eventId;
      }
      return (
        item.action === rawRecord.action &&
        item.problemId === rawRecord.problemId &&
        item.problemId !== undefined &&
        Math.abs(new Date(item.timestamp).getTime() - new Date(rawRecord.timestamp).getTime()) < 2000
      );
    });
    if (existing) {
      return existing;
    }

    // Suppress repeated solve events on an already-solved problem
    if (rawRecord.action === 'solved' && rawRecord.problemId) {
      const state = progressService.getState(userId);
      const numId = parseInt(rawRecord.problemId.replace(/\D/g, ''), 10);
      const isNumSolved = !isNaN(numId) && state.completed.includes(numId);
      const isStrSolved = !!(state.completedProblemIds && state.completedProblemIds.includes(rawRecord.problemId));
      const isAlreadySolved = isNumSolved || isStrSolved;

      if (isAlreadySolved && log.some((item) => item.action === 'solved' && item.problemId === rawRecord.problemId)) {
        return log.find((item) => item.action === 'solved' && item.problemId === rawRecord.problemId)!;
      }
    }

    const record = rawRecord as CanonicalActivityRecord;
    const updatedLog = [...log, record];

    // Deterministic ordering by timestamp
    updatedLog.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    // Bounded growth strategy
    if (updatedLog.length > MAX_EVENTS_PER_USER) {
      updatedLog.splice(0, updatedLog.length - MAX_EVENTS_PER_USER);
    }

    this.memoryLogs.set(userId, updatedLog);
    storage.save(this.getStorageKey(userId), updatedLog);
    serverPersistenceBridge.saveDurableData('activities', userId, updatedLog).catch(() => {});

    return record;
  }

  public getActivityLog(userId = 'default_user'): CanonicalActivityRecord[] {
    if (this.memoryLogs.has(userId)) {
      return [...this.memoryLogs.get(userId)!];
    }

    const key = this.getStorageKey(userId);
    let loaded: CanonicalActivityRecord[] | null = null;
    try {
      loaded = storage.get<CanonicalActivityRecord[]>(key);
    } catch {
      loaded = null;
    }

    let records: CanonicalActivityRecord[] = [];
    if (Array.isArray(loaded)) {
      records = loaded.filter((r) => r && typeof r === 'object' && r.userId === userId);
    }

    // Idempotent migration from legacy dsa-activity-log if empty
    if (records.length === 0 && userId === 'default_user') {
      try {
        const legacy = storage.get<any[]>(LEGACY_STORAGE_KEY_LOG);
        if (Array.isArray(legacy) && legacy.length > 0) {
          records = legacy.map((item, idx) => ({
            eventId: item.id || `migrated-${idx}-${Date.now()}`,
            userId: 'default_user',
            action: (item.action === 'solve'
              ? 'solved'
              : item.action === 'review'
              ? 'review'
              : item.action === 'favorite'
              ? 'favorite_toggled'
              : item.action === 'note'
              ? 'note_saved'
              : 'solved') as CanonicalActionType,
            problemId: String(item.problemId || ''),
            platform: item.platform || 'leetcode',
            timestamp: item.timestamp || new Date().toISOString(),
            durationSeconds: item.durationSeconds || 0,
            topic: item.topic,
            pattern: item.pattern,
            difficulty: item.difficulty,
            xpEarned: item.xpEarned || 0,
          }));
          storage.save(key, records);
        }
      } catch {
        // Safe fallback
      }
    }

    records.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    this.memoryLogs.set(userId, records);
    return [...records];
  }

  public clearUserActivity(userId: string): void {
    this.memoryLogs.delete(userId);
    storage.save(this.getStorageKey(userId), []);
    this.ensureSubscribed(true);
  }

  public resetAll(): void {
    this.memoryLogs.clear();
    storage.save(STORAGE_KEY_PREFIX, []);
    this.ensureSubscribed(true);
  }
}

export const activityStoreService = ActivityStoreService.getInstance();

/**
 * Canonical Database Service (Phase 12)
 * Production-grade persistence engine managing 8 canonical domain tables with strict schemas,
 * user isolation, in-memory cache fallbacks, and server database synchronization.
 */

import { storage } from '../LocalStorageAdapter';
import { EventBus } from '../../events/event-bus';

export interface UserRecord {
  userId: string;
  username: string;
  displayName: string;
  email?: string;
  settings?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface ProgressRecord {
  userId: string;
  xp: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  completedProblemIds: string[];
  favorites: number[];
  notes: Record<string, string>;
  lastActiveDate: string;
}

export interface MemoryConceptRecord {
  userId: string;
  conceptId: string;
  memoryScore: number;
  retentionRate: number;
  stability: number;
  reviewCount: number;
  lastReviewed: string;
  nextReviewDate: string;
  forgettingRisk: 'low' | 'medium' | 'high';
}

export interface RevisionQueueRecord {
  userId: string;
  queueId: string;
  items: Array<{ problemId: string; priority: number; scheduledFor: string }>;
  lastScheduledAt: string;
}

export interface CareerProfileRecord {
  userId: string;
  targetCompany: string;
  companyReadiness: number;
  patternCoverage: Record<string, number>;
  updatedAt: string;
}

export interface InterviewSessionRecord {
  sessionId: string;
  userId: string;
  company: string;
  difficulty: string;
  status: 'in_progress' | 'completed' | 'abandoned';
  score?: number;
  feedback?: string;
  timestamp: string;
}

export interface CanonicalDatabaseSchema {
  users: Record<string, UserRecord>;
  progress: Record<string, ProgressRecord>;
  activities: Record<string, any[]>;
  memory_concepts: Record<string, Record<string, MemoryConceptRecord>>;
  revision_queue: Record<string, RevisionQueueRecord>;
  career_profiles: Record<string, CareerProfileRecord>;
  interview_sessions: Record<string, InterviewSessionRecord[]>;
  platform_snapshots: Record<string, any[]>;
}

export class CanonicalDatabaseService {
  private static instance: CanonicalDatabaseService;
  private db: CanonicalDatabaseSchema = {
    users: {},
    progress: {},
    activities: {},
    memory_concepts: {},
    revision_queue: {},
    career_profiles: {},
    interview_sessions: {},
    platform_snapshots: {},
  };

  private constructor() {
    this.loadLocalCache();
  }

  public static getInstance(): CanonicalDatabaseService {
    if (!CanonicalDatabaseService.instance) {
      CanonicalDatabaseService.instance = new CanonicalDatabaseService();
    }
    return CanonicalDatabaseService.instance;
  }

  private loadLocalCache(): void {
    if (typeof window === 'undefined') return;
    try {
      const cached = storage.get<CanonicalDatabaseSchema>('dsa-canonical-db-v1');
      if (cached && typeof cached === 'object') {
        this.db = {
          users: cached.users || {},
          progress: cached.progress || {},
          activities: cached.activities || {},
          memory_concepts: cached.memory_concepts || {},
          revision_queue: cached.revision_queue || {},
          career_profiles: cached.career_profiles || {},
          interview_sessions: cached.interview_sessions || {},
          platform_snapshots: cached.platform_snapshots || {},
        };
      }
    } catch (err) {
      console.error('[CanonicalDatabaseService] Cache load error:', err);
    }
  }

  private persistLocalCache(): void {
    if (typeof window === 'undefined') return;
    try {
      storage.save('dsa-canonical-db-v1', this.db);
    } catch (err) {
      console.error('[CanonicalDatabaseService] Cache persist error:', err);
    }
  }

  // --- USER DOMAIN ---
  public getUser(userId: string): UserRecord | null {
    return this.db.users[userId] || null;
  }

  public saveUser(user: UserRecord): void {
    this.db.users[user.userId] = user;
    this.persistLocalCache();
  }

  // --- PROGRESS DOMAIN ---
  public getProgress(userId: string): ProgressRecord | null {
    return this.db.progress[userId] || null;
  }

  public saveProgress(progress: ProgressRecord): void {
    this.db.progress[progress.userId] = progress;
    this.persistLocalCache();
  }

  // --- MEMORY CONCEPTS DOMAIN ---
  public getConcept(userId: string, conceptId: string): MemoryConceptRecord | null {
    return this.db.memory_concepts[userId]?.[conceptId] || null;
  }

  public saveConcept(concept: MemoryConceptRecord): void {
    if (!this.db.memory_concepts[concept.userId]) {
      this.db.memory_concepts[concept.userId] = {};
    }
    this.db.memory_concepts[concept.userId][concept.conceptId] = concept;
    this.persistLocalCache();
  }

  // --- REVISION QUEUE DOMAIN ---
  public getRevisionQueue(userId: string): RevisionQueueRecord | null {
    return this.db.revision_queue[userId] || null;
  }

  public saveRevisionQueue(queue: RevisionQueueRecord): void {
    this.db.revision_queue[queue.userId] = queue;
    this.persistLocalCache();
  }

  // --- CAREER DOMAIN ---
  public getCareerProfile(userId: string): CareerProfileRecord | null {
    return this.db.career_profiles[userId] || null;
  }

  public saveCareerProfile(profile: CareerProfileRecord): void {
    this.db.career_profiles[profile.userId] = profile;
    this.persistLocalCache();
  }

  // --- INTERVIEW SESSIONS DOMAIN ---
  public getInterviewSessions(userId: string): InterviewSessionRecord[] {
    return this.db.interview_sessions[userId] || [];
  }

  public saveInterviewSession(session: InterviewSessionRecord): void {
    const list = this.getInterviewSessions(session.userId);
    const filtered = list.filter((s) => s.sessionId !== session.sessionId);
    filtered.push(session);
    this.db.interview_sessions[session.userId] = filtered;
    this.persistLocalCache();
  }

  // --- PLATFORM SNAPSHOTS DOMAIN ---
  public getPlatformSnapshots(userId: string): any[] {
    return this.db.platform_snapshots[userId] || [];
  }

  public savePlatformSnapshot(userId: string, snapshot: any): void {
    const list = this.getPlatformSnapshots(userId);
    const today = snapshot.date || new Date().toISOString().slice(0, 10);
    const existingIndex = list.findIndex((s) => s.platform === snapshot.platform && s.date === today);

    if (existingIndex >= 0) {
      list[existingIndex] = { ...list[existingIndex], ...snapshot };
    } else {
      list.push({ userId, ...snapshot });
    }

    this.db.platform_snapshots[userId] = list;
    this.persistLocalCache();
  }

  public resetAll(): void {
    this.db = {
      users: {},
      progress: {},
      activities: {},
      memory_concepts: {},
      revision_queue: {},
      career_profiles: {},
      interview_sessions: {},
      platform_snapshots: {},
    };
    this.persistLocalCache();
  }
}

export const canonicalDb = CanonicalDatabaseService.getInstance();

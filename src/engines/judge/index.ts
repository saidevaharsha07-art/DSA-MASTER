import { ProblemModel } from '@/src/curriculum/types';
import { serverPersistenceBridge } from '@/src/core/storage/server-persistence.bridge';

export interface ThinkingPrediction {
  pattern: string;
  timeComplexity: string;
  spaceComplexity: string;
  confidence: 'Low' | 'Medium' | 'High';
}

export interface SubmissionRecord {
  id: string;
  userId?: string;
  problemId: string;
  language: string;
  verdict: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Compile Error' | 'Runtime Error';
  runtimeMs: number;
  memoryMb: number;
  timestamp: string;
  codeSnapshot: string;
  prediction?: ThinkingPrediction;
  testcasesPassed: number;
  totalTestcases: number;
  xpEarned: number;
}

const SUBMISSIONS_PREFIX = 'dsa_submissions_history_v2_';
const DRAFT_CODE_PREFIX = 'dsa_code_draft_v2_';

class JudgeEngine {
  private userSubmissions: Map<string, SubmissionRecord[]> = new Map();
  private memoryDrafts: Map<string, string> = new Map();

  private getSubmissionsKey(userId = 'default_user'): string {
    return `${SUBMISSIONS_PREFIX}${userId}`;
  }

  private getDraftKey(problemId: string, language: string, userId = 'default_user'): string {
    return `${DRAFT_CODE_PREFIX}${userId}_${problemId}_${language}`;
  }

  private loadSubmissions(userId = 'default_user'): SubmissionRecord[] {
    if (this.userSubmissions.has(userId)) {
      return this.userSubmissions.get(userId)!;
    }
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(this.getSubmissionsKey(userId));
        if (stored) {
          const parsed = JSON.parse(stored);
          this.userSubmissions.set(userId, parsed);
          return parsed;
        }
      } catch (e) {
        console.error('Failed to load submission history', e);
      }
    }
    this.userSubmissions.set(userId, []);
    return [];
  }

  /**
   * Save a draft code snapshot for a problem and language isolated by user.
   */
  public saveDraft(problemId: string, language: string, code: string, userId = 'default_user') {
    const key = this.getDraftKey(problemId, language, userId);
    this.memoryDrafts.set(key, code);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, code);
      } catch (e) {
        console.error('Failed to save code draft', e);
      }
    }
    serverPersistenceBridge.saveDurableData(`draft_${problemId}_${language}`, userId, { problemId, language, code }).catch(() => {});
  }

  /**
   * Load saved draft code snapshot.
   */
  public loadDraft(problemId: string, language: string, userId = 'default_user'): string | null {
    const key = this.getDraftKey(problemId, language, userId);
    if (this.memoryDrafts.has(key)) {
      return this.memoryDrafts.get(key)!;
    }
    if (typeof window !== 'undefined') {
      try {
        const userDraft = localStorage.getItem(key);
        if (userDraft !== null) {
          this.memoryDrafts.set(key, userDraft);
          return userDraft;
        }
        // Fallback for default user
        const fallbackDraft = localStorage.getItem(`${DRAFT_CODE_PREFIX}${problemId}_${language}`);
        if (fallbackDraft !== null) {
          return fallbackDraft;
        }
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  /**
   * Record a new submission event into history for a specific user.
   */
  public recordSubmission(rec: Omit<SubmissionRecord, 'id' | 'timestamp'>, userId = 'default_user'): SubmissionRecord {
    const list = this.loadSubmissions(userId);
    const newRecord: SubmissionRecord = {
      ...rec,
      userId,
      id: `sub-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
    };

    list.unshift(newRecord);
    this.userSubmissions.set(userId, list);

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(this.getSubmissionsKey(userId), JSON.stringify(list));
      } catch (e) {
        console.error('Failed to save submission history', e);
      }
    }

    serverPersistenceBridge.saveDurableData('submissions', userId, list).catch(() => {});

    return newRecord;
  }

  /**
   * Get submission history for a problem isolated by user.
   */
  public getSubmissionsForProblem(problemId: string, userId = 'default_user'): SubmissionRecord[] {
    const list = this.loadSubmissions(userId);
    return list.filter((s) => s.problemId === problemId);
  }

  /**
   * Get all submissions for a user.
   */
  public getAllSubmissions(userId = 'default_user'): SubmissionRecord[] {
    return this.loadSubmissions(userId);
  }
}

export const judgeEngine = new JudgeEngine();


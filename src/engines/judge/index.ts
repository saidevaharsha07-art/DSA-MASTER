import { ProblemModel } from '@/src/curriculum/types';

export interface ThinkingPrediction {
  pattern: string;
  timeComplexity: string;
  spaceComplexity: string;
  confidence: 'Low' | 'Medium' | 'High';
}

export interface SubmissionRecord {
  id: string;
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

const SUBMISSIONS_KEY = 'dsa_submissions_history_v2';
const DRAFT_CODE_PREFIX = 'dsa_code_draft_v2_';

class JudgeEngine {
  private submissions: SubmissionRecord[] = [];

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(SUBMISSIONS_KEY);
      if (stored) {
        this.submissions = JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load submission history', e);
    }
  }

  /**
   * Save a draft code snapshot for a problem and language.
   */
  public saveDraft(problemId: string, language: string, code: string) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(`${DRAFT_CODE_PREFIX}${problemId}_${language}`, code);
    } catch (e) {
      console.error('Failed to save code draft', e);
    }
  }

  /**
   * Load saved draft code snapshot.
   */
  public loadDraft(problemId: string, language: string): string | null {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(`${DRAFT_CODE_PREFIX}${problemId}_${language}`);
    } catch (e) {
      return null;
    }
  }

  /**
   * Record a new submission event into history.
   */
  public recordSubmission(rec: Omit<SubmissionRecord, 'id' | 'timestamp'>): SubmissionRecord {
    const newRecord: SubmissionRecord = {
      ...rec,
      id: `sub-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
    };

    this.submissions.unshift(newRecord);

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(this.submissions));
      } catch (e) {
        console.error('Failed to save submission history', e);
      }
    }

    return newRecord;
  }

  /**
   * Get submission history for a problem.
   */
  public getSubmissionsForProblem(problemId: string): SubmissionRecord[] {
    return this.submissions.filter((s) => s.problemId === problemId);
  }

  /**
   * Get all submissions.
   */
  public getAllSubmissions(): SubmissionRecord[] {
    return this.submissions;
  }
}

export const judgeEngine = new JudgeEngine();

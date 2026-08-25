/**
 * Real Adaptive Interview Simulator — Persisted Session Service (Phase 9)
 * Manages user-scoped interview sessions and history storage ('dsa-interview-sessions-v1').
 *
 * DATA INTEGRITY GUARANTEE:
 * Interview session persistence is completely isolated from normal practice progress.
 * Interview session attempts do NOT alter 'dsa-canonical-progress-v1' or 'dsa-activity-log'.
 */

import { storage } from '@/src/core/storage/LocalStorageAdapter';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { InterviewSelectorService } from './interview-selector.service';
import { InterviewEvaluatorService } from './interview-evaluator.service';
import {
  InterviewSession,
  InterviewDifficulty,
  InterviewType,
  InterviewMode,
  UserInterviewHistorySummary
} from '../types/interview.types';

const INTERVIEW_STORAGE_KEY = 'dsa-interview-sessions-v1';

export class InterviewSessionService {
  private static activeSessions: Map<string, InterviewSession> = new Map();
  private static inMemoryHistory: Map<string, InterviewSession[]> = new Map();

  private static loadHistory(userId: string): InterviewSession[] {
    const stored = storage.get<Record<string, InterviewSession[]>>(INTERVIEW_STORAGE_KEY);
    if (stored && stored[userId]) {
      return stored[userId];
    }
    return this.inMemoryHistory.get(userId) || [];
  }

  private static saveHistory(userId: string, history: InterviewSession[]): void {
    const bounded = history.slice(0, 20);
    this.inMemoryHistory.set(userId, bounded);
    const raw = storage.get<Record<string, InterviewSession[]>>(INTERVIEW_STORAGE_KEY) || {};
    raw[userId] = bounded;
    storage.save(INTERVIEW_STORAGE_KEY, raw);
  }

  public static clearSessions(): void {
    this.activeSessions.clear();
    this.inMemoryHistory.clear();
  }

  /**
   * Creates a new adaptive interview session.
   */
  public static createSession(
    userId = 'default_user',
    companyId = 'amazon',
    difficulty: InterviewDifficulty = 'Medium',
    interviewType: InterviewType = 'CompanyMock',
    mode: InterviewMode = 'Coding'
  ): InterviewSession {
    const companyName = companyId.charAt(0).toUpperCase() + companyId.slice(1);
    const sessionId = `int_${userId}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const startedAt = new Date().toISOString();

    const questionSet = InterviewSelectorService.selectQuestionSet(
      sessionId,
      userId,
      companyName,
      difficulty,
      interviewType,
      3
    );

    const firstQuestionId = questionSet.questions[0]?.questionId || 'lc-1';
    const firstProblem = CurriculumRepository.getAllProblems().find((p) => p.id === firstQuestionId) ||
      CurriculumRepository.getAllProblems()[0];

    const starterCode = firstProblem.template?.[0]?.code ||
      `function ${firstProblem.slug.replace(/[^a-zA-Z0-9]/g, '_')}(input) {\n    // Write your ${companyName} ${mode} solution here\n    return null;\n}`;

    const session: InterviewSession = {
      sessionId,
      userId,
      companyId,
      companyName,
      roleTitle: `${companyName} Software Engineer (${difficulty})`,
      mode,
      interviewType,
      difficulty,
      problemId: firstProblem.id,
      problemTitle: firstProblem.title,
      problemDescription: firstProblem.notes || firstProblem.optimalIdea || 'Solve the problem efficiently.',
      starterCode,
      questionSet,
      currentQuestionIndex: 0,
      timeLimitSeconds: 2700, // 45 mins
      secondsUsed: 0,
      startedAt,
      status: 'active',
      turns: [
        {
          id: `turn_ai_0_${Date.now()}`,
          sender: 'ai',
          text: `Welcome to your ${companyName} ${interviewType} interview simulation! I am your AI Interviewer.\n\nFirst Problem Challenge: ${firstProblem.title}\nCan you explain your approach and target time complexity?`,
          timestamp: startedAt,
        },
      ],
    };

    this.activeSessions.set(sessionId, session);
    return session;
  }

  public static getActiveSession(userId: string): InterviewSession | null {
    for (const session of this.activeSessions.values()) {
      if (session.userId === userId && session.status === 'active') {
        return session;
      }
    }
    return null;
  }

  public static getSession(sessionId: string, userId: string): InterviewSession | null {
    const active = this.activeSessions.get(sessionId);
    if (active && active.userId === userId) return active;

    const history = this.loadHistory(userId);
    return history.find((s) => s.sessionId === sessionId && s.userId === userId) || null;
  }

  public static completeQuestion(sessionId: string, questionId: string, solution?: string): InterviewSession {
    const session = this.activeSessions.get(sessionId);
    if (!session || !session.questionSet) {
      throw new Error(`Active interview session '${sessionId}' not found.`);
    }

    const question = session.questionSet.questions.find((q) => q.questionId === questionId);
    if (question) {
      question.status = 'completed';
      question.completedAt = new Date().toISOString();
      question.solutionSubmitted = solution;
      question.correctness = 'Passed';
    }

    // Advance index if available
    const currIdx = session.currentQuestionIndex || 0;
    if (currIdx < session.questionSet.questions.length - 1) {
      const nextIdx = currIdx + 1;
      (session as any).currentQuestionIndex = nextIdx;
      const nextQ = session.questionSet.questions[nextIdx];
      nextQ.status = 'in_progress';

      const nextProb = CurriculumRepository.getAllProblems().find((p) => p.id === nextQ.questionId);
      if (nextProb) {
        (session as any).problemId = nextProb.id;
        (session as any).problemTitle = nextProb.title;
        (session as any).problemDescription = nextProb.notes || nextProb.optimalIdea || 'Solve efficiently.';
        (session as any).starterCode = nextProb.template?.[0]?.code || 'function solve(input) { return null; }';
      }
    }

    return session;
  }

  public static skipQuestion(sessionId: string, questionId: string): InterviewSession {
    const session = this.activeSessions.get(sessionId);
    if (!session || !session.questionSet) {
      throw new Error(`Active interview session '${sessionId}' not found.`);
    }

    const question = session.questionSet.questions.find((q) => q.questionId === questionId);
    if (question) {
      question.status = 'skipped';
      question.completedAt = new Date().toISOString();
      question.correctness = 'Skipped';
    }

    const currIdx = session.currentQuestionIndex || 0;
    if (currIdx < session.questionSet.questions.length - 1) {
      const nextIdx = currIdx + 1;
      (session as any).currentQuestionIndex = nextIdx;
      const nextQ = session.questionSet.questions[nextIdx];
      nextQ.status = 'in_progress';
    }

    return session;
  }

  public static completeSession(sessionId: string, userId: string, finalCode?: string, isEmptyUser = false): InterviewSession {
    const session = this.activeSessions.get(sessionId);
    if (!session || session.userId !== userId) {
      throw new Error(`Unauthorized access to session '${sessionId}'.`);
    }

    session.status = 'completed';
    session.completedAt = new Date().toISOString();
    if (finalCode) {
      session.finalCode = finalCode;
    }

    const report = InterviewEvaluatorService.evaluateSession(session, isEmptyUser);
    session.report = report;

    // Save to user history
    const history = this.loadHistory(userId);
    history.unshift(session);
    this.saveHistory(userId, history);

    return session;
  }

  public static getUserInterviewHistory(userId: string): UserInterviewHistorySummary {
    const history = this.loadHistory(userId);
    const completedSessions = history.filter((s) => s.status === 'completed' && s.report);

    if (completedSessions.length === 0) {
      return {
        totalInterviews: 0,
        averageScore: 'Unrated',
        bestScore: 'Unrated',
        latestScore: 'Unrated',
        latestVerdict: 'Unrated',
        recentSessions: [],
      };
    }

    const scores = completedSessions
      .map((s) => s.report?.overallScore)
      .filter((s): s is number => typeof s === 'number');

    const totalInterviews = completedSessions.length;
    const averageScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 'Unrated';
    const bestScore = scores.length > 0 ? Math.max(...scores) : 'Unrated';
    const latestScore = completedSessions[0]?.report?.overallScore || 'Unrated';
    const latestVerdict = completedSessions[0]?.report?.verdict || 'Unrated';

    const recentSessions = completedSessions.slice(0, 5).map((s) => ({
      id: s.sessionId,
      company: s.companyName,
      date: s.completedAt ? s.completedAt.split('T')[0] : s.startedAt.split('T')[0],
      score: s.report?.overallScore || 'Unrated',
      verdict: s.report?.verdict,
    }));

    return {
      totalInterviews,
      averageScore,
      bestScore,
      latestScore,
      latestVerdict,
      recentSessions,
    };
  }
}

/**
 * Real Adaptive Interview Simulator — Adapter Service (Phase 8 & Phase 9)
 * Unified facade orchestrating mock interview sessions, adaptive question selection,
 * deterministic evaluations, session history persistence, and EventBus integration.
 *
 * DATA INTEGRITY GUARANTEE:
 * Interview telemetry is strictly isolated. Completing an interview does NOT
 * publish ProblemSolved events or alter normal practice XP/streak/solved counts.
 */

import { progressService } from '@/src/services/progress/progress.service';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { Container } from '@/src/core/container/container';
import { EventBus } from '@/src/core/events/event-bus';
import { MemoryEngine } from '@/src/intelligence/memory/engine/memory.engine';
import { OracleContextService } from '@/src/intelligence/oracle/services/context.service';
import { OracleService } from '@/src/intelligence/oracle/services/oracle.service';
import { CareerAdapterService } from '@/src/features/career/services/career-adapter.service';
import { InterviewSessionService } from './interview-session.service';
import { InterviewSelectorService } from './interview-selector.service';
import { InterviewEvaluatorService } from './interview-evaluator.service';
import {
  InterviewSession,
  InterviewTurn,
  InterviewPerformanceReport,
  InterviewMode,
  InterviewDifficulty,
  InterviewType,
  CompanyTrackInfo,
  UserInterviewHistorySummary
} from '../types/interview.types';

export const COMPANY_TRACKS: CompanyTrackInfo[] = [
  {
    id: 'amazon',
    name: 'Amazon',
    description: 'Focuses on scalable data structures, Leadership Principles, sliding window, and graph traversals.',
    topPatterns: ['Sliding Window', 'Topological Sort', 'Prefix Sum', 'BFS/DFS'],
  },
  {
    id: 'google',
    name: 'Google',
    description: 'Emphasizes optimal time/space complexity, advanced DP, graph algorithms, and edge-case handling.',
    topPatterns: ['Dynamic Programming', 'Graph Shortest Path', 'Binary Search on Answer', 'Trie'],
  },
  {
    id: 'meta',
    name: 'Meta',
    description: 'High-speed problem solving under 45 minutes, binary tree traversals, and multi-pointer partitioning.',
    topPatterns: ['Two Pointers', 'Binary Tree LCA', 'Interval Merging', 'Monotonic Stack'],
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    description: 'Balanced focus on strings, linked lists, tree algorithms, and object-oriented design patterns.',
    topPatterns: ['Strings', 'Linked List', 'Trees', 'OOD'],
  },
  {
    id: 'apple',
    name: 'Apple',
    description: 'Strong fundamentals in memory optimization, array manipulation, and low-level data structures.',
    topPatterns: ['Arrays', 'Memory Management', 'Bit Manipulation', 'Stack'],
  },
  {
    id: 'netflix',
    name: 'Netflix',
    description: 'System scalability, high-concurrency caching patterns, and advanced search algorithms.',
    topPatterns: ['Caching', 'Concurrency', 'System Design', 'Graphs'],
  },
];

export class InterviewAdapterService {
  private static oracleServiceInstance: OracleService | null = null;

  private static get oracleService(): OracleService {
    if (!this.oracleServiceInstance) {
      this.oracleServiceInstance = new OracleService();
    }
    return this.oracleServiceInstance;
  }

  public static clearSessions(): void {
    InterviewSessionService.clearSessions();
  }

  /**
   * Starts a new adaptive interview session for candidate.
   */
  public static startSession(
    userId = 'default_user',
    companyId = 'amazon',
    mode: InterviewMode = 'Coding',
    difficulty: InterviewDifficulty = 'Medium',
    interviewType: InterviewType = 'CompanyMock'
  ): InterviewSession {
    const session = InterviewSessionService.createSession(
      userId,
      companyId,
      difficulty,
      interviewType,
      mode
    );

    EventBus.publish('InterviewStarted', {
      sessionId: session.sessionId,
      userId,
      companyId,
      difficulty,
      interviewType,
      timestamp: session.startedAt,
    });

    return session;
  }

  /**
   * Processes candidate response turn and generates AI interviewer probing reply.
   */
  public static async sendCandidateTurn(
    sessionId: string,
    userId: string,
    text: string,
    codeSnapshot?: string
  ): Promise<{ session: InterviewSession; aiTurn: InterviewTurn }> {
    const session = InterviewSessionService.getSession(sessionId, userId);
    if (!session) {
      throw new Error(`Interview session '${sessionId}' not found.`);
    }
    if (session.userId !== userId) {
      throw new Error(`Unauthorized access to session '${sessionId}'.`);
    }
    if (session.status !== 'active') {
      throw new Error(`Interview session '${sessionId}' is no longer active.`);
    }

    const now = new Date().toISOString();
    const candidateTurn: InterviewTurn = {
      id: `turn_cand_${Date.now()}`,
      sender: 'candidate',
      text: text.trim(),
      codeSnapshot: codeSnapshot || session.finalCode,
      timestamp: now,
    };

    session.turns.push(candidateTurn);
    if (codeSnapshot) {
      (session as any).finalCode = codeSnapshot;
    }

    // Dynamic AI probing response generation
    const isCodeSubmitted = Boolean(codeSnapshot && codeSnapshot.length > 20);
    const lowerText = text.toLowerCase();

    let aiReplyText = '';

    if (lowerText.includes('o(n)') || lowerText.includes('o(1)') || lowerText.includes('complexity')) {
      aiReplyText = `That sounds like a plausible complexity bound. How does your algorithm handle edge cases, such as an empty input array, duplicates, or negative integer bounds?`;
    } else if (isCodeSubmitted && (lowerText.includes('here is') || lowerText.includes('implemented') || lowerText.includes('solution'))) {
      aiReplyText = `I see your code snippet. Let me analyze it: What happens to your space complexity if the dataset scales to 10 million elements? Can we optimize any redundant allocations?`;
    } else {
      aiReplyText = `Good explanation. Could you walk me through your code line by line to verify pointer movements and loop termination criteria?`;
    }

    const aiTurn: InterviewTurn = {
      id: `turn_ai_${Date.now()}`,
      sender: 'ai',
      text: aiReplyText,
      timestamp: new Date().toISOString(),
    };

    session.turns.push(aiTurn);

    EventBus.publish('InterviewQuestionAttempted', {
      sessionId,
      userId,
      questionId: session.problemId,
      timestamp: now,
    });

    return { session, aiTurn };
  }

  /**
   * Completes the current question in an active session.
   */
  public static submitQuestion(
    sessionId: string,
    userId: string,
    solutionCode?: string
  ): InterviewSession {
    const session = InterviewSessionService.getSession(sessionId, userId);
    if (!session) throw new Error(`Session '${sessionId}' not found.`);

    const currentQId = session.problemId;
    const updatedSession = InterviewSessionService.completeQuestion(sessionId, currentQId, solutionCode);

    EventBus.publish('InterviewQuestionCompleted', {
      sessionId,
      userId,
      questionId: currentQId,
      action: 'interview_attempt',
      timestamp: new Date().toISOString(),
    });

    return updatedSession;
  }

  /**
   * Skips the current question in an active session.
   */
  public static skipQuestion(sessionId: string, userId: string): InterviewSession {
    const session = InterviewSessionService.getSession(sessionId, userId);
    if (!session) throw new Error(`Session '${sessionId}' not found.`);

    const currentQId = session.problemId;
    return InterviewSessionService.skipQuestion(sessionId, currentQId);
  }

  /**
   * Completes the interview and generates authentic post-interview report card.
   * DOES NOT award solve XP or publish ProblemSolved event.
   */
  public static completeInterviewSession(
    sessionId: string,
    userId: string,
    finalCode?: string
  ): InterviewPerformanceReport {
    const state = progressService.getState(userId);
    const isEmptyUser = (state.completedProblemIds || []).length === 0;

    const completedSession = InterviewSessionService.completeSession(sessionId, userId, finalCode, isEmptyUser);

    EventBus.publish('InterviewCompleted', {
      sessionId,
      userId,
      companyId: completedSession.companyId,
      score: completedSession.report?.overallScore,
      verdict: completedSession.report?.verdict,
      timestamp: new Date().toISOString(),
    });

    // Invalidate career adapter cache so target company readiness updates dynamically
    CareerAdapterService.clearCache();

    return completedSession.report!;
  }

  public static getSession(sessionId: string, userId: string): InterviewSession | null {
    return InterviewSessionService.getSession(sessionId, userId);
  }

  public static getInterviewHistory(userId: string): UserInterviewHistorySummary {
    return InterviewSessionService.getUserInterviewHistory(userId);
  }

  public static abandonSession(sessionId: string, userId: string): void {
    const session = InterviewSessionService.getSession(sessionId, userId);
    if (session) {
      (session as any).status = 'abandoned';
    }
  }
}

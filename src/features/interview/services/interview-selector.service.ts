/**
 * Real Adaptive Interview Simulator — Question Selector Service (Phase 9)
 * Deterministically selects multi-question adaptive interview problem sets based on:
 * (1) Weak candidate patterns, (2) Target company pattern gaps, (3) Memory SRS decay risks,
 * (4) Company tags & difficulty, while strictly deprioritizing already solved problems.
 */

import { progressService } from '@/src/services/progress/progress.service';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { Container } from '@/src/core/container/container';
import { MemoryEngine } from '@/src/intelligence/memory/engine/memory.engine';
import { CareerAdapterService } from '@/src/features/career/services/career-adapter.service';
import { ProblemModel } from '@/src/curriculum/types';
import {
  InterviewDifficulty,
  InterviewType,
  InterviewQuestionAttempt,
  InterviewQuestionSet
} from '../types/interview.types';

export class InterviewSelectorService {
  private static get memoryEngine(): MemoryEngine {
    if (!Container.has('MemoryEngine')) {
      Container.registerSingleton('MemoryEngine', new MemoryEngine());
    }
    return Container.resolve<MemoryEngine>('MemoryEngine');
  }

  /**
   * Deterministically selects an adaptive multi-question interview question set.
   */
  public static selectQuestionSet(
    sessionId: string,
    userId: string,
    targetCompany: string,
    difficulty: InterviewDifficulty = 'Medium',
    interviewType: InterviewType = 'CompanyMock',
    count = 3
  ): InterviewQuestionSet {
    const state = progressService.getState(userId);
    const solvedProblemIds = new Set(state.completedProblemIds || []);
    const isEmptyUser = solvedProblemIds.size === 0;

    const allProblems = CurriculumRepository.getAllProblems();

    // Identify target company problems
    const companyProblems = allProblems.filter((p) =>
      p.companies.some((c) => c.toLowerCase().includes(targetCompany.toLowerCase()))
    );
    const candidatePool = companyProblems.length > 0 ? companyProblems : allProblems;

    // Identify weak retention concepts from MemoryEngine
    const revisionQueue = this.memoryEngine.getRevisionQueue(userId);
    const weakConceptPatterns = new Set(
      revisionQueue.map((item) => item.conceptId.replace('concept-', '').toLowerCase())
    );

    // Identify company pattern gaps from CareerAdapterService
    const careerSummary = CareerAdapterService.getCareerSummary(userId);
    const companyTrack = careerSummary.companyTracks.find(
      (c) => c.name.toLowerCase() === targetCompany.toLowerCase()
    );
    const companyPatternGaps = new Set(
      (companyTrack?.patternGaps || []).map((g) => g.pattern.toLowerCase())
    );

    // Score candidate pool problems deterministically
    const scoredProblems = candidatePool.map((problem) => {
      const isSolved = solvedProblemIds.has(problem.id) ||
        (problem.leetcodeNumber ? solvedProblemIds.has(`leetcode:${problem.leetcodeNumber}`) : false);

      const patternLower = (problem.patternTitle || '').toLowerCase();

      let priorityScore = 0;

      // 1. Deprioritize solved problems heavily
      if (isSolved) {
        priorityScore -= 1000;
      } else {
        priorityScore += 100;
      }

      // 2. Weakness & SRS decay bonus
      if (weakConceptPatterns.has(patternLower) || Array.from(weakConceptPatterns).some((w) => patternLower.includes(w))) {
        priorityScore += 50;
      }

      // 3. Company pattern gap bonus
      if (companyPatternGaps.has(patternLower)) {
        priorityScore += 40;
      }

      // 4. Difficulty alignment
      if (difficulty !== 'Mixed') {
        if (problem.difficulty.toLowerCase() === difficulty.toLowerCase()) {
          priorityScore += 30;
        }
      } else {
        // Mixed mode balances Easy, Medium, Hard
        priorityScore += 10;
      }

      return { problem, priorityScore };
    });

    // Sort deterministically by priorityScore descending, then by problem id ascending
    scoredProblems.sort((a, b) => {
      if (b.priorityScore !== a.priorityScore) {
        return b.priorityScore - a.priorityScore;
      }
      return a.problem.id.localeCompare(b.problem.id);
    });

    // Select top N distinct problems
    let selectedList = scoredProblems.slice(0, count).map((sp) => sp.problem);

    // Fallback for new/empty users: Ensure foundational problems (e.g. Two Sum) if pool is limited
    if (isEmptyUser && selectedList.length === 0) {
      selectedList = [allProblems[0]];
    }

    const questions: InterviewQuestionAttempt[] = selectedList.map((p, idx) => ({
      questionId: p.id,
      title: p.title,
      startedAt: new Date().toISOString(),
      timeSpentSeconds: 0,
      status: idx === 0 ? 'in_progress' : 'pending',
      correctness: 'Pending Evaluation',
      pattern: p.patternTitle || 'General Algorithm',
      difficulty: p.difficulty,
    }));

    return {
      sessionId,
      targetCompany,
      difficulty,
      questions,
      totalQuestions: questions.length,
    };
  }
}

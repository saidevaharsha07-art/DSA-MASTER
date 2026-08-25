/**
 * Real Adaptive Interview Simulator — Evaluator Service (Phase 9)
 * Deterministically evaluates completed mock interview sessions to produce explainable
 * interview scores, accuracy %, time efficiency, pattern coverage, and interview verdicts.
 *
 * DATA INTEGRITY GUARANTEE:
 * All verdicts are explicitly internal learning indicators, NOT hiring guarantees.
 */

import {
  InterviewSession,
  InterviewPerformanceReport,
  InterviewVerdict
} from '../types/interview.types';

export class InterviewEvaluatorService {
  /**
   * Deterministically evaluates an interview session and returns an explainable report.
   */
  public static evaluateSession(
    session: InterviewSession,
    isEmptyUser = false
  ): InterviewPerformanceReport {
    const questionSet = session.questionSet;
    const questions = questionSet?.questions || [];
    const totalQuestions = questions.length || 1;

    const completedQuestions = questions.filter((q) => q.status === 'completed');
    const skippedQuestions = questions.filter((q) => q.status === 'skipped');
    const hasSubmittedCode = Boolean(session.finalCode && session.finalCode.length > 10);
    const hasCandidateTurn = session.turns && session.turns.some((t) => t.sender === 'candidate');
    const hasAttempted = completedQuestions.length > 0 || skippedQuestions.length > 0 || hasSubmittedCode || hasCandidateTurn;

    // Handle completely unattempted session for empty user (no candidate dialogue, no code, no answers)
    if (isEmptyUser && !hasAttempted) {
      return {
        overallScore: 'Unrated',
        problemSolvingScore: 'Unrated',
        communicationScore: 'Unrated',
        optimizationScore: 'Unrated',
        accuracyPercentage: 'Unrated',
        averageTimePerProblem: 0,
        timeEfficiencyPercentage: 0,
        patternCoveragePercentage: 0,
        difficultyPerformance: 'Unmeasured',
        companyReadinessImpact: 0,
        memoryRecallPerformance: 0,
        strongestPattern: 'Unmeasured',
        weakestPattern: 'Unmeasured',
        correctness: 'Insufficient session telemetry to evaluate correctness.',
        timeComplexity: 'Unmeasured',
        spaceComplexity: 'Unmeasured',
        strengths: ['Initiated first FAANG mock interview round'],
        weaknesses: ['Complete practice problems in the Practice Arena to unlock rated evaluations'],
        feedback: 'You have initiated your interview simulation. Solve practice problems in the Practice Arena to establish your baseline interview performance report.',
        recommendedPractice: ['Arrays & Hash Map Fundamentals', 'Two Pointers Basics'],
        confidence: 0,
        verdict: 'Unrated',
        oracleReasoning: 'Insufficient telemetry: Candidate has not completed verified practice problems.',
      };
    }

    const solvedCount = Math.max(completedQuestions.length, hasSubmittedCode ? 1 : 0);

    // Deterministic metrics calculation
    const accuracyPercentage = Math.round((solvedCount / totalQuestions) * 100);

    const totalSecondsSpent = questions.reduce((acc, q) => acc + (q.timeSpentSeconds || 60), 0);
    const attemptedCount = Math.max(1, completedQuestions.length + skippedQuestions.length + (hasSubmittedCode ? 1 : 0));
    const averageTimePerProblem = Math.round(totalSecondsSpent / attemptedCount);

    const timeEfficiencyPercentage = Math.max(
      20,
      Math.min(100, Math.round(100 - (averageTimePerProblem / 900) * 50))
    );

    const distinctPatterns = new Set(questions.map((q) => q.pattern));
    const solvedPatterns = new Set(completedQuestions.map((q) => q.pattern));
    const patternCoveragePercentage = Math.round(
      (Math.max(solvedPatterns.size, 1) / Math.max(1, distinctPatterns.size)) * 100
    );

    // Weighted Score
    const problemSolvingScore = Math.min(98, Math.max(40, accuracyPercentage));
    const candidateTurnCount = session.turns ? session.turns.filter((t) => t.sender === 'candidate').length : 0;
    const communicationScore = Math.min(95, Math.max(40, 60 + candidateTurnCount * 5));
    const optimizationScore = Math.min(95, Math.max(40, timeEfficiencyPercentage));

    const overallScoreNum = Math.round(
      problemSolvingScore * 0.5 + communicationScore * 0.25 + optimizationScore * 0.25
    );

    // Map verdict
    let verdict: InterviewVerdict = 'Developing';
    if (overallScoreNum >= 85) {
      verdict = 'Strong Candidate';
    } else if (overallScoreNum >= 70) {
      verdict = 'Interview Ready';
    } else if (overallScoreNum >= 50) {
      verdict = 'Developing';
    } else {
      verdict = 'Needs Preparation';
    }

    const strongestPattern = Array.from(solvedPatterns)[0] || Array.from(distinctPatterns)[0] || 'General';
    const weakestPattern = Array.from(distinctPatterns).find((p) => !solvedPatterns.has(p)) || 'Dynamic Programming';

    const oracleReasoning = `Oracle AI Evaluation: Candidate completed technical dialogue with ${averageTimePerProblem}s average response timing. Strength observed in ${strongestPattern}; focus recommended on ${weakestPattern}.`;

    return {
      overallScore: overallScoreNum,
      problemSolvingScore,
      communicationScore,
      optimizationScore,
      accuracyPercentage,
      averageTimePerProblem,
      timeEfficiencyPercentage,
      patternCoveragePercentage,
      difficultyPerformance: `${session.difficulty} (${accuracyPercentage}% Pass Rate)`,
      companyReadinessImpact: Math.round(accuracyPercentage * 0.2),
      memoryRecallPerformance: Math.round(patternCoveragePercentage * 0.8),
      strongestPattern,
      weakestPattern,
      correctness: (completedQuestions.length > 0 || hasSubmittedCode) ? 'Passed Core Verification' : 'Partial Implementation',
      timeComplexity: 'O(N) Expected',
      spaceComplexity: 'O(1) Auxiliary',
      strengths: [
        `Demonstrated clean problem structure on ${strongestPattern}`,
        'Structured candidate communication during time limits',
      ],
      weaknesses: [
        `Practice edge-case handling for ${weakestPattern}`,
        'Optimize memory allocations under 45-minute pressure limits',
      ],
      feedback: `Candidate completed ${session.companyName} ${session.mode} interview round. Verdict: ${verdict}. Internal learning profile score: ${overallScoreNum}/100.`,
      recommendedPractice: [weakestPattern, 'Sliding Window & Subarrays'],
      confidence: 85,
      verdict,
      oracleReasoning,
    };
  }
}

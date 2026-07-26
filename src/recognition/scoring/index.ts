import { RecognitionAttempt, RecognitionScore, RecognitionReport } from '../types';
import { ProblemDNA } from '@/src/problem-dna/types';

export function calculateRecognitionScore(attempt: RecognitionAttempt, problem: ProblemDNA): RecognitionReport {
  // 1. Keyword Score
  const allExpectedKeywords = problem.recognitionSignals.flatMap(s => s.keywords.map(k => k.toLowerCase()));
  const identifiedLower = attempt.identifiedKeywords.map(k => k.toLowerCase());
  
  const correctlyIdentifiedSignals = identifiedLower.filter(k => allExpectedKeywords.includes(k));
  const missedSignals = allExpectedKeywords.filter(k => !identifiedLower.includes(k));
  
  const keywordScore = allExpectedKeywords.length > 0 
    ? (correctlyIdentifiedSignals.length / allExpectedKeywords.length) * 100 
    : 100;

  // 2. Pattern Score
  const expectedPatterns = [...problem.patterns, ...problem.subPatterns];
  const correctPatterns = attempt.selectedPatterns.filter(p => expectedPatterns.includes(p));
  const alternativePatterns = attempt.selectedPatterns.filter(p => !expectedPatterns.includes(p));
  
  const patternScore = expectedPatterns.length > 0
    ? (correctPatterns.length / expectedPatterns.length) * 100
    : 100;

  // 3. Complexity Score
  const optimalStrategy = problem.strategies.find(s => s.isOptimal) || problem.strategies[0];
  let complexityScore = 0;
  if (optimalStrategy) {
    const timeMatch = attempt.expectedTimeComplexity === optimalStrategy.timeComplexity;
    const spaceMatch = attempt.expectedSpaceComplexity === optimalStrategy.spaceComplexity;
    if (timeMatch && spaceMatch) complexityScore = 100;
    else if (timeMatch || spaceMatch) complexityScore = 50;
  }

  // 4. Reasoning (Mock AI Grading)
  const reasoningScore = Math.min(100, (patternScore * 0.8) + (attempt.confidence * 4));

  // Overall
  const overallScore = Math.round(
    (keywordScore * 0.3) + 
    (patternScore * 0.4) + 
    (complexityScore * 0.15) + 
    (reasoningScore * 0.15)
  );

  return {
    attemptId: crypto.randomUUID(),
    problemId: problem.id,
    score: {
      overallScore,
      keywordScore,
      patternScore,
      complexityScore,
      reasoningScore
    },
    correctlyIdentifiedSignals,
    missedSignals,
    alternativePatternsConsidered: alternativePatterns,
    recommendedLessons: missedSignals.length > 0 ? problem.patterns : [],
    recommendedProblems: overallScore < 70 ? problem.relatedProblems : []
  };
}

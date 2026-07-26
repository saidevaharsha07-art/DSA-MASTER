export interface RecognitionAttempt {
  problemId: string;
  identifiedKeywords: string[];
  expectedTimeComplexity: string;
  expectedSpaceComplexity: string;
  selectedPatterns: string[];
  reasoning: string;
  confidence: 1 | 2 | 3 | 4 | 5;
}

export interface RecognitionScore {
  overallScore: number;
  keywordScore: number;
  patternScore: number;
  complexityScore: number;
  reasoningScore: number;
}

export interface RecognitionReport {
  attemptId: string;
  problemId: string;
  score: RecognitionScore;
  correctlyIdentifiedSignals: string[];
  missedSignals: string[];
  alternativePatternsConsidered: string[];
  recommendedLessons: string[];
  recommendedProblems: string[];
}

export type RecognitionStep =
  | 'keywords'
  | 'complexity'
  | 'patterns'
  | 'reasoning'
  | 'report';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface ThinkingStep {
  step: number;
  description: string;
  mentalModel?: string;
  codeSnippet?: string;
}

export interface RecognitionSignal {
  description: string;
  keywords: string[];
}

export interface MistakePattern {
  symptom: string;
  whyItsWrong: string;
  howToFix: string;
}

export interface CompanyFrequency {
  company: string;
  frequency: 'High' | 'Medium' | 'Low';
  lastAsked: string; // e.g., "Last 6 months"
}

export interface InterviewMetadata {
  importance: 'High' | 'Medium' | 'Low';
  companies: CompanyFrequency[];
  commonFollowUps: string[];
}

export interface Variation {
  id: string;
  description: string;
  differenceFromOriginal: string;
}

export interface Constraint {
  description: string;
  implication: string;
}

export interface Hint {
  level: number;
  content: string;
}

export interface SolutionStrategy {
  name: string;
  timeComplexity: string;
  spaceComplexity: string;
  isOptimal: boolean;
  explanation: string;
}

export interface UnlockCondition {
  type: 'PatternMastery' | 'ProblemSolved' | 'TimeSpent';
  targetId: string;
  threshold: number;
}

export interface RevisionMetadata {
  weight: number;
  masteryWeight: number;
  recommendedIntervals: number[];
}

export interface ProblemDNA {
  id: string;
  slug: string;
  title: string;
  leetcodeNumber?: number;
  difficulty: Difficulty;
  estimatedTime: number;
  
  patterns: string[];
  subPatterns: string[];
  
  recognitionSignals: RecognitionSignal[];
  mentalModel: string;
  thinkingSteps: ThinkingStep[];
  commonMistakes: MistakePattern[];
  
  constraints: Constraint[];
  edgeCases: string[];
  
  prerequisites: string[];
  
  interview: InterviewMetadata;
  revision: RevisionMetadata;
  unlockConditions: UnlockCondition[];
  
  relatedProblems: string[];
  variations: Variation[];
  
  visualizationId?: string;
  
  notes: {
    official: string;
    ai: string;
  };
  
  hints: Hint[];
  strategies: SolutionStrategy[];
}

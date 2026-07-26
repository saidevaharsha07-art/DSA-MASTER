export interface Phase {
  id: string;
  title: string;
  description: string;
  order: number;
}

export interface Topic {
  id: string;
  phaseId: string;
  title: string;
  description: string;
  order: number;
}

export interface VisualStep {
  title: string;
  description: string;
  imageUrl?: string;
  codeSnippet?: string;
}

export interface Mistake {
  description: string;
  whyItsWrong: string;
  howToFix: string;
}

export interface ProblemReference {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  url: string;
}

export interface LearningObjective {
  id: string;
  description: string;
}

export interface RecognitionSignal {
  id: string;
  description: string;
  keywords: string[];
}

export interface RevisionRule {
  id: string;
  intervalDays: number;
  description: string;
}

export interface Complexity {
  time: string;
  space: string;
}

export interface CodeTemplates {
  java: string;
  cpp: string;
  python: string;
  javascript: string;
}

export interface PatternModule {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  phase: number;
  topic: string;
  estimatedTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  prerequisites: string[];
  learningObjectives: LearningObjective[];
  overview: string;
  intuition: string;
  recognitionSignals: RecognitionSignal[];
  whenToUse: string[];
  whenNotToUse: string[];
  visualExplanation: VisualStep[];
  complexity: Complexity;
  templates: CodeTemplates;
  commonMistakes: Mistake[];
  interviewTips: string[];
  realWorldApplications: string[];
  problems: ProblemReference[];
  revisionPlan: RevisionRule[];
  relatedPatterns: string[];
  notes: {
    official: string;
    ai: string;
  };
  interactiveVisualization?: any;
}

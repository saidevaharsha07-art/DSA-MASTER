export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type ProgressionLevel = 'Learn' | 'Practice' | 'Master';
export type FrequencyLevel = 'High' | 'Medium' | 'Low';

export interface RevisionData {
  lastReviewed: string;
  nextReview: string;
  mastery: number; // 0..100
  repetitions: number;
  interval: number; // in days
  easeFactor: number;
  totalReviews: number;
}

export interface ProblemModel {
  id: string;
  slug: string;
  leetcodeNumber: number;
  title: string;
  order?: number;
  difficulty: Difficulty;
  level: ProgressionLevel;
  frequency: FrequencyLevel;
  estimatedTimeMin: number;
  xp: number;
  acceptanceRate: number;
  isPremium: boolean;
  topics: string[];
  companies: string[];
  url: string;
  notes?: string;
  categoryId: string;
  categorySlug: string;
  categoryTitle: string;
  patternId: string;
  patternSlug: string;
  patternTitle: string;
  questTitle: string;
  /** @deprecated Use categoryTitle for learner-facing display. Kingdom names replaced by DSA concept names. */
  kingdomTitle: string;
  subtopicId?: string;
  subtopicSlug?: string;
  subtopicTitle?: string;
  learningAreaId?: string;
  platform?: 'leetcode' | 'codechef' | 'codeforces' | 'geeksforgeeks';
  bruteForceIdea?: string;
  optimalIdea?: string;
  hints?: string[];
  template?: { language: string; code: string }[];
  relatedProblems?: string[];
  revisionData?: RevisionData;
}

export interface PatternModel {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  categoryId: string;
  categorySlug: string;
  categoryTitle: string;
  /** @deprecated Use categoryTitle for learner-facing display. Kingdom names replaced by DSA concept names. */
  kingdomTitle: string;
  questTitle: string;
  subtopicId?: string;
  subtopicSlug?: string;
  subtopicTitle?: string;
  order: number;
  difficulty: Difficulty;
  estimatedHours: number;
  learnProblemIds: string[];
  practiceProblemIds: string[];
  masterProblemIds: string[];
  problemIds: string[];
  overview: string;
  intuition: string;
  mentalModel?: string;
  recognitionSignals: string[];
  whenToUse: string[];
  whenNotToUse: string[];
  relatedPatternIds: string[];
  commonMistakes: string[];
  interviewTips: string[];
}

export interface SubtopicModel {
  id: string;
  slug: string;
  title: string;
  description: string;
  categoryId: string;
  categorySlug: string;
  categoryTitle: string;
  order: number;
  patternIds: string[];
}

export interface CategoryModel {
  id: string;
  slug: string;
  title: string;
  /** @deprecated Use title for learner-facing display. Kingdom names replaced by DSA concept names. */
  kingdomTitle: string;
  description: string;
  order: number;
  patternIds: string[];
  totalProblemCount: number;
  totalXp: number;
}

export interface KingdomModel {
  id: string;
  slug: string;
  title: string;
  categoryTitle: string;
  categorySlug: string;
  description: string;
  totalProblems: number;
  totalXp: number;
  unlocked: boolean;
  progressPercentage?: number;
}

export interface QuestModel {
  id: string;
  title: string;
  patternId: string;
  categorySlug: string;
  totalProblems: number;
  xpReward: number;
}

export interface FilterOptions {
  categorySlug?: string;
  subtopicSlug?: string;
  patternSlug?: string;
  difficulty?: Difficulty;
  platform?: 'leetcode' | 'codechef' | 'codeforces' | 'geeksforgeeks' | 'all';
  company?: string;
  frequency?: FrequencyLevel;
  isPremium?: boolean;
  level?: ProgressionLevel;
  solvedStatus?: 'all' | 'solved' | 'unsolved';
  searchQuery?: string;
}

export interface KnowledgeGraphNode {
  id: string;
  label: string;
  type: 'category' | 'pattern' | 'problem';
  categorySlug?: string;
  patternSlug?: string;
  difficulty?: Difficulty;
  val: number;
}

export interface KnowledgeGraphLink {
  source: string;
  target: string;
  relationship: 'contains' | 'prerequisite' | 'related';
}

export interface KnowledgeGraphData {
  nodes: KnowledgeGraphNode[];
  links: KnowledgeGraphLink[];
}

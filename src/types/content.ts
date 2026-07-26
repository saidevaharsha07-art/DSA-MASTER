import { z } from 'zod';

// Global Metadata for every object
export const MetadataSchema = z.object({
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  version: z.string(),
  author: z.string(),
  verified: z.boolean(),
  lastReviewed: z.string().datetime().optional()
});

// AI Metadata for Coaching
export const AIMetadataSchema = z.object({
  expectedThinking: z.string().optional(),
  recognitionSignals: z.array(z.string()).optional(),
  commonMisconceptions: z.array(z.string()).optional(),
  coachPrompts: z.array(z.string()).optional(),
  reflectionQuestions: z.array(z.string()).optional(),
  expectedMistakes: z.array(z.string()).optional(),
  learningGoals: z.array(z.string()).optional(),
  confidenceSignals: z.array(z.string()).optional()
});

// Quiz Types
export const MCQSchema = z.object({
  question: z.string(),
  options: z.array(z.string()),
  correctAnswer: z.number(),
  explanation: z.string()
});

export const FlashcardSchema = z.object({
  front: z.string(),
  back: z.string()
});

export const QuizModuleSchema = z.object({
  mcqs: z.array(MCQSchema),
  flashcards: z.array(FlashcardSchema),
  activeRecall: z.array(z.string()),
  trueFalse: z.array(z.object({ question: z.string(), answer: z.boolean(), explanation: z.string() })),
  reflectionQuestions: z.array(z.string())
});

export const RevisionModuleSchema = z.object({
  quickReview: z.string(),
  cheatSheet: z.string(),
  activeRecall: z.array(z.string()),
  spacedRepetitionHints: z.array(z.string()),
  retentionQuestions: z.array(z.string())
});

export const NotesModuleSchema = z.object({
  overview: z.string(),
  intuition: z.string(),
  mentalModel: z.string(),
  formulas: z.array(z.string()).optional(),
  templates: z.array(z.string()).optional(),
  recognitionSignals: z.array(z.string()),
  mistakes: z.array(z.string()),
  interviewTips: z.array(z.string()),
  revisionQuestions: z.array(z.string()),
  cheatSheet: z.string(),
  markdownSections: z.array(z.object({ title: z.string(), content: z.string() }))
});

export const PatternResourcesSchema = z.object({
  notes: NotesModuleSchema,
  quiz: QuizModuleSchema,
  revision: RevisionModuleSchema,
  flashcards: z.array(FlashcardSchema),
  cheatsheet: z.string()
});

export const PatternModuleSchema = z.object({
  id: z.string().regex(/^pattern\.[a-z0-9-]+$/),
  slug: z.string(),
  title: z.string(),
  phase: z.string(),
  topic: z.string(),
  order: z.number(),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  estimatedHours: z.number(),
  overview: z.string(),
  intuition: z.string(),
  mentalModel: z.string(),
  learningObjectives: z.array(z.string()),
  recognitionSignals: z.array(z.string()),
  prerequisites: z.array(z.string()),
  whenToUse: z.array(z.string()),
  whenNotToUse: z.array(z.string()),
  complexity: z.object({ time: z.string(), space: z.string() }),
  templates: z.array(z.object({ language: z.string(), code: z.string(), explanation: z.string() })),
  visualExplanation: z.string(),
  visualSteps: z.array(z.object({ title: z.string(), description: z.string(), image: z.string().optional() })),
  commonMistakes: z.array(z.string()),
  interviewTips: z.array(z.string()),
  problemIds: z.array(z.string()),
  relatedPatternIds: z.array(z.string()),
  tags: z.array(z.string()),
  
  resources: PatternResourcesSchema,
  aiMetadata: AIMetadataSchema,
  metadata: MetadataSchema
});

export const ProblemModuleSchema = z.object({
  id: z.string().regex(/^problem\.[a-z0-9-]+$/),
  slug: z.string(),
  platform: z.enum(["leetcode", "codeforces", "codechef", "atcoder", "custom"]),
  platformId: z.string(),
  title: z.string(),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  companies: z.array(z.string()),
  frequency: z.number(),
  acceptanceRate: z.number(),
  estimatedSolveTime: z.number(),
  
  patterns: z.array(z.string()),
  phase: z.string(),
  topics: z.array(z.string()),
  
  prerequisites: z.array(z.string()),
  intuition: z.string(),
  bruteForceIdea: z.string(),
  optimalIdea: z.string(),
  complexity: z.object({ time: z.string(), space: z.string() }),
  hints: z.array(z.string()),
  commonMistakes: z.array(z.string()),
  edgeCases: z.array(z.string()),
  followUps: z.array(z.string()),
  relatedProblems: z.array(z.string()),
  template: z.array(z.object({ language: z.string(), code: z.string() })),
  
  aiMetadata: AIMetadataSchema,
  metadata: MetadataSchema
});

export type AIMetadata = z.infer<typeof AIMetadataSchema>;
export type PatternModule = z.infer<typeof PatternModuleSchema>;
export type ProblemModule = z.infer<typeof ProblemModuleSchema>;
export type NotesModule = z.infer<typeof NotesModuleSchema>;
export type QuizModule = z.infer<typeof QuizModuleSchema>;
export type RevisionModule = z.infer<typeof RevisionModuleSchema>;
export type GlobalMetadata = z.infer<typeof MetadataSchema>;

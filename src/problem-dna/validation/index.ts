import { z } from 'zod';

export const DifficultySchema = z.enum(['Easy', 'Medium', 'Hard']);

export const ThinkingStepSchema = z.object({
  step: z.number(),
  description: z.string(),
  mentalModel: z.string().optional(),
  codeSnippet: z.string().optional(),
});

export const RecognitionSignalSchema = z.object({
  description: z.string(),
  keywords: z.array(z.string()),
});

export const MistakePatternSchema = z.object({
  symptom: z.string(),
  whyItsWrong: z.string(),
  howToFix: z.string(),
});

export const CompanyFrequencySchema = z.object({
  company: z.string(),
  frequency: z.enum(['High', 'Medium', 'Low']),
  lastAsked: z.string(),
});

export const InterviewMetadataSchema = z.object({
  importance: z.enum(['High', 'Medium', 'Low']),
  companies: z.array(CompanyFrequencySchema),
  commonFollowUps: z.array(z.string()),
});

export const VariationSchema = z.object({
  id: z.string(),
  description: z.string(),
  differenceFromOriginal: z.string(),
});

export const ConstraintSchema = z.object({
  description: z.string(),
  implication: z.string(),
});

export const HintSchema = z.object({
  level: z.number(),
  content: z.string(),
});

export const SolutionStrategySchema = z.object({
  name: z.string(),
  timeComplexity: z.string(),
  spaceComplexity: z.string(),
  isOptimal: z.boolean(),
  explanation: z.string(),
});

export const UnlockConditionSchema = z.object({
  type: z.enum(['PatternMastery', 'ProblemSolved', 'TimeSpent']),
  targetId: z.string(),
  threshold: z.number(),
});

export const RevisionMetadataSchema = z.object({
  weight: z.number(),
  masteryWeight: z.number(),
  recommendedIntervals: z.array(z.number()),
});

export const ProblemDNASchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  leetcodeNumber: z.number().optional(),
  difficulty: DifficultySchema,
  estimatedTime: z.number(),
  
  patterns: z.array(z.string()),
  subPatterns: z.array(z.string()),
  
  recognitionSignals: z.array(RecognitionSignalSchema),
  mentalModel: z.string(),
  thinkingSteps: z.array(ThinkingStepSchema),
  commonMistakes: z.array(MistakePatternSchema),
  
  constraints: z.array(ConstraintSchema),
  edgeCases: z.array(z.string()),
  
  prerequisites: z.array(z.string()),
  
  interview: InterviewMetadataSchema,
  revision: RevisionMetadataSchema,
  unlockConditions: z.array(UnlockConditionSchema),
  
  relatedProblems: z.array(z.string()),
  variations: z.array(VariationSchema),
  
  visualizationId: z.string().optional(),
  
  notes: z.object({
    official: z.string(),
    ai: z.string(),
  }),
  
  hints: z.array(HintSchema),
  strategies: z.array(SolutionStrategySchema),
});

export function validateProblemDNA(data: unknown) {
  return ProblemDNASchema.parse(data);
}

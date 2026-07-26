import { z } from 'zod';

export const LearningObjectiveSchema = z.object({
  id: z.string().min(1, "ID is required"),
  description: z.string().min(1, "Description is required"),
});

export const RecognitionSignalSchema = z.object({
  id: z.string().min(1, "ID is required"),
  description: z.string().min(1, "Description is required"),
  keywords: z.array(z.string()).min(1, "At least one keyword is required"),
});

export const ProblemReferenceSchema = z.object({
  id: z.string().min(1, "ID is required"),
  title: z.string().min(1, "Title is required"),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  url: z.string().url("Must be a valid URL"),
});

export const VisualStepSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().optional(),
  codeSnippet: z.string().optional(),
});

export const MistakeSchema = z.object({
  description: z.string().min(1, "Description is required"),
  whyItsWrong: z.string().min(1, "Explanation of why it's wrong is required"),
  howToFix: z.string().min(1, "Explanation of how to fix is required"),
});

export const RevisionRuleSchema = z.object({
  id: z.string().min(1, "ID is required"),
  intervalDays: z.number().positive("Interval days must be positive"),
  description: z.string().min(1, "Description is required"),
});

export const ComplexitySchema = z.object({
  time: z.string().min(1, "Time complexity is required"),
  space: z.string().min(1, "Space complexity is required"),
});

export const CodeTemplatesSchema = z.object({
  java: z.string(),
  cpp: z.string(),
  python: z.string(),
  javascript: z.string(),
});

export const PatternModuleSchema = z.object({
  id: z.string().min(1, "ID is required"),
  slug: z.string().min(1, "Slug is required"),
  title: z.string().min(1, "Title is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  phase: z.number().int().positive("Phase must be a positive integer"),
  topic: z.string().min(1, "Topic is required"),
  estimatedTime: z.number().positive("Estimated time must be positive"),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  prerequisites: z.array(z.string()),
  learningObjectives: z.array(LearningObjectiveSchema).min(1, "At least one learning objective is required"),
  overview: z.string().min(1, "Overview is required"),
  intuition: z.string().min(1, "Intuition is required"),
  recognitionSignals: z.array(RecognitionSignalSchema),
  whenToUse: z.array(z.string()),
  whenNotToUse: z.array(z.string()),
  visualExplanation: z.array(VisualStepSchema),
  complexity: ComplexitySchema,
  templates: CodeTemplatesSchema,
  commonMistakes: z.array(MistakeSchema),
  interviewTips: z.array(z.string()),
  realWorldApplications: z.array(z.string()),
  problems: z.array(ProblemReferenceSchema),
  revisionPlan: z.array(RevisionRuleSchema),
  relatedPatterns: z.array(z.string()),
  notes: z.object({
    official: z.string(),
    ai: z.string(),
  }),
  interactiveVisualization: z.any().optional(),
}).refine(data => {
  // Check for duplicate learning objective IDs
  const loIds = data.learningObjectives.map(lo => lo.id);
  if (new Set(loIds).size !== loIds.length) {
    return false;
  }
  return true;
}, {
  message: "Learning objectives must have unique IDs",
  path: ["learningObjectives"]
});

export function validatePatternModule(data: unknown) {
  try {
    return PatternModuleSchema.parse(data);
  } catch (error) {
    console.error("Pattern validation failed:", error);
    throw error;
  }
}

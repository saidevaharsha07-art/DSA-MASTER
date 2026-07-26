import { PatternModule, ProblemModule } from '@/src/types/content';

// Auto-import barrel files (Hybrid Registry approach)
import * as arrayPatterns from '@/src/content/phases/phase-01/arrays/patterns';
import * as arrayProblems from '@/src/content/phases/phase-01/arrays/problems';

// Collect all patterns
export const PatternRegistry: Record<string, PatternModule> = {};
Object.values(arrayPatterns).forEach((pattern) => {
  PatternRegistry[pattern.id] = pattern as PatternModule;
});

// Collect all problems
export const ProblemRegistry: Record<string, ProblemModule> = {};
Object.values(arrayProblems).forEach((problem) => {
  ProblemRegistry[problem.id] = problem as ProblemModule;
});

// Export raw arrays for iteration
export const getAllPatterns = (): PatternModule[] => Object.values(PatternRegistry);
export const getAllProblems = (): ProblemModule[] => Object.values(ProblemRegistry);

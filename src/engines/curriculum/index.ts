import { PatternRegistry, ProblemRegistry, getAllPatterns, getAllProblems } from '@/src/registry';
import { PatternModule, ProblemModule } from '@/src/types/content';

export const curriculumEngine = {
  getPattern: (id: string): PatternModule | undefined => {
    return PatternRegistry[id];
  },
  
  getProblem: (id: string): ProblemModule | undefined => {
    return ProblemRegistry[id];
  },

  getAllPatterns: (): PatternModule[] => {
    return getAllPatterns().sort((a, b) => a.order - b.order);
  },

  getAllProblems: (): ProblemModule[] => {
    return getAllProblems();
  },

  getProblemsForPattern: (patternId: string): ProblemModule[] => {
    return getAllProblems().filter(p => p.patterns.includes(patternId));
  },

  getProblemsByDifficulty: (difficulty: string): ProblemModule[] => {
    return getAllProblems().filter(p => p.difficulty === difficulty);
  },

  getProblemsByCompany: (company: string): ProblemModule[] => {
    return getAllProblems().filter(p => p.companies.includes(company));
  },
  
  getRelatedPatterns: (patternId: string): PatternModule[] => {
    const pattern = PatternRegistry[patternId];
    if (!pattern) return [];
    return pattern.relatedPatternIds
      .map(id => PatternRegistry[id])
      .filter((p): p is PatternModule => !!p);
  },

  getRelatedProblems: (problemId: string): ProblemModule[] => {
    const problem = ProblemRegistry[problemId];
    if (!problem) return [];
    return problem.relatedProblems
      .map(id => ProblemRegistry[id])
      .filter((p): p is ProblemModule => !!p);
  }
};

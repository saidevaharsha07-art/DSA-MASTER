import { CurriculumRepository } from '@/src/curriculum/repository';
import { PatternModule, ProblemModule } from '@/src/types/content';

export const curriculumEngine = {
  getPattern: (id: string): PatternModule | undefined => {
    const p = CurriculumRepository.getPatternBySlug(id);
    if (!p) return undefined;
    return {
      id: p.id,
      slug: p.slug,
      title: p.title,
      phase: p.categoryId,
      topic: p.categorySlug,
      order: p.order,
      difficulty: p.difficulty,
      estimatedHours: p.estimatedHours,
      overview: p.overview,
      intuition: p.intuition,
      mentalModel: p.mentalModel || '',
      learningObjectives: [],
      recognitionSignals: p.recognitionSignals,
      prerequisites: [],
      whenToUse: p.whenToUse,
      whenNotToUse: p.whenNotToUse,
      complexity: { time: 'O(N)', space: 'O(1)' },
      templates: [],
      visualExplanation: '',
      visualSteps: [],
      commonMistakes: p.commonMistakes,
      interviewTips: p.interviewTips,
      problemIds: p.problemIds,
      relatedPatternIds: p.relatedPatternIds,
      tags: [p.categoryTitle],
      resources: {
        notes: {
          overview: p.overview,
          intuition: p.intuition,
          mentalModel: p.mentalModel || '',
          recognitionSignals: p.recognitionSignals,
          mistakes: p.commonMistakes,
          interviewTips: p.interviewTips,
          revisionQuestions: [],
          cheatSheet: '',
          markdownSections: []
        },
        quiz: { mcqs: [], flashcards: [], activeRecall: [], trueFalse: [], reflectionQuestions: [] },
        revision: { quickReview: '', cheatSheet: '', activeRecall: [], spacedRepetitionHints: [], retentionQuestions: [] },
        flashcards: [],
        cheatsheet: ''
      },
      aiMetadata: {},
      metadata: { createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), version: '1.0', author: 'JOURNEY', verified: true }
    };
  },

  getProblem: (id: string): ProblemModule | undefined => {
    const p = CurriculumRepository.getProblemBySlug(id);
    if (!p) return undefined;
    return {
      id: p.id,
      slug: p.slug,
      platform: 'leetcode',
      platformId: p.leetcodeNumber.toString(),
      title: p.title,
      difficulty: p.difficulty,
      companies: p.companies,
      frequency: p.frequency === 'High' ? 90 : p.frequency === 'Medium' ? 60 : 30,
      acceptanceRate: p.acceptanceRate,
      estimatedSolveTime: p.estimatedTimeMin,
      patterns: [p.patternSlug],
      phase: p.categorySlug,
      topics: p.topics,
      prerequisites: [],
      intuition: `${p.title} (${p.difficulty}): ${p.topics.join(', ')}`,
      bruteForceIdea: `Brute force approach for ${p.title}.`,
      optimalIdea: `Optimal ${p.patternTitle} approach for ${p.title}.`,
      complexity: { time: 'O(N)', space: 'O(1)' },
      hints: [`Consider applying the ${p.patternTitle} pattern.`],
      commonMistakes: ['Pay attention to edge cases and boundary conditions.'],
      edgeCases: ['Empty inputs or single-element arrays.'],
      followUps: [],
      relatedProblems: p.relatedProblems || [],
      template: [{ language: 'Python', code: `# ${p.title}\ndef solve():\n    pass` }],
      aiMetadata: {},
      metadata: { createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), version: '1.0', author: 'JOURNEY', verified: true }
    };
  },

  getAllPatterns: (): PatternModule[] => {
    return CurriculumRepository.getAllPatterns().map(p => curriculumEngine.getPattern(p.slug)!);
  },

  getAllProblems: (): ProblemModule[] => {
    return CurriculumRepository.getAllProblems().map(p => curriculumEngine.getProblem(p.slug)!);
  },

  getProblemsForPattern: (patternId: string): ProblemModule[] => {
    return CurriculumRepository.getProblemsByPattern(patternId).map(p => curriculumEngine.getProblem(p.slug)!);
  },

  getProblemsByDifficulty: (difficulty: string): ProblemModule[] => {
    return CurriculumRepository.getAllProblems()
      .filter(p => p.difficulty === difficulty)
      .map(p => curriculumEngine.getProblem(p.slug)!);
  },

  getProblemsByCompany: (company: string): ProblemModule[] => {
    return CurriculumRepository.getAllProblems()
      .filter(p => p.companies.some(c => c.toLowerCase() === company.toLowerCase()))
      .map(p => curriculumEngine.getProblem(p.slug)!);
  },

  getRelatedPatterns: (patternId: string): PatternModule[] => {
    const pattern = CurriculumRepository.getPatternBySlug(patternId);
    if (!pattern) return [];
    return pattern.relatedPatternIds
      .map(id => curriculumEngine.getPattern(id))
      .filter((p): p is PatternModule => !!p);
  },

  getRelatedProblems: (problemId: string): ProblemModule[] => {
    const problem = CurriculumRepository.getProblemBySlug(problemId);
    if (!problem || !problem.relatedProblems) return [];
    return problem.relatedProblems
      .map(id => curriculumEngine.getProblem(id))
      .filter((p): p is ProblemModule => !!p);
  }
};

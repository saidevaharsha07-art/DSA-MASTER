/**
 * CodeChef Platform Module
 * Clean Platform API for CodeChef Practice System inside DSA CRACKER.
 */

export * from './types';
export * from './difficulty';
export * from './parser';
export * from './dataset';
export * from './loader';
export * from './search';
export * from './stats';
export * from './recommendations';

import { CodeChefLoader } from './loader';
import { CodeChefSearchEngine } from './search';
import { CodeChefStatsGenerator } from './stats';
import { CodeChefRecommendationEngine } from './recommendations';
import { CodeChefDatasetProvider } from './dataset';

export const codechefPlatform = Object.freeze({
  loader: new CodeChefLoader(),
  loadDataset: () => CodeChefDatasetProvider.loadCompleteDataset(),
  search: CodeChefSearchEngine.search,
  getStats: CodeChefStatsGenerator.generateStats,
  getProblemsBySection: CodeChefRecommendationEngine.getProblemsBySection,
  getProblemsByPracticePath: CodeChefRecommendationEngine.getProblemsByPracticePath,
  getProblemsByDifficulty: CodeChefRecommendationEngine.getProblemsByDifficulty,
  getProblemsByRatingRange: CodeChefRecommendationEngine.getProblemsByRatingRange,
  getProblemsForCompany: CodeChefRecommendationEngine.getProblemsForCompany,
  getStarPath: CodeChefRecommendationEngine.getStarPath,
  getInterviewQuestions: CodeChefRecommendationEngine.getInterviewQuestions,
  getRandomProblem: CodeChefRecommendationEngine.getRandomProblem,
  getNextProblem: CodeChefRecommendationEngine.getNextProblem,
  getAdjacentProblems: CodeChefRecommendationEngine.getAdjacentProblems,
});

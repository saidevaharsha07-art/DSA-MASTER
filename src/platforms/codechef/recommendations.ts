/**
 * CodeChef Platform Module — Recommendation Engine
 * Helper functions for section, path, difficulty, rating, company, star path, and adjacent problem recommendations.
 */

import { CodeChefProblem, CodeChefFilterOptions } from './types';
import { CodeChefSearchEngine } from './search';
import { parseCodeChefRating } from './difficulty';

export class CodeChefRecommendationEngine {
  public static getProblemsBySection(sectionName: string): ReadonlyArray<CodeChefProblem> {
    return CodeChefSearchEngine.search({ section: sectionName });
  }

  public static getProblemsByPracticePath(pathName: string): ReadonlyArray<CodeChefProblem> {
    return CodeChefSearchEngine.search({ practicePath: pathName });
  }

  public static getProblemsByDifficulty(difficultyLabel: string): ReadonlyArray<CodeChefProblem> {
    return CodeChefSearchEngine.search({ difficultyLabel });
  }

  public static getProblemsByRatingRange(minRating: number, maxRating: number): ReadonlyArray<CodeChefProblem> {
    return CodeChefSearchEngine.search({ minRating, maxRating });
  }

  public static getProblemsForCompany(companyName: string): ReadonlyArray<CodeChefProblem> {
    return CodeChefSearchEngine.search({ company: companyName });
  }

  public static getStarPath(starLevel: number | string): ReadonlyArray<CodeChefProblem> {
    const starStr = starLevel.toString().includes('Star') ? starLevel.toString() : `${starLevel}-Star`;
    return CodeChefSearchEngine.search({ starPath: starStr });
  }

  public static getInterviewQuestions(category?: string): ReadonlyArray<CodeChefProblem> {
    return CodeChefSearchEngine.search({ interviewCategory: category || 'Interview' });
  }

  public static getRandomProblem(options: CodeChefFilterOptions = {}): CodeChefProblem | null {
    const list = CodeChefSearchEngine.search(options);
    if (list.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
  }

  public static getNextProblem(currentProblemId: string, options: CodeChefFilterOptions = {}): CodeChefProblem | null {
    const list = CodeChefSearchEngine.search(options);
    if (list.length === 0) return null;

    const currentIndex = list.findIndex((p) => p.id === currentProblemId);
    if (currentIndex >= 0 && currentIndex < list.length - 1) {
      return list[currentIndex + 1];
    }
    return list[0]; // fallback to first item
  }

  public static getAdjacentProblems(
    currentProblemId: string,
    options: CodeChefFilterOptions = {}
  ): { prev: CodeChefProblem | null; next: CodeChefProblem | null } {
    const list = CodeChefSearchEngine.search(options);
    if (list.length === 0) return { prev: null, next: null };

    const currentIndex = list.findIndex((p) => p.id === currentProblemId);
    if (currentIndex === -1) {
      return { prev: null, next: list[0] || null };
    }

    const prev = currentIndex > 0 ? list[currentIndex - 1] : null;
    const next = currentIndex < list.length - 1 ? list[currentIndex + 1] : null;

    return { prev, next };
  }
}

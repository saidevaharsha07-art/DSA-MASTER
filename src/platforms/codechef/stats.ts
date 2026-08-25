/**
 * CodeChef Platform Module — Statistics Generator
 * Generates dataset analytics, problem counts, duplicates, rating distribution, and completion.
 */

import { CodeChefStats } from './types';
import { CodeChefDatasetProvider } from './dataset';
import { parseCodeChefRating, getCodeChefDifficultyLabel } from './difficulty';

export class CodeChefStatsGenerator {
  public static generateStats(): CodeChefStats {
    const problems = CodeChefDatasetProvider.loadCompleteDataset();

    const seenIds = new Set<string>();
    let duplicatesCount = 0;
    const sectionsSet = new Set<string>();
    const pathsSet = new Set<string>();
    const companiesSet = new Set<string>();

    const ratingDistribution: Record<string, number> = {};
    const difficultyDistribution: Record<string, number> = {};

    let solvedCount = 0;

    for (const p of problems) {
      if (seenIds.has(p.id)) {
        duplicatesCount++;
      } else {
        seenIds.add(p.id);
      }

      if (p.solved) solvedCount++;

      const meta = p.metadata;
      if (meta.section) sectionsSet.add(meta.section);
      if (meta.practicePath) pathsSet.add(meta.practicePath);
      if (meta.company) companiesSet.add(meta.company);

      const ratingNum = parseCodeChefRating(p.rating);
      const ratingBucket = `${Math.floor(ratingNum / 200) * 200}-${Math.floor(ratingNum / 200) * 200 + 199}`;
      ratingDistribution[ratingBucket] = (ratingDistribution[ratingBucket] || 0) + 1;

      const diffLabel = p.difficulty || getCodeChefDifficultyLabel(ratingNum);
      difficultyDistribution[diffLabel] = (difficultyDistribution[diffLabel] || 0) + 1;
    }

    const totalProblems = problems.length;
    const uniqueProblems = seenIds.size;
    const unsolvedCount = totalProblems - solvedCount;
    const completionPercentage = totalProblems > 0 ? parseFloat(((solvedCount / totalProblems) * 100).toFixed(2)) : 0;

    return Object.freeze({
      totalProblems,
      uniqueProblems,
      duplicatesCount,
      pathsCount: pathsSet.size,
      sectionsCount: sectionsSet.size,
      companiesCount: companiesSet.size,
      ratingDistribution: Object.freeze(ratingDistribution),
      difficultyDistribution: Object.freeze(difficultyDistribution),
      completionPercentage,
      solvedCount,
      attemptedCount: 0,
      unsolvedCount,
      sectionsList: Object.freeze(Array.from(sectionsSet).sort()),
      practicePathsList: Object.freeze(Array.from(pathsSet).sort()),
      companiesList: Object.freeze(Array.from(companiesSet).sort()),
    });
  }
}

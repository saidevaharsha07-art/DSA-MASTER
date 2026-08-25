/**
 * CodeChef Platform Module — Dataset Provider
 * Direct data access provider for CodeChef complete datasets.
 * Single Source of Truth: codechef_excel_db.ts (CodeChef_Master_Dataset.xlsx)
 */

import { CodeChefProblem } from './types';
import { codechefProblems } from '@/src/features/codechef/data/codechef_excel_db';

export class CodeChefDatasetProvider {
  private static cachedDataset: ReadonlyArray<CodeChefProblem> | null = null;

  public static loadCompleteDataset(): ReadonlyArray<CodeChefProblem> {
    if (this.cachedDataset) return this.cachedDataset;

    const list = Object.values(codechefProblems);

    const parsedProblems: CodeChefProblem[] = list.map((p) => {
      const metadata = {
        problemCode: p.code,
        section: p.kingdomName,
        practicePath: p.patternName,
        starPath: 'None',
        company: 'None',
        interviewTopic: p.kingdomName,
        interviewCategory: p.patternName,
        tags: p.topics,
        kingdom: p.kingdomName,
        pattern: p.patternName,
        notes: p.notes,
      };

      return {
        id: p.code,
        code: p.code,
        title: p.title,
        difficulty: p.difficulty,
        difficultyLabel: `${p.difficulty} (${p.rating})`,
        topic: p.kingdomName,
        subtopic: p.patternName,
        category: p.kingdomName,
        practicePath: p.patternName,
        url: p.url,
        estimatedTimeMinutes: p.estimatedTime,
        xp: p.xp,
        platform: 'codechef' as const,
        accuracyRate: 60,
        metadata,
        rating: p.rating,
        pattern: p.patternName,
        solved: p.status === 'Solved',
      };

    });


    this.cachedDataset = Object.freeze(parsedProblems);
    return this.cachedDataset;
  }

  public static clearCache(): void {
    this.cachedDataset = null;
  }
}


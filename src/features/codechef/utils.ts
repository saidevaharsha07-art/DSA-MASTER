/**
 * CodeChef Feature — Utilities
 * Resolves CodeChef problems using the master curriculum dataset (codechefProblems).
 * ZERO AI heuristics, string guessing, or regex inferencing.
 */

import { codechefProblems } from './data/codechef_excel_db';
import { CodeChefArenaProblem } from './types';

export function getAllCodeChefArenaProblems(): CodeChefArenaProblem[] {
  const rawProblems = Object.values(codechefProblems);

  return rawProblems.map((p) => {
    const diffLabel = `${p.difficulty} (${p.rating} Rating)`;

    return {
      id: p.code,
      code: p.code,
      title: p.title,
      kingdomId: p.kingdomId,
      kingdomName: p.kingdomName,
      patternId: p.patternId,
      patternName: p.patternName,
      difficulty: p.difficulty,
      rating: p.rating,
      difficultyLabel: diffLabel,
      topics: p.topics,
      url: p.url,
      notes: p.notes,
      platform: p.platform,
      estimatedTime: p.estimatedTime,
      xp: p.xp,
      status: (p.status as any) || 'Unsolved',
      favorite: false,
    };
  });
}



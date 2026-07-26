import { XpActionType } from '../types';

export const XP_RULES: Record<XpActionType, number> = {
  OPEN_PROBLEM: 2,
  RUN_CODE: 5,
  ACCEPTED_SOLUTION: 50,
  HARD_ACCEPTED: 120,
  FIRST_TRY_BONUS: 25,
  STREAK_7_DAY: 250,
  COMPLETE_PATTERN: 300,
  COMPLETE_KINGDOM: 1000,
};

export interface LevelInfo {
  level: number;
  currentXp: number;
  xpForNextLevel: number;
  xpInCurrentLevel: number;
  progressPct: number;
  leveledUp: boolean;
}

export function calculateLevel(totalXp: number): LevelInfo {
  // Formula: Level N requires 100 * N^1.5 XP
  let level = 1;
  while (totalXp >= getXpForLevel(level + 1)) {
    level++;
  }

  const currentLevelXpFloor = getXpForLevel(level);
  const nextLevelXpFloor = getXpForLevel(level + 1);

  const xpInCurrentLevel = totalXp - currentLevelXpFloor;
  const xpForNextLevel = nextLevelXpFloor - currentLevelXpFloor;
  const progressPct = Math.min(100, Math.round((xpInCurrentLevel / xpForNextLevel) * 100));

  return {
    level,
    currentXp: totalXp,
    xpForNextLevel,
    xpInCurrentLevel,
    progressPct,
    leveledUp: false,
  };
}

export function getXpForLevel(level: number): number {
  if (level <= 1) return 0;
  return Math.floor(100 * Math.pow(level - 1, 1.5));
}

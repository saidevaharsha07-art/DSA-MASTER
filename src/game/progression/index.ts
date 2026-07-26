import { PlayerRank } from '../player/types';

export function getXpForLevel(level: number): number {
  if (level <= 1) return 0;
  return Math.floor(100 * Math.pow(level - 1, 1.6));
}

export function getRankForLevel(level: number): PlayerRank {
  if (level <= 5) return 'Novice Explorer';
  if (level <= 10) return 'Array Apprentice';
  if (level <= 15) return 'Pattern Hunter';
  if (level <= 20) return 'Kingdom Guardian';
  if (level <= 30) return 'Algorithm Knight';
  if (level <= 40) return 'Graph Warden';
  if (level <= 50) return 'DP Sage';
  if (level <= 70) return 'Master Strategist';
  if (level <= 90) return 'Grand Algorithmist';
  return 'Legend of Journey';
}

export function calculateXpReward(difficulty: 'Easy' | 'Medium' | 'Hard', isFirstTry = false, noHint = false): { xp: number; coins: number } {
  let xp = 25;
  let coins = 10;

  if (difficulty === 'Medium') {
    xp = 50;
    coins = 20;
  } else if (difficulty === 'Hard') {
    xp = 100;
    coins = 40;
  }

  if (isFirstTry) xp += 25;
  if (noHint) xp += 15;

  return { xp, coins };
}

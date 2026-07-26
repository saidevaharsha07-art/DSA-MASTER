export type PlayerRank = 
  | 'Novice Explorer'
  | 'Array Apprentice'
  | 'Pattern Hunter'
  | 'Kingdom Guardian'
  | 'Algorithm Knight'
  | 'Graph Warden'
  | 'DP Sage'
  | 'Master Strategist'
  | 'Grand Algorithmist'
  | 'Legend of Journey';

export interface PlayerInventoryItem {
  id: string;
  name: string;
  type: 'title' | 'badge' | 'frame' | 'theme' | 'avatar' | 'artifact';
  icon: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  description: string;
  unlockedAt: string;
  equipped?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'Problem Solving' | 'Kingdom Completion' | 'Pattern Mastery' | 'Daily Streak' | 'Accuracy';
  icon: string;
  xpReward: number;
  coinReward: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  targetCount: number;
  currentCount: number;
  xpReward: number;
  coinReward: number;
  completed: boolean;
  type: 'daily' | 'weekly';
}

export interface GameState {
  player: {
    id: string;
    username: string;
    level: number;
    xp: number;
    totalXp: number;
    coins: number;
    rank: PlayerRank;
    title: string;
    avatar: string;
    frame: string;
    currentStreak: number;
    longestStreak: number;
    solvedEasy: number;
    solvedMedium: number;
    solvedHard: number;
    totalSolved: number;
  };
  inventory: PlayerInventoryItem[];
  achievements: Achievement[];
  dailyQuests: Quest[];
  weeklyQuests: Quest[];
  lastLoginDate: string;
}

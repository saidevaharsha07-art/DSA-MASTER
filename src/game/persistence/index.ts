import { GameState } from '../player/types';
import { DEFAULT_ACHIEVEMENTS } from '../achievements';
import { DEFAULT_DAILY_QUESTS, DEFAULT_WEEKLY_QUESTS } from '../quests';
import { INITIAL_INVENTORY } from '../inventory';
import { getRankForLevel } from '../progression';

const GAME_STATE_KEY = 'dsa_rpg_game_state_v3';

export const INITIAL_GAME_STATE: GameState = {
  player: {
    id: 'hero_archon',
    username: 'ArchonCoder',
    level: 18,
    xp: 620,
    totalXp: 4800,
    coins: 1250,
    rank: getRankForLevel(18),
    title: 'Algorithm Knight',
    avatar: '/images/avatar_archon.png',
    frame: 'Purple Neon Frame',
    currentStreak: 15,
    longestStreak: 15,
    solvedEasy: 24,
    solvedMedium: 18,
    solvedHard: 6,
    totalSolved: 48,
  },
  inventory: INITIAL_INVENTORY,
  achievements: DEFAULT_ACHIEVEMENTS,
  dailyQuests: DEFAULT_DAILY_QUESTS,
  weeklyQuests: DEFAULT_WEEKLY_QUESTS,
  lastLoginDate: new Date().toISOString().split('T')[0],
};

class GamePersistenceManager {
  public loadGameState(): GameState {
    if (typeof window === 'undefined') return INITIAL_GAME_STATE;
    try {
      const stored = localStorage.getItem(GAME_STATE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_GAME_STATE;
    } catch (e) {
      return INITIAL_GAME_STATE;
    }
  }

  public saveGameState(state: GameState) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save game state', e);
    }
  }
}

export const gamePersistence = new GamePersistenceManager();

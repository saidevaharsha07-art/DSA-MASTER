import { PlayerProfile, ProblemProgress, KingdomProgress, PatternProgress } from '../types';

const PLAYER_PROFILE_KEY = 'dsa_player_profile_v2';
const PROBLEMS_PROGRESS_KEY = 'dsa_problems_progress_v2';

export const INITIAL_PLAYER_PROFILE: PlayerProfile = {
  id: 'player_hero_01',
  username: 'ArchonCoder',
  email: 'archon@dsamaster.app',
  avatar: '/images/avatar_archon.png',
  level: 1,
  xp: 0,
  totalXp: 0,
  currentKingdom: 'basic-arrays',
  unlockedKingdoms: ['basic-arrays'],
  coins: 500,
  gems: 50,
  currentStreak: 15,
  longestStreak: 15,
  recoveryTokens: 2,
  joinDate: '2026-07-01',
  solvedCount: 0,
  attemptedCount: 0,
  acceptanceRate: 100,
  languagesUsed: ['typescript', 'javascript', 'python', 'java', 'cpp'],
};

class ProgressStorageManager {
  public loadProfile(): PlayerProfile {
    if (typeof window === 'undefined') return INITIAL_PLAYER_PROFILE;
    try {
      const stored = localStorage.getItem(PLAYER_PROFILE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_PLAYER_PROFILE;
    } catch (e) {
      return INITIAL_PLAYER_PROFILE;
    }
  }

  public saveProfile(profile: PlayerProfile) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(PLAYER_PROFILE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save player profile', e);
    }
  }

  public loadProblemsProgress(): Record<string, ProblemProgress> {
    if (typeof window === 'undefined') return {};
    try {
      const stored = localStorage.getItem(PROBLEMS_PROGRESS_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      return {};
    }
  }

  public saveProblemProgress(problemId: string, progress: Partial<ProblemProgress>) {
    if (typeof window === 'undefined') return;
    try {
      const all = this.loadProblemsProgress();
      const existing = all[problemId] || {
        problemId,
        solved: false,
        attempted: false,
        bookmarked: false,
        favorite: false,
        revisionStage: 0,
        confidence: 'medium',
        lastOpened: new Date().toISOString(),
      };

      all[problemId] = { ...existing, ...progress };
      localStorage.setItem(PROBLEMS_PROGRESS_KEY, JSON.stringify(all));
    } catch (e) {
      console.error('Failed to save problem progress', e);
    }
  }
}

export const progressStorage = new ProgressStorageManager();

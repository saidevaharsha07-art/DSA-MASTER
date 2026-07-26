import { progressStorage } from './storage';
import { calculateLevel, XP_RULES } from './xp';
import { updateStreakOnActivity } from './streak';
import { calculateNextRevisionDate } from './revision';
import { notesService } from './notes';
import { bookmarksService } from './bookmarks';
import { PlayerProfile, ProblemProgress, XpActionType, ConfidenceRating } from './types';

class PlayerProgressService {
  private profile: PlayerProfile;

  constructor() {
    this.profile = progressStorage.loadProfile();
  }

  public getProfile(): PlayerProfile {
    return this.profile;
  }

  /**
   * Dynamically award XP to player and update Level info.
   */
  public awardXp(action: XpActionType, customBonus = 0): { xpEarned: number; leveledUp: boolean; newLevel: number } {
    const baseAmount = XP_RULES[action] || 0;
    const totalAwarded = baseAmount + customBonus;

    const oldLevel = this.profile.level;
    this.profile.totalXp += totalAwarded;

    const levelInfo = calculateLevel(this.profile.totalXp);
    this.profile.level = levelInfo.level;
    this.profile.xp = levelInfo.xpInCurrentLevel;

    const leveledUp = levelInfo.level > oldLevel;

    // Trigger streak check on activity
    const streakResult = updateStreakOnActivity({
      currentStreak: this.profile.currentStreak,
      longestStreak: this.profile.longestStreak,
      lastActiveDate: new Date().toISOString().split('T')[0],
      recoveryTokens: this.profile.recoveryTokens,
      activeDates: [],
    });

    this.profile.currentStreak = streakResult.state.currentStreak;
    this.profile.longestStreak = streakResult.state.longestStreak;

    progressStorage.saveProfile(this.profile);

    return {
      xpEarned: totalAwarded,
      leveledUp,
      newLevel: levelInfo.level,
    };
  }

  /**
   * Record a problem solution submission verdict.
   */
  public recordSubmission(
    problemId: string,
    isAccepted: boolean,
    runtimeMs: number,
    memoryMb: number,
    confidence: ConfidenceRating = 'medium'
  ) {
    if (isAccepted) {
      this.profile.solvedCount += 1;
      const { nextStage, nextDate } = calculateNextRevisionDate(0, confidence);

      progressStorage.saveProblemProgress(problemId, {
        solved: true,
        attempted: true,
        bestRuntimeMs: runtimeMs,
        bestMemoryMb: memoryMb,
        revisionStage: nextStage,
        confidence,
        nextRevisionDate: nextDate,
        lastSubmitted: new Date().toISOString(),
      });

      this.awardXp('ACCEPTED_SOLUTION');
    } else {
      this.profile.attemptedCount += 1;
      progressStorage.saveProblemProgress(problemId, {
        attempted: true,
        lastSubmitted: new Date().toISOString(),
      });
    }

    progressStorage.saveProfile(this.profile);
  }
}

export const playerProgressService = new PlayerProgressService();

export * from './types';
export * from './xp';
export * from './streak';
export * from './revision';
export { notesService, bookmarksService };
